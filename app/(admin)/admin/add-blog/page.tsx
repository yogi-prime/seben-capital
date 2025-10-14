'use client';

import * as React from 'react';
import Link from 'next/link';

// lib api wrapper (you already created this)
import { API, CONFIG } from '@/lib/api';

// shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

// icons
import {
  Loader2, Upload, Plus, Trash2, ArrowUp, ArrowDown, Quote, List as ListIcon,
  Heading, Code, Minus, Image as ImgIcon, Table as TableIcon, Eye,
} from 'lucide-react';

/* -------------------------------------------------------------------------------------------------
   Types & Config
-------------------------------------------------------------------------------------------------- */
type Option = { id: number; name: string; slug: string };

type BlockType = 'h2' | 'h3' | 'p' | 'quote' | 'ul' | 'ol' | 'img' | 'table' | 'code' | 'hr';
type Block =
  | { type: 'h2' | 'h3' | 'p' | 'quote' | 'code'; value: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'img'; src: string; alt?: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'hr' };

const BRAND = 'Seben Capital';
const { SITE_URL } = CONFIG;

/* -------------------------------------------------------------------------------------------------
   Small utilities (slug, wc, read-time, markdown→html, simple structure, seo, etc.)
-------------------------------------------------------------------------------------------------- */
const STOPWORDS = new Set([
  'the','and','for','with','your','from','that','this','are','you','our','not','but','has','have','will','into','over','than','about','then','only','can','how','why','what','when','where','who','a','an','of','in','to','on','by','is','it','as','be','or','at','we','they','he','she','them','his','her','their'
]);

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const stripHtml = (s: string) => (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const stripMd = (s: string) =>
  s.replace(/`{1,3}[^`]*`{1,3}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/^[#>\-\*]+\s?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (v: string) =>
  v.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const wordCount = (src: string) => stripHtml(stripMd(src)).split(/\s+/).filter(Boolean).length;
const minsRead = (w: number) => Math.max(1, Math.ceil(w / 220));

const safeEllipsize = (s: string, max: number) => {
  const clean = (s || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + '…';
};

const sentences = (t: string) => (t || '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+/).filter(Boolean);

const topKeywords = (title: string, cats: string[], tags: string[]) => {
  const base = [title, ...cats, ...tags]
    .join(' ')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && w.length > 2 && !STOPWORDS.has(w));
  return Array.from(new Set(base)).slice(0, 12);
};

// very small markdown → html (headings, lists, code fences, blockquotes, bold/italic, links)
function mdToHtml(md: string) {
  if (!md) return '';
  let out = md;

  // code block ```
  out = out.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${escapeHtml(code)}</code></pre>`);
  // inline code
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // headings
  out = out.replace(/^###\s?(.+)$/gim, '<h3>$1</h3>');
  out = out.replace(/^##\s?(.+)$/gim, '<h2>$1</h2>');
  out = out.replace(/^#\s?(.+)$/gim, '<h2>$1</h2>');
  // blockquote
  out = out.replace(/^\>\s?(.+)$/gim, '<blockquote>$1</blockquote>');
  // unordered list
  out = out.replace(/^(?:-|\*)\s+(.+)$/gim, '<li>$1</li>');
  out = out.replace(/(<li>[\s\S]*?<\/li>)(?!(\s*<\/ul>))/gim, '<ul>$1</ul>');
  // ordered (1. )
  out = out.replace(/^\d+\.\s+(.+)$/gim, '<li>$1</li>');
  out = out.replace(/(<li>[\s\S]*?<\/li>)(?!(\s*<\/ol>))/gim, '<ol>$1</ol>');
  // bold/italic
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // links
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // paragraphs
  out = out.replace(/^(?!<h2|<h3|<ul|<ol|<pre|<blockquote|<img|<hr|<table|<p|<\/)(.+)$/gim, '<p>$1</p>');
  return out;
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]!));
}

// Simple Writer → try to auto-structure plain text into HTML (headlines, quotes, lists)
function enhanceToHtml(raw: string) {
  if (!raw) return '';
  const lines = raw.split(/\r?\n/).map((l) => l.trim());
  const parts: string[] = [];
  let inList: null | 'ul' | 'ol' = null;

  for (const ln of lines) {
    if (!ln) {
      if (inList) {
        parts.push(inList === 'ul' ? '</ul>' : '</ol>');
        inList = null;
      }
      continue;
    }
    // headings heuristic
    if (/^#{1,3}\s/.test(ln)) {
      const text = ln.replace(/^#{1,3}\s/, '');
      const level = ln.startsWith('###') ? 'h3' : 'h2';
      parts.push(`<${level}>${escapeHtml(text)}</${level}>`);
      continue;
    }
    if (/^[A-Z][^.!?]{8,}$/.test(ln) && ln.length <= 120) {
      parts.push(`<h2>${escapeHtml(ln)}</h2>`);
      continue;
    }
    // list
    if (/^(\-|\*|\d+\.)\s+/.test(ln)) {
      const isOrdered = /^\d+\./.test(ln);
      const item = ln.replace(/^(\-|\*|\d+\.)\s+/, '');
      if (!inList) {
        inList = isOrdered ? 'ol' : 'ul';
        parts.push(inList === 'ul' ? '<ul>' : '<ol>');
      }
      parts.push(`<li>${escapeHtml(item)}</li>`);
      continue;
    }
    // blockquote
    if (/^\".+\"$/.test(ln) || /^>/.test(ln)) {
      parts.push(`<blockquote>${escapeHtml(ln.replace(/^>/, '').replace(/^"|"$/g, ''))}</blockquote>`);
      continue;
    }
    // paragraph
    parts.push(`<p>${escapeHtml(ln)}</p>`);
  }
  if (inList) parts.push(inList === 'ul' ? '</ul>' : '</ol>');
  return parts.join('\n');
}

const firstImgFromHtml = (html: string) => html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?[^>]*>/i)?.[1] || null;

const buildSeoTitle = (baseTitle: string, headings: string[], cats: string[], tags: string[], max = 60) => {
  let candidate = (baseTitle || headings[0] || '').replace(/\s+/g, ' ').trim();
  if (candidate.length > max) {
    const split = candidate.split(/:|–|—| - /);
    if (split[0] && split[0].length > 10) candidate = split[0].trim();
  }
  candidate = safeEllipsize(candidate, max);
  const kw = (cats[0] || tags[0] || '').trim();
  if (kw && candidate.length + 3 + kw.length <= max && !candidate.toLowerCase().includes(kw.toLowerCase())) {
    candidate = `${candidate} — ${kw}`;
  }
  const suffix = ` | ${BRAND}`;
  if (candidate.length + suffix.length <= max) candidate += suffix;
  return candidate;
};

const buildSeoDescription = (excerpt: string, md: string, html: string, keywords: string[], max = 160) => {
  const text = [excerpt, stripMd(md), stripHtml(html)].join(' ').replace(/\s+/g, ' ').trim();
  const sc: { s: string; score: number; len: number }[] = sentences(excerpt + ' ' + text).map((s) => {
    const plain = s.trim();
    const len = plain.length;
    const hits = keywords.reduce((a, k) => (plain.toLowerCase().includes(k) ? a + 1 : a), 0);
    const lenScore = len > 40 && len < 180 ? 1 : 0;
    return { s: plain, score: hits * 2 + lenScore, len };
  });
  sc.sort((a, b) => b.score - a.score || Math.abs(a.len - 150) - Math.abs(b.len - 150));
  let chosen = (sc[0]?.s || '').trim();
  if (!chosen) chosen = text.slice(0, 220);
  const second = sc[1]?.s || '';
  let combined = chosen;
  if (second && (chosen + ' ' + second).length <= max) combined = `${chosen} ${second}`;
  return safeEllipsize(combined, max);
};

const jsonLdArticle = (p: {
  title: string;
  author: string;
  publishedAt?: string | null;
  canonical: string;
  image?: string | null;
  description?: string | null;
  categories: string[];
  tags: string[];
  wordCount: number;
}) => {
  const obj: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: safeEllipsize(p.title, 110),
    author: [{ '@type': 'Person', name: p.author || 'Seben Team' }],
    mainEntityOfPage: p.canonical || undefined,
    url: p.canonical || undefined,
    description: p.description || undefined,
    articleSection: p.categories?.[0] || undefined,
    keywords: [...(p.categories || []), ...(p.tags || [])].join(', ') || undefined,
    wordCount: p.wordCount || undefined,
    dateModified: new Date().toISOString(),
  };
  if (p.image) obj.image = [p.image];
  if (p.publishedAt) obj.datePublished = new Date(p.publishedAt).toISOString();
  return obj;
};

/* -------------------------------------------------------------------------------------------------
   Advanced Builder helpers
-------------------------------------------------------------------------------------------------- */
const emptyRow = (cols = 3) => Array.from({ length: 1 }).map(() => Array.from({ length: cols }).map(() => ''));

function blocksToHtml(blocks: Block[]) {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'h2':
        case 'h3':
        case 'p':
        case 'quote':
        case 'code':
          if (b.type === 'quote') return `<blockquote>${escapeHtml(b.value)}</blockquote>`;
          if (b.type === 'code') return `<pre><code>${escapeHtml(b.value)}</code></pre>`;
          return `<${b.type}>${escapeHtml((b as any).value)}</${b.type}>`;
        case 'ul':
        case 'ol':
          return `<${b.type}>${b.items.map((it) => `<li>${escapeHtml(it)}</li>`).join('')}</${b.type}>`;
        case 'img':
          return `<img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt || '')}" />`;
        case 'table':
          return `<table>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</table>`;
        case 'hr':
          return '<hr />';
      }
    })
    .join('\n');
}

