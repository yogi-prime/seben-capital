'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';

// --- shadcn/ui components ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Loader2, Upload, Plus, Trash2 } from 'lucide-react';

// ---- Config ----
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://192.168.29.26:8000/api';
const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://192.168.29.26:3000';
const BRAND = 'Seben Capital';

// ======== helpers (same as Add page) =========
function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
function stripHtml(s: string) { return s.replace(/<[^>]*>/g, ' '); }
function stripMarkdown(md: string) {
  return md
    .replace(/`{1,3}[^`]*`{1,3}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/[#>*_`~\-]+/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ');
}
function wordCountFromHtmlOrMd(s: string) {
  const stripped = stripHtml(stripMarkdown(s));
  return stripped.split(/\s+/).map(x => x.trim()).filter(Boolean).length;
}
function minsRead(words: number) { return Math.max(1, Math.ceil(words / 220)); }
function safeEllipsize(str: string, max: number) {
  const clean = str.replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}
function firstImgFromHtml(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']?([^"'>\s]+)["']?[^>]*>/i);
  return m?.[1] || null;
}

type Option = { id: number; name: string; slug: string };

// ======== Component =========
export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);

  // Core
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [excerpt, setExcerpt] = React.useState('');
  const [contentMarkdown, setContentMarkdown] = React.useState('');
  const [contentHtml, setContentHtml] = React.useState('');

  // Media
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>('');
  const [imageAlt, setImageAlt] = React.useState('');

  // Taxonomy
  const [categories, setCategories] = React.useState<Option[]>([]);
  const [tags, setTags] = React.useState<Option[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([]);
  const [primaryCategoryId, setPrimaryCategoryId] = React.useState<number | undefined>(undefined);
  const [selectedTagNames, setSelectedTagNames] = React.useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [newTagName, setNewTagName] = React.useState('');

  // SEO
  const [seoTitle, setSeoTitle] = React.useState('');
  const [seoDesc, setSeoDesc] = React.useState('');
  const [canonicalUrl, setCanonicalUrl] = React.useState('');
  const [ogImageUrl, setOgImageUrl] = React.useState('');
  const [twitterImageUrl, setTwitterImageUrl] = React.useState('');
  const [schemaJson, setSchemaJson] = React.useState<string>('');

  // Meta
  const [authorName, setAuthorName] = React.useState('Seben Team');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [publishAt, setPublishAt] = React.useState<string>('');
  const [status, setStatus] = React.useState<'draft' | 'scheduled' | 'published' | 'archived'>('draft');

  // Derived
  const wordCount = React.useMemo(
    () => wordCountFromHtmlOrMd(contentMarkdown || contentHtml || `${title} ${excerpt}`),
    [contentMarkdown, contentHtml, title, excerpt]
  );
  const readTimeText = `${minsRead(wordCount)} min read`;

  // UI
  const [submitting, setSubmitting] = React.useState(false);
  const [loadingTaxonomies, setLoadingTaxonomies] = React.useState(true);
  const [loadingPost, setLoadingPost] = React.useState(true);

  // Dirty flags (so auto-SEO doesn't overwrite manual edits)
  const [seoTitleDirty, setSeoTitleDirty] = React.useState(false);
  const [seoDescDirty, setSeoDescDirty] = React.useState(false);
  const [canonicalDirty, setCanonicalDirty] = React.useState(false);
  const [ogDirty, setOgDirty] = React.useState(false);
  const [twDirty, setTwDirty] = React.useState(false);
  const [schemaDirty, setSchemaDirty] = React.useState(false);

  // Fetch taxonomies + Post
  React.useEffect(() => {
    (async () => {
      try {
        const [catRes, tagRes, postRes] = await Promise.all([
          fetch(`${API_BASE}/categories`),
          fetch(`${API_BASE}/tags`),
          fetch(`${API_BASE}/posts/by-id/${id}`),
        ]);
        const cats: Option[] = (await catRes.json())?.data ?? [];
        const tgs: Option[] = (await tagRes.json())?.data ?? [];
        setCategories(cats);
        setTags(tgs);

        const pj = await postRes.json();
        const p = pj?.data;

        // Prefill form
        setTitle(p.title || '');
        setSlug(p.slug || '');
        setExcerpt(p.excerpt || '');
        setContentMarkdown(p.content_markdown || '');
        setContentHtml(p.content_html || '');
        setImagePreview(p.featured_image || '');
        setImageAlt(p.featured_image_alt || '');

        const catIds = (p.categories || []).map((c: any) => c.id);
        setSelectedCategoryIds(catIds);
        setPrimaryCategoryId(p.primary_category_id || p?.primaryCategory?.id || undefined);
        setSelectedTagNames((p.tags || []).map((t: any) => t.name));

        setSeoTitle(p.seo_title || '');
        setSeoDesc(p.seo_description || '');
        setCanonicalUrl(p.canonical_url || `${SITE_ORIGIN}/blog/${p.slug}`);
        setOgImageUrl(p.og_data?.image || p.featured_image || '');
        setTwitterImageUrl(p.twitter_data?.image || p.og_data?.image || p.featured_image || '');
        setSchemaJson(p.schema_json ? JSON.stringify(p.schema_json, null, 2) : '');

        setAuthorName(p.author_name || 'Seben Team');
        setIsFeatured(!!p.is_featured);
        setPublishAt(p.published_at ? new Date(p.published_at).toISOString().slice(0,16) : '');
        setStatus(p.status || 'draft');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        alert('Failed to load post.');
      } finally {
        setLoadingPost(false);
        setLoadingTaxonomies(false);
      }
    })();
  }, [id]);

  // Auto SEO (respect dirty flags)
  React.useEffect(() => {
    // image from HTML if none
    const imgFromHtml = firstImgFromHtml(contentHtml || '') || null;
    const img = imagePreview || imgFromHtml;

    if (!seoTitleDirty && title) {
      let cand = title;
      if (cand.length > 60) {
        const split = cand.split(/:|–|—| - /);
        if (split[0] && split[0].length > 10) cand = split[0].trim();
      }
      cand = safeEllipsize(cand, 60);
      const suffix = ` | ${BRAND}`;
      if (cand.length + suffix.length <= 60) cand += suffix;
      setSeoTitle(cand);
    }
    if (!seoDescDirty) {
      const src = (excerpt || stripHtml(contentHtml) || stripMarkdown(contentMarkdown)).trim();
      setSeoDesc(safeEllipsize(src, 160));
    }
    if (!canonicalDirty && slug) setCanonicalUrl(`${SITE_ORIGIN.replace(/\/+$/, '')}/blog/${slug}`);
    if (img && !ogDirty) setOgImageUrl(img);
    if (img && !twDirty) setTwitterImageUrl(img);
    if (!schemaDirty) {
      const obj: any = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: safeEllipsize(title, 110),
        author: [{ '@type': 'Person', name: authorName }],
        mainEntityOfPage: `${SITE_ORIGIN}/blog/${slug}`,
        url: `${SITE_ORIGIN}/blog/${slug}`,
        description: safeEllipsize(excerpt || stripHtml(contentHtml), 160),
        image: ogImageUrl ? [ogImageUrl] : undefined,
        wordCount,
        dateModified: new Date().toISOString(),
        datePublished: publishAt ? new Date(publishAt).toISOString() : undefined,
      };
      setSchemaJson(JSON.stringify(obj, null, 2));
    }
  }, [
    title, excerpt, contentHtml, contentMarkdown, slug,
    imagePreview, authorName, publishAt,
    seoTitleDirty, seoDescDirty, canonicalDirty, ogDirty, twDirty, schemaDirty,
  ]);

  // Image pick
  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setImagePreview(url);
  }

  // Add quick category / tag (client side)
  function addNewCategory() {
    const name = newCategoryName.trim();
    if (!name) return;
    const opt: Option = { id: -Date.now(), name, slug: slugify(name) };
    setCategories(prev => [opt, ...prev]);
    setSelectedCategoryIds(prev => [...new Set([...prev, opt.id])]);
    setPrimaryCategoryId(p => p ?? opt.id);
    setNewCategoryName('');
  }
  function addNewTag() {
    const name = newTagName.trim();
    if (!name) return;
    setSelectedTagNames(prev => [...new Set([...prev, name])]);
    setNewTagName('');
  }

  function removeTag(t: string) {
    setSelectedTagNames(prev => prev.filter(x => x !== t));
  }

  function safeParse(j: string) {
    if (!j?.trim()) return null;
    try { return JSON.parse(j); } catch { return null; }
  }

  async function handleSubmit(nextStatus: typeof status) {
    try {
      setSubmitting(true);

      // Resolve categories
      const existingCategoryIds = selectedCategoryIds.filter(id => id > 0);
      const newCategories = selectedCategoryIds.filter(id => id < 0).map(id => {
        const c = categories.find(x => x.id === id)!;
        return { name: c.name, slug: c.slug };
      });

      const existingTagNames = selectedTagNames.filter(n => tags.some(t => t.name.toLowerCase() === n.toLowerCase()));
      const newTagNames = selectedTagNames.filter(n => !tags.some(t => t.name.toLowerCase() === n.toLowerCase()));

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

      const fd = new FormData();
      fd.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
      if (imageFile) fd.append('featured_image', imageFile, imageFile.name);

      // PUT update
      const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'PUT', body: fd });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to update');
      }

      alert(nextStatus === 'published' ? '✅ Updated & Published!' : '💾 Draft updated.');
      router.push('/admin/blogs');
    } catch (e: any) {
      alert(`Error: ${e.message ?? e}`);
    } finally {
      setSubmitting(false);
    }
  }

  // ======= UI =======
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-3">
          <h1 className="text-xl md:text-2xl font-semibold">Edit Blog</h1>
          <div className="flex gap-2">
            <Button variant="outline" disabled={submitting || loadingPost} onClick={() => handleSubmit('draft')}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Draft
            </Button>
            <Button disabled={submitting || loadingPost} onClick={() => handleSubmit(publishAt ? 'scheduled' : 'published')}>
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
            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title…" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="my-post-slug" />
                <p className="text-xs text-muted-foreground">URL: /blog/{slug || 'slug'}</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" rows={3} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
              </div>

              <Separator />

              <div className="grid gap-3">
                <Label htmlFor="md">Content (Markdown)</Label>
                <Textarea id="md" className="min-h-[220px]" value={contentMarkdown} onChange={e => setContentMarkdown(e.target.value)} />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="html">Content (HTML)</Label>
                <Textarea id="html" className="min-h-[180px]" value={contentHtml} onChange={e => setContentHtml(e.target.value)} />
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">Words: {wordCount}</Badge>
                <Badge variant="outline">{readTimeText}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>SEO Title</Label>
                <Input value={seoTitle} onChange={(e) => { setSeoTitleDirty(true); setSeoTitle(e.target.value); }} placeholder="≤ 60 chars"/>
              </div>
              <div className="grid gap-2">
                <Label>SEO Description</Label>
                <Textarea rows={3} value={seoDesc} onChange={(e) => { setSeoDescDirty(true); setSeoDesc(e.target.value); }} placeholder="≈ 150–160 chars" />
              </div>
              <div className="grid gap-2">
                <Label>Canonical URL</Label>
                <Input value={canonicalUrl} onChange={(e) => { setCanonicalDirty(true); setCanonicalUrl(e.target.value); }} placeholder="https://…" />
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
                <Label>Article JSON-LD</Label>
                <Textarea rows={6} value={schemaJson} onChange={(e) => { setSchemaDirty(true); setSchemaJson(e.target.value); }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: side panels */}
        <div className="space-y-6">
          <Card className="card-elevated">
            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 relative z-[45]">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                  <SelectContent className="z-[60]">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published (now)</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Publish at (for schedule)</Label>
                <Input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured" className="cursor-pointer">Featured</Label>
                <Switch id="is_featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>

              <div className="grid gap-2">
                <Label>Author</Label>
                <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {imagePreview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2"
                    onClick={() => { setImageFile(null); setImagePreview(''); }} title="Remove">
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
                <Input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe image…" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
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

                  <div className="grid gap-2">
                    <Label>Add New Category</Label>
                    <div className="flex gap-2">
                      <Input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="New category name" />
                      <Button type="button" onClick={addNewCategory}><Plus className="h-4 w-4 mr-1" />Add</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">New categories are created on save.</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Add a tag" />
                <Button type="button" onClick={addNewTag}><Plus className="h-4 w-4 mr-1" />Add</Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedTagNames.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                    #{t}
                    <button onClick={() => removeTag(t)} className="opacity-60 hover:opacity-100" title="Remove">×</button>
                  </span>
                ))}
              </div>

              {tags.length > 0 && (
                <>
                  <Separator />
                  <p className="text-xs text-muted-foreground">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 20).map((tg) => (
                      <Badge key={tg.id} variant="outline" className="cursor-pointer"
                        onClick={() => setSelectedTagNames((prev) => [...new Set([...prev, tg.name])])}>
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
