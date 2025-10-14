'use client';

import * as React from 'react';

// --- shadcn/ui components (adjust import paths if needed) ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Loader2, Upload, Plus, Trash2 } from 'lucide-react';

// ---- SEO (noindex) for App Router ----
// export const metadata = {
//   title: 'Add Blog | Admin',
//   robots: {
//     index: false,
//     follow: false,
//     nocache: true,
//     'max-image-preview': 'none',
//     'max-video-preview': -1,
//     'max-snippet': -1,
//   },
// };

type Option = { id: number; name: string; slug: string };

// Laravel API (LAN)
const API_BASE = 'http://192.168.29.26:8000/api';
// Canonical origin for local dev (change on deploy)
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://192.168.29.26:3000';

// === helpers ======================================================
const BRAND = 'Seben Capital';

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, ' ');
}

function stripMarkdown(md: string) {
  return md
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ') // images
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ') // links
    .replace(/[#>*_`~\-]+/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ');
}

function textFromMdHtml(excerpt: string, md: string, html: string) {
  const parts = [excerpt, stripMarkdown(md), stripHtml(html)];
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

function getSentences(text: string) {
  const t = text.replace(/\s+/g, ' ').trim();
  // naive sentence split
  const parts = t.split(/(?<=[.!?])\s+/);
  return parts.filter(Boolean);
}

function wordCountFromHtmlOrMd(s: string) {
  const stripped = stripHtml(stripMarkdown(s));
  return stripped
    .split(/\s+/)
    .map((x) => x.trim())
    .filter(Boolean).length;
}

function minsRead(words: number) {
  return Math.max(1, Math.ceil(words / 220));
}

function safeEllipsize(str: string, max: number) {
  const clean = str.replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

function uniqueLower(items: string[]) {
  return Array.from(new Set(items.map((x) => x.toLowerCase().trim()).filter(Boolean)));
}

function topKeywordsFromTitleCatsTags(title: string, cats: string[], tags: string[]) {
  const base = uniqueLower([
    ...title.split(/[^a-z0-9]+/i),
    ...cats.flatMap((c) => c.split(/[^a-z0-9]+/i)),
    ...tags.flatMap((t) => t.split(/[^a-z0-9]+/i)),
  ]).filter((w) => w.length > 2 && !STOPWORDS.has(w));
  return base.slice(0, 12); // cap
}

const STOPWORDS = new Set([
  'the','and','for','with','your','from','that','this','are','you','our','not','but','has','have','will','into','over','than','about','into','then','only','can','how','why','what','when','where','who','whom','a','an','of','in','to','on','by','is','it','as','be','or','at','we','they','he','she','them','his','her','their'
]);

function buildSeoTitle(baseTitle: string, headings: string[], cats: string[], tags: string[], max = 60) {
  let candidate = (baseTitle || headings[0] || '').replace(/\s+/g, ' ').trim();

  // If title very long: compress common patterns like "X: Y Z"
  if (candidate.length > max) {
    // prefer part before ":" or " - "
    const split = candidate.split(/:|–|—| - /);
    if (split[0] && split[0].length > 10) candidate = split[0].trim();
  }
  // If still long, ellipsize
  candidate = safeEllipsize(candidate, max);

  // Try to include a strong keyword (category or tag) if short
  const kw = (cats[0] || tags[0] || '').trim();
  if (kw && candidate.length + 3 + kw.length <= max && !candidate.toLowerCase().includes(kw.toLowerCase())) {
    candidate = `${candidate} — ${kw}`;
  }

  // Try brand suffix if space permits
  const suffix = ` | ${BRAND}`;
  if (candidate.length + suffix.length <= max) candidate += suffix;

  return candidate;
}

function buildSeoDescription(excerpt: string, md: string, html: string, keywords: string[], max = 160) {
  // sentence pool: excerpt sentences + top of content
  const text = textFromMdHtml(excerpt, md, html);
  const sentences = [...getSentences(excerpt), ...getSentences(text)];

  // score each sentence
  type Scored = { s: string; score: number; len: number };
  const scored: Scored[] = sentences.map((s) => {
    const plain = s.replace(/\s+/g, ' ').trim();
    const len = plain.length;
    const hits = keywords.reduce((acc, k) => (plain.toLowerCase().includes(k) ? acc + 1 : acc), 0);
    const lenScore = len > 40 && len < 180 ? 1 : 0; // prefer sensible lengths
    return { s: plain, score: hits * 2 + lenScore, len };
  });

  // sort desc by score, then by closeness to 150 chars
  scored.sort((a, b) => b.score - a.score || Math.abs(a.len - 150) - Math.abs(b.len - 150));

  let chosen = (scored[0]?.s || '').trim();
  if (!chosen) {
    // fallback: first 2 lines from text
    chosen = text.slice(0, 220);
  }

  // If we can fit two good sentences, append second
  const second = scored[1]?.s || '';
  let combined = chosen;
  if (second && (chosen + ' ' + second).length <= max) {
    combined = `${chosen} ${second}`;
  }

  return safeEllipsize(combined, max);
}

function firstImgFromHtml(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?[^>]*>/i);
  return m?.[1] || null;
}

function toJsonLd({
  title,
  author,
  publishedAt,
  canonical,
  image,
  description,
  categories,
  tags,
  wordCount,
}: {
  title: string;
  author: string;
  publishedAt?: string | null;
  canonical: string;
  image?: string | null;
  description?: string | null;
  categories: string[];
  tags: string[];
  wordCount: number;
}) {
  const obj: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: safeEllipsize(title, 110),
    author: [{ '@type': 'Person', name: author || 'Seben Team' }],
    mainEntityOfPage: canonical || undefined,
    url: canonical || undefined,
    description: description || undefined,
    articleSection: categories?.[0] || undefined,
    keywords: [...(categories || []), ...(tags || [])].join(', ') || undefined,
    wordCount: wordCount || undefined,
    dateModified: new Date().toISOString(),
  };
  if (image) obj.image = [image];
  if (publishedAt) obj.datePublished = new Date(publishedAt).toISOString();
  return obj;
}

// ==================================================================

export default function AddBlogPage() {
  /* ---------------- state: core ---------------- */
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');
  const [contentMarkdown, setContentMarkdown] = React.useState('');
  const [contentHtml, setContentHtml] = React.useState('');

  /* ---------------- state: media ---------------- */
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>('');
  const [imageAlt, setImageAlt] = React.useState('');

  /* ---------------- state: taxonomy ---------------- */
  const [categories, setCategories] = React.useState<Option[]>([]);
  const [tags, setTags] = React.useState<Option[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([]);
  const [primaryCategoryId, setPrimaryCategoryId] = React.useState<number | undefined>(undefined);
  const [selectedTagNames, setSelectedTagNames] = React.useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [newTagName, setNewTagName] = React.useState('');

  /* ---------------- state: SEO ---------------- */
  const [seoTitle, setSeoTitle] = React.useState('');
  const [seoDesc, setSeoDesc] = React.useState('');
  const [canonicalUrl, setCanonicalUrl] = React.useState('');
  const [ogImageUrl, setOgImageUrl] = React.useState('');
  const [twitterImageUrl, setTwitterImageUrl] = React.useState('');
  const [schemaJson, setSchemaJson] = React.useState<string>('');

  /* ---------------- state: meta ---------------- */
  const [authorName, setAuthorName] = React.useState('Seben Team');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [publishAt, setPublishAt] = React.useState<string>(''); // datetime-local
  const [status, setStatus] = React.useState<'draft' | 'scheduled' | 'published' | 'archived'>(
    'draft'
  );

  /* ---------------- derived ---------------- */
  const wordCount = React.useMemo(
    () => wordCountFromHtmlOrMd(contentMarkdown || contentHtml || `${title} ${excerpt}`),
    [contentMarkdown, contentHtml, title, excerpt]
  );
  const readTimeText = `${minsRead(wordCount)} min read`;

  /* ---------------- ui ---------------- */
  const [submitting, setSubmitting] = React.useState(false);
  const [loadingTaxonomies, setLoadingTaxonomies] = React.useState(true);

  /* ---------------- dirty flags ---------------- */
  const [seoTitleDirty, setSeoTitleDirty] = React.useState(false);
  const [seoDescDirty, setSeoDescDirty] = React.useState(false);
  const [canonicalDirty, setCanonicalDirty] = React.useState(false);
  const [ogDirty, setOgDirty] = React.useState(false);
  const [twDirty, setTwDirty] = React.useState(false);
  const [schemaDirty, setSchemaDirty] = React.useState(false);

  /* ---------------- effects ---------------- */
  // fetch categories/tags
  React.useEffect(() => {
    (async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch(`${API_BASE}/categories`).catch(() => null),
          fetch(`${API_BASE}/tags`).catch(() => null),
        ]);
        const cats: Option[] = (await catRes?.json())?.data ?? [];
        const tgs: Option[] = (await tagRes?.json())?.data ?? [];
        setCategories(cats);
        setTags(tgs);
      } catch {
      } finally {
        setLoadingTaxonomies(false);
      }
    })();
  }, []);

  // auto-slug from title
  React.useEffect(() => {
    if (!slug && title) setSlug(slugify(title));
  }, [title]); // eslint-disable-line

  // smart auto SEO (unless dirty)
  React.useEffect(() => {
    const baseTitle = title?.trim();
    const url = slug ? `${SITE_ORIGIN.replace(/\/+$/, '')}/blog/${slug}` : '';

    const catNames = selectedCategoryIds
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean) as string[];
    const keywords = topKeywordsFromTitleCatsTags(baseTitle || '', catNames, selectedTagNames);

    // Prefer uploaded image; else try first <img> in HTML content
    const imgFromHtml = firstImgFromHtml(contentHtml || '') || null;
    const img = imagePreview || imgFromHtml;

    // Title
    if (!seoTitleDirty) {
      const headingsFromMd = (contentMarkdown.match(/^#{1,3}\s+(.+)$/gim) || [])
        .map((h) => h.replace(/^#{1,3}\s+/, '').trim());
      const seoT = buildSeoTitle(baseTitle || headingsFromMd[0] || '', headingsFromMd, catNames, selectedTagNames, 60);
      setSeoTitle(seoT);
    }

    // Description
    if (!seoDescDirty) {
      const seoD = buildSeoDescription(excerpt, contentMarkdown, contentHtml, keywords, 160);
      setSeoDesc(seoD);
    }

    // Canonical
    if (!canonicalDirty && url) setCanonicalUrl(url);

    if (img && !ogDirty) setOgImageUrl(img);
    if (img && !twDirty) setTwitterImageUrl(img);

    // JSON-LD
    if (!schemaDirty) {
      const jsonld = toJsonLd({
        title: !seoTitleDirty ? buildSeoTitle(baseTitle || '', [], catNames, selectedTagNames, 110) : seoTitle,
        author: authorName,
        publishedAt: publishAt || null,
        canonical: url || '',
        image: img || undefined,
        description: !seoDescDirty
          ? buildSeoDescription(excerpt, contentMarkdown, contentHtml, keywords, 160)
          : seoDesc,
        categories: catNames,
        tags: selectedTagNames,
        wordCount,
      });
      setSchemaJson(JSON.stringify(jsonld, null, 2));
    }
  }, [
    title,
    slug,
    excerpt,
    contentMarkdown,
    contentHtml,
    imagePreview,
    authorName,
    publishAt,
    selectedCategoryIds,
    categories,
    selectedTagNames,
    wordCount,
  ]);

  /* ---------------- handlers ---------------- */
  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setImagePreview(url);
  }

  function addNewCategory() {
    const name = newCategoryName.trim();
    if (!name) return;
    const opt: Option = { id: -Date.now(), name, slug: slugify(name) }; // temp id
    setCategories((prev) => [opt, ...prev]);
    setSelectedCategoryIds((prev) => [...new Set([...prev, opt.id])]);
    setPrimaryCategoryId((p) => p ?? opt.id);
    setNewCategoryName('');
  }

  function addNewTag() {
    const name = newTagName.trim();
    if (!name) return;
    setSelectedTagNames((prev) => [...new Set([...prev, name])]);
    setNewTagName('');
  }

  function removeTag(name: string) {
    setSelectedTagNames((prev) => prev.filter((t) => t !== name));
  }

  function safeParse(j: string) {
    if (!j?.trim()) return null;
    try {
      return JSON.parse(j);
    } catch {
      return null;
    }
  }

  async function handleSubmit(nextStatus: typeof status) {
    try {
      setSubmitting(true);

      const fd = new FormData();

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
        content_markdown: contentMarkdown,
        content_html: contentHtml,
        featured_image_alt: imageAlt,
        seo_title: seoTitle,
        seo_description: seoDesc,
        canonical_url: canonicalUrl || '',
        og_data: { image: ogImageUrl || undefined, title: seoTitle, description: seoDesc },
        twitter_data: { card: 'summary_large_image', image: twitterImageUrl || ogImageUrl || undefined },
        schema_json: safeParse(schemaJson),
        author_name: authorName,
        is_featured: isFeatured,
        read_time: readTimeText,
        word_count: wordCount,
        status: nextStatus,
        published_at: publishAt ? new Date(publishAt).toISOString() : null,
        primary_category_id: primaryCategoryId ?? null,
        categories_existing_ids: existingCategoryIds,
        categories_new: newCategories,
        tags_existing_names: existingTagNames,
        tags_new_names: newTagNames,
      };

     fd.append('payload', JSON.stringify(payload));
      if (imageFile) fd.append('featured_image', imageFile, imageFile.name);

      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to save');
      }

      alert(nextStatus === 'published' ? '✅ Published!' : '💾 Draft saved.');
    } catch (e: any) {
      alert(`Error: ${e.message ?? e}`);
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------------- UI ---------------- */
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
            <Button
              disabled={submitting}
              onClick={() => handleSubmit(publishAt ? 'scheduled' : 'published')}
            >
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {publishAt ? 'Schedule' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      <main className="container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., The Psychology of Trading: Mastering Emotions for Consistent Profits"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="psychology-of-trading"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  URL will be: /blog/{slug || 'your-slug'}
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="excerpt">Excerpt (SEO friendly summary)</Label>
                <Textarea
                  id="excerpt"
                  rows={3}
                  placeholder="Short summary shown on list pages and meta description..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <Separator />

              <div className="grid gap-3">
                <Label htmlFor="content-md">Content (Markdown)</Label>
                <Textarea
                  id="content-md"
                  className="min-h-[220px]"
                  placeholder="Write in Markdown (preferred). Paste your content here..."
                  value={contentMarkdown}
                  onChange={(e) => setContentMarkdown(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="content-html">Content (HTML) – optional</Label>
                <Textarea
                  id="content-html"
                  className="min-h-[180px]"
                  placeholder="<h2>Why Risk Management matters</h2>..."
                  value={contentHtml}
                  onChange={(e) => setContentHtml(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">Words: {wordCount}</Badge>
                <Badge variant="outline">{readTimeText}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>SEO Title</Label>
                <Input
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitleDirty(true);
                    setSeoTitle(e.target.value);
                  }}
                  placeholder="≤ 60 chars; auto-generated but editable"
                />
              </div>
              <div className="grid gap-2">
                <Label>SEO Description</Label>
                <Textarea
                  value={seoDesc}
                  onChange={(e) => {
                    setSeoDescDirty(true);
                    setSeoDesc(e.target.value);
                  }}
                  rows={3}
                  placeholder="≈ 150–160 chars; auto-generated summary"
                />
              </div>
              <div className="grid gap-2">
                <Label>Canonical URL</Label>
                <Input
                  value={canonicalUrl}
                  onChange={(e) => {
                    setCanonicalDirty(true);
                    setCanonicalUrl(e.target.value);
                  }}
                  placeholder="https://yourdomain.com/blog/slug"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>OpenGraph Image URL</Label>
                  <Input
                    value={ogImageUrl}
                    onChange={(e) => {
                      setOgDirty(true);
                      setOgImageUrl(e.target.value);
                    }}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Twitter Image URL</Label>
                  <Input
                    value={twitterImageUrl}
                    onChange={(e) => {
                      setTwDirty(true);
                      setTwitterImageUrl(e.target.value);
                    }}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Article JSON-LD (optional)</Label>
                <Textarea
                  value={schemaJson}
                  onChange={(e) => {
                    setSchemaDirty(true);
                    setSchemaJson(e.target.value);
                  }}
                  rows={6}
                  placeholder='{"@context":"https://schema.org","@type":"Article","headline":"..."}'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Side panels */}
        <div className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* stacking context fix for dropdown */}
              <div className="grid gap-2 relative z-[45]">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent className="z-[60]">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published (now)</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2 pt-1">
                <Label>Publish at (for schedule)</Label>
                <Input
                  type="datetime-local"
                  value={publishAt}
                  onChange={(e) => setPublishAt(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <Label htmlFor="is_featured" className="cursor-pointer">
                  Featured
                </Label>
                <Switch id="is_featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>

              <div className="grid gap-2 pt-1">
                <Label>Author</Label>
                <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {imagePreview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    title="Remove"
                  >
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
                <Input
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image for accessibility & SEO"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loadingTaxonomies ? (
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
                            setSelectedCategoryIds((prev) =>
                              e.target.checked ? [...prev, c.id] : prev.filter((x) => x !== c.id)
                            )
                          }
                        />
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid gap-2 relative z-[45]">
                    <Label>Primary Category</Label>
                    <Select
                      value={primaryCategoryId ? String(primaryCategoryId) : ''}
                      onValueChange={(v) => setPrimaryCategoryId(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent className="z-[60]">
                        {selectedCategoryIds.map((id) => {
                          const c = categories.find((x) => x.id === id);
                          if (!c) return null;
                          return (
                            <SelectItem key={id} value={String(id)}>
                              {c.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="grid gap-2">
                    <Label>Add New Category</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category name"
                      />
                      <Button type="button" onClick={addNewCategory}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      New categories are created on submit.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Add a tag (press Add)"
                />
                <Button type="button" onClick={addNewTag}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedTagNames.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                  >
                    #{t}
                    <button
                      onClick={() => removeTag(t)}
                      className="opacity-60 hover:opacity-100"
                      title="Remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {!loadingTaxonomies && tags.length > 0 && (
                <>
                  <Separator />
                  <p className="text-xs text-muted-foreground">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 20).map((tg) => (
                      <Badge
                        key={tg.id}
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedTagNames((prev) => [...new Set([...prev, tg.name])])
                        }
                      >
                        #{tg.name}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