/* -------------------------------------------------------------------------------------------------
   Component
-------------------------------------------------------------------------------------------------- */
export default function AddBlogPage() {
  // core fields
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');
  const [mode, setMode] = React.useState<'simple' | 'builder'>('simple');

  // simple mode buffers
  const [simpleText, setSimpleText] = React.useState('');
  const [markdown, setMarkdown] = React.useState('');
  const [html, setHtml] = React.useState('');

  // builder blocks
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  // media
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>('');
  const [imageAlt, setImageAlt] = React.useState('');

  // taxonomy
  const [categories, setCategories] = React.useState<Option[]>([]);
  const [tags, setTags] = React.useState<Option[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([]);
  const [primaryCategoryId, setPrimaryCategoryId] = React.useState<number | undefined>(undefined);
  const [selectedTagNames, setSelectedTagNames] = React.useState<string[]>([]);

  // SEO/meta
  const [seoTitle, setSeoTitle] = React.useState('');
  const [seoDesc, setSeoDesc] = React.useState('');
  const [canonicalUrl, setCanonicalUrl] = React.useState('');
  const [ogImageUrl, setOgImageUrl] = React.useState('');
  const [twitterImageUrl, setTwitterImageUrl] = React.useState('');
  const [schemaJson, setSchemaJson] = React.useState('');

  const [authorName, setAuthorName] = React.useState('Seben Team');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [publishAt, setPublishAt] = React.useState<string>('');
  const [status, setStatus] = React.useState<'draft' | 'scheduled' | 'published' | 'archived'>('draft');

  // ui
  const [submitting, setSubmitting] = React.useState(false);
  const [loadingTax, setLoadingTax] = React.useState(true);

  // derived
  const composedHtml = React.useMemo(() => {
    if (mode === 'builder') return blocksToHtml(blocks);
    if (html) return html;
    if (markdown) return mdToHtml(markdown);
    if (simpleText) return enhanceToHtml(simpleText);
    return '';
  }, [mode, blocks, simpleText, markdown, html]);

  const wc = React.useMemo(() => wordCount(`${title} ${excerpt} ${composedHtml}`), [title, excerpt, composedHtml]);
  const readTimeText = `${minsRead(wc)} min read`;

  // SEO dirty flags (only overwrite when user didn’t edit)
  const [seoTitleDirty, setSeoTitleDirty] = React.useState(false);
  const [seoDescDirty, setSeoDescDirty] = React.useState(false);
  const [canonicalDirty, setCanonicalDirty] = React.useState(false);
  const [ogDirty, setOgDirty] = React.useState(false);
  const [twDirty, setTwDirty] = React.useState(false);
  const [schemaDirty, setSchemaDirty] = React.useState(false);

  /* load taxonomies */
  React.useEffect(() => {
    (async () => {
      try {
        const [cats, tgs] = await Promise.all([
          API.get<{ data: Option[] }>('/categories'),
          API.get<{ data: Option[] }>('/tags'),
        ]);
        setCategories(cats?.data ?? []);
        setTags(tgs?.data ?? []);
      } catch {}
      setLoadingTax(false);
    })();
  }, []);

  /* auto slug */
  React.useEffect(() => {
    if (!slug && title) setSlug(slugify(title));
  }, [title]); // eslint-disable-line

  /* auto SEO */
  React.useEffect(() => {
    const url = slug ? `${SITE_URL}/blog/${slug}` : '';
    const catNames = selectedCategoryIds
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean) as string[];
    const toks = topKeywords(title, catNames, selectedTagNames);
    const firstImg = firstImgFromHtml(composedHtml);
    const img = imagePreview || firstImg || '';

    if (!seoTitleDirty) {
      // grab first two headings if present
      const hd = (composedHtml.match(/<h[23]>(.*?)<\/h[23]>/gi) || []).map((h) => h.replace(/<\/?h[23]>/gi, ''));
      setSeoTitle(buildSeoTitle(title, hd, catNames, selectedTagNames, 60));
    }
    if (!seoDescDirty) setSeoDesc(buildSeoDescription(excerpt, markdown, composedHtml, toks, 160));
    if (!canonicalDirty && url) setCanonicalUrl(url);
    if (img && !ogDirty) setOgImageUrl(img);
    if (img && !twDirty) setTwitterImageUrl(img);
    if (!schemaDirty) {
      const jsonld = jsonLdArticle({
        title: seoTitleDirty ? seoTitle : buildSeoTitle(title, [], catNames, selectedTagNames, 110),
        author: authorName,
        publishedAt: publishAt || null,
        canonical: url || '',
        image: img || undefined,
        description: seoDescDirty ? seoDesc : buildSeoDescription(excerpt, markdown, composedHtml, toks, 160),
        categories: catNames,
        tags: selectedTagNames,
        wordCount: wc,
      });
      setSchemaJson(JSON.stringify(jsonld, null, 2));
    }
  }, [
    title, slug, excerpt, markdown, composedHtml, imagePreview, authorName, publishAt,
    selectedCategoryIds, categories, selectedTagNames, wc,
  ]);

  /* handlers */
  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  }

  const addBlock = (t: BlockType) => {
    setBlocks((prev) => [
      ...prev,
      t === 'ul' || t === 'ol'
        ? { type: t, items: [''] }
        : t === 'img'
        ? { type: 'img', src: '', alt: '' }
        : t === 'table'
        ? { type: 'table', rows: emptyRow(3) }
        : t === 'hr'
        ? { type: 'hr' }
        : { type: t as any, value: '' },
    ]);
  };

  const moveBlock = (i: number, dir: -1 | 1) =>
    setBlocks((prev) => {
      const arr = [...prev];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return prev;
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
      return arr;
    });

  const removeBlock = (i: number) => setBlocks((prev) => prev.filter((_, idx) => idx !== i));

  /* submit */
  async function handleSubmit(nextStatus: typeof status) {
    try {
      setSubmitting(true);

      // split existing/new taxonomies
      const existingCategoryIds = selectedCategoryIds.filter((id) => id > 0);
      const newCategories = selectedCategoryIds
        .filter((id) => id < 0)
        .map((id) => {
          const c = categories.find((x) => x.id === id)!;
          return { name: c.name, slug: c.slug };
        });

      const existingTagNames = selectedTagNames.filter((n) =>
        tags.some((t) => t.name.toLowerCase() === n.toLowerCase())
      );
      const newTagNames = selectedTagNames.filter(
        (n) => !tags.some((t) => t.name.toLowerCase() === n.toLowerCase())
      );

      const payload = {
        title,
        slug: slug || slugify(title),
        excerpt,
        content_markdown: markdown || (mode === 'simple' ? simpleText : ''), // store what user typed
        content_html: composedHtml, // SEO-friendly final html
        featured_image_alt: imageAlt,

        seo_title: seoTitle,
        seo_description: seoDesc,
        canonical_url: canonicalUrl || '',
        og_data: { image: ogImageUrl || undefined, title: seoTitle, description: seoDesc },
        twitter_data: { card: 'summary_large_image', image: twitterImageUrl || ogImageUrl || undefined },
        schema_json: schemaJson ? JSON.parse(schemaJson) : undefined,

        author_name: authorName,
        is_featured: isFeatured,
        read_time: readTimeText,
        word_count: wc,

        status: nextStatus,
        published_at: publishAt ? new Date(publishAt).toISOString() : null,

        primary_category_id: primaryCategoryId ?? null,
        categories_existing_ids: existingCategoryIds,
        categories_new: newCategories,

        tags_existing_names: existingTagNames,
        tags_new_names: newTagNames,
      };

      const fd = new FormData();
      fd.append('payload', JSON.stringify(payload));
      if (imageFile) fd.append('featured_image', imageFile, imageFile.name);

      await API.post('/posts', { formData: fd });
      alert(nextStatus === 'published' ? '✅ Published!' : nextStatus === 'scheduled' ? '⏰ Scheduled!' : '💾 Draft saved.');
    } catch (e: any) {
      alert(`Error: ${e.message ?? e}`);
    } finally {
      setSubmitting(false);
    }
  }

  /* UI */
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-[70] border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-3">
          <h1 className="text-xl md:text-2xl font-semibold">Add Blog</h1>
          <div className="flex gap-2">
            <Button variant="outline" disabled={submitting} onClick={() => handleSubmit('draft')}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Draft
            </Button>
            <Button disabled={submitting} onClick={() => handleSubmit(publishAt ? 'scheduled' : 'published')}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {publishAt ? 'Schedule' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      <main className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-elevated">
            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Psychology of Trading…" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="psychology-of-trading" />
                <p className="text-xs text-muted-foreground">URL will be: /blog/{slug || 'your-slug'}</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="excerpt">Excerpt (SEO friendly summary)</Label>
                <Textarea id="excerpt" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary for list pages & meta…" />
              </div>

              <Separator />

              {/* Modes */}
              <Tabs value={mode} onValueChange={(v: any) => setMode(v)} className="w-full">
                <TabsList className="mb-3">
                  <TabsTrigger value="simple">Simple Writer</TabsTrigger>
                  <TabsTrigger value="builder">Advanced Builder</TabsTrigger>
                </TabsList>

                {/* SIMPLE */}
                <TabsContent value="simple" className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Write (plain text or light Markdown)</Label>
                    <Textarea className="min-h-[220px]" value={simpleText} onChange={(e) => setSimpleText(e.target.value)} placeholder="Type or paste your content…" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Optional Markdown</Label>
                      <Textarea className="min-h-[160px]" value={markdown} onChange={(e) => setMarkdown(e.target.value)} placeholder="If you prefer markdown, paste here" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Optional Raw HTML</Label>
                      <Textarea className="min-h-[160px]" value={html} onChange={(e) => setHtml(e.target.value)} placeholder="<h2>Heading</h2>…" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We’ll auto-structure simple text into semantic HTML (headings, lists, quotes). If you provide Markdown/HTML, that takes priority.
                  </p>
                </TabsContent>

                {/* BUILDER */}
                <TabsContent value="builder" className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('h2')}><Heading className="w-4 h-4 mr-2" />H2</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('h3')}><Heading className="w-4 h-4 mr-2" />H3</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('p')}>Paragraph</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('quote')}><Quote className="w-4 h-4 mr-2" />Quote</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('ul')}><ListIcon className="w-4 h-4 mr-2" />Bullets</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('ol')}>Numbered</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('img')}><ImgIcon className="w-4 h-4 mr-2" />Image</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('table')}><TableIcon className="w-4 h-4 mr-2" />Table</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('code')}><Code className="w-4 h-4 mr-2" />Code</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => addBlock('hr')}><Minus className="w-4 h-4 mr-2" />Divider</Button>
                  </div>

                  <div className="space-y-4">
                    {blocks.map((b, i) => (
                      <div key={i} className="rounded-md border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs uppercase tracking-wider opacity-70">{b.type}</div>
                          <div className="flex gap-2">
                            <Button type="button" variant="outline" size="icon" onClick={() => moveBlock(i, -1)}><ArrowUp className="w-4 h-4" /></Button>
                            <Button type="button" variant="outline" size="icon" onClick={() => moveBlock(i, +1)}><ArrowDown className="w-4 h-4" /></Button>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeBlock(i)}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </div>

                        {b.type === 'p' || b.type === 'h2' || b.type === 'h3' || b.type === 'quote' || b.type === 'code' ? (
                          <Textarea
                            value={(b as any).value}
                            onChange={(e) => {
                              const v = e.target.value;
                              setBlocks((prev) => prev.map((x, idx) => (idx === i ? ({ ...x, value: v } as Block) : x)));
                            }}
                            placeholder={b.type === 'p' ? 'Paragraph…' : b.type.toUpperCase()}
                            className={b.type === 'code' ? 'font-mono' : ''}
                          />
                        ) : null}

                        {(b.type === 'ul' || b.type === 'ol') && (
                          <div className="space-y-2">
                            {(b as any).items.map((it: string, j: number) => (
                              <Input
                                key={j}
                                value={it}
                                onChange={(e) =>
                                  setBlocks((prev) =>
                                    prev.map((x, idx) =>
                                      idx === i
                                        ? ({ ...x, items: (x as any).items.map((y: string, k: number) => (k === j ? e.target.value : y)) } as Block)
                                        : x
                                    )
                                  )
                                }
                                placeholder={`Item ${j + 1}`}
                              />
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setBlocks((prev) =>
                                  prev.map((x, idx) => (idx === i ? ({ ...x, items: [...(x as any).items, ''] } as Block) : x))
                                )
                              }
                            >
                              <Plus className="w-4 h-4 mr-2" /> Add item
                            </Button>
                          </div>
                        )}

                        {b.type === 'img' && (
                          <div className="grid md:grid-cols-2 gap-2">
                            <Input
                              placeholder="Image URL"
                              value={(b as any).src}
                              onChange={(e) =>
                                setBlocks((prev) => prev.map((x, idx) => (idx === i ? ({ ...x, src: e.target.value } as Block) : x)))
                              }
                            />
                            <Input
                              placeholder="Alt text"
                              value={(b as any).alt || ''}
                              onChange={(e) =>
                                setBlocks((prev) => prev.map((x, idx) => (idx === i ? ({ ...x, alt: e.target.value } as Block) : x)))
                              }
                            />
                          </div>
                        )}

                        {b.type === 'table' && (
                          <div className="space-y-2">
                            {(b as any).rows.map((row: string[], rIdx: number) => (
                              <div className="grid grid-cols-3 gap-2" key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <Input
                                    key={cIdx}
                                    value={cell}
                                    onChange={(e) =>
                                      setBlocks((prev) =>
                                        prev.map((x, idx) =>
                                          idx === i
                                            ? ({
                                                ...x,
                                                rows: (x as any).rows.map((rr: string[], ri: number) =>
                                                  ri === rIdx ? rr.map((cc, ci) => (ci === cIdx ? e.target.value : cc)) : rr
                                                ),
                                              } as Block)
                                            : x
                                        )
                                      )
                                    }
                                    placeholder={`R${rIdx + 1}C${cIdx + 1}`}
                                  />
                                ))}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setBlocks((prev) =>
                                  prev.map((x, idx) =>
                                    idx === i ? ({ ...x, rows: [...(x as any).rows, Array.from({ length: 3 }).map(() => '')] } as Block) : x
                                  )
                                )
                              }
                            >
                              <Plus className="w-4 h-4 mr-2" /> Add row
                            </Button>
                          </div>
                        )}

                        {b.type === 'hr' && <div className="text-center text-muted-foreground">— Divider —</div>}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">Words: {wc}</Badge>
                <Badge variant="outline">{readTimeText}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="card-elevated">
            <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>SEO Title</Label>
                <Input value={seoTitle} onChange={(e) => { setSeoTitleDirty(true); setSeoTitle(e.target.value); }} placeholder="≤ 60 chars; auto-generated but editable" />
              </div>
              <div className="grid gap-2">
                <Label>SEO Description</Label>
                <Textarea rows={3} value={seoDesc} onChange={(e) => { setSeoDescDirty(true); setSeoDesc(e.target.value); }} placeholder="≈ 150–160 chars; smart summary" />
              </div>
              <div className="grid gap-2">
                <Label>Canonical URL</Label>
                <Input value={canonicalUrl} onChange={(e) => { setCanonicalDirty(true); setCanonicalUrl(e.target.value); }} placeholder="https://yourdomain.com/blog/slug" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>OpenGraph Image URL</Label>
                  <Input value={ogImageUrl} onChange={(e) => { setOgDirty(true); setOgImageUrl(e.target.value); }} placeholder="https://…" />
                </div>
                <div className="grid gap-2">
                  <Label>Twitter Image URL</Label>
                  <Input value={twitterImageUrl} onChange={(e) => { setTwDirty(true); setTwitterImageUrl(e.target.value); }} placeholder="https://…" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Article JSON-LD (optional)</Label>
                <Textarea rows={6} value={schemaJson} onChange={(e) => { setSchemaDirty(true); setSchemaJson(e.target.value); }} placeholder='{"@context":"https://schema.org","@type":"Article","headline":"..."}' />
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="card-elevated">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Preview</CardTitle>
              <Badge variant="outline" className="text-xs">Not indexed (Admin)</Badge>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none [&_h2]:text-copper-primary [&_h3]:text-copper-primary">
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: composedHtml || '<p class="text-muted-foreground">Start writing to see the preview…</p>' }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Publish */}
          <Card className="card-elevated">
            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 relative z-[45]">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                  <SelectContent className="z-[60] bg-background">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published (now)</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2 pt-1">
                <Label>Publish at (for schedule)</Label>
                <Input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
              </div>

              <div className="flex items-center justify-between pt-1">
                <Label htmlFor="is_featured" className="cursor-pointer">Featured</Label>
                <Switch id="is_featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>

              <div className="grid gap-2 pt-1">
                <Label>Author</Label>
                <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="card-elevated">
            <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {imagePreview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => { setImageFile(null); setImagePreview(''); }} title="Remove">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span>Upload featured image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={onPickImage} />
                </label>
              )}

              <div className="grid gap-2">
                <Label>Image Alt</Label>
                <Input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe the image for accessibility & SEO" />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="card-elevated">
            <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {loadingTax ? (
                <div className="text-sm text-muted-foreground">Loading categories…</div>
              ) : (
                <>
                  <div className="max-h-56 overflow-auto pr-1 space-y-2">
                    {categories.map((c) => (
                      <label key={c.id} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCategoryIds.includes(c.id)}
                          onChange={(e) =>
                            setSelectedCategoryIds((prev) => (e.target.checked ? [...prev, c.id] : prev.filter((x) => x !== c.id)))
                          }
                        />
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid gap-2 relative z-[45]">
                    <Label>Primary Category</Label>
                    <Select value={primaryCategoryId ? String(primaryCategoryId) : ''} onValueChange={(v) => setPrimaryCategoryId(Number(v))}>
                      <SelectTrigger><SelectValue placeholder="Select one" /></SelectTrigger>
                      <SelectContent className="z-[60]">
                        {selectedCategoryIds.map((id) => {
                          const c = categories.find((x) => x.id === id);
                          if (!c) return null;
                          return <SelectItem key={id} value={String(id)}>{c.name}</SelectItem>;
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Quick add category (temp negative id) */}
                  <NewCategory onAdd={(name) => {
                    const opt: Option = { id: -Date.now(), name, slug: slugify(name) };
                    setCategories((prev) => [opt, ...prev]);
                    setSelectedCategoryIds((prev) => [...new Set([...prev, opt.id])]);
                    setPrimaryCategoryId((p) => p ?? opt.id);
                  }} />
                </>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <TagsPanel
            allTags={tags}
            selected={selectedTagNames}
            onChange={setSelectedTagNames}
          />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
   Small subcomponents
-------------------------------------------------------------------------------------------------- */
function NewCategory({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = React.useState('');
  return (
    <div className="grid gap-2">
      <Label>Add New Category</Label>
      <div className="flex gap-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New category name" />
        <Button type="button" onClick={() => { if (name.trim()) { onAdd(name.trim()); setName(''); } }}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">New categories are created on submit.</p>
    </div>
  );
}

function TagsPanel({
  allTags,
  selected,
  onChange,
}: {
  allTags: Option[];
  selected: string[];
  onChange: (tags: string[]) => void;
}) {
  const [newTag, setNewTag] = React.useState('');
  const add = (t: string) => onChange([...new Set([...selected, t])]);
  const remove = (t: string) => onChange(selected.filter((x) => x !== t));
  return (
    <Card className="card-elevated">
      <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add a tag (press Add)" />
          <Button type="button" onClick={() => { if (newTag.trim()) { add(newTag.trim()); setNewTag(''); } }}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {selected.map((t) => (
            <span key={t} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
              #{t}
              <button onClick={() => remove(t)} className="opacity-60 hover:opacity-100" title="Remove">×</button>
            </span>
          ))}
        </div>

        {allTags.length > 0 && (
          <>
            <Separator />
            <p className="text-xs text-muted-foreground">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 20).map((tg) => (
                <Badge key={tg.id} variant="outline" className="cursor-pointer" onClick={() => add(tg.name)}>
                  #{tg.name}
                </Badge>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
