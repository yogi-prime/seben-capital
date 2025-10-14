'use client';

import * as React from 'react';
import Link from 'next/link';

// lib (centralized)
import { API, CONFIG } from '@/lib/api';
const { SITE_URL } = CONFIG;

// --- shadcn/ui ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

// --- icons ---
import {
  Plus, Eye, Edit, Trash2, RefreshCw, Search, Filter,
  CheckCircle2, XCircle, Clock, User, Tag,
} from 'lucide-react';

// ---- Types (match your Laravel list endpoint) ----
type ApiPost = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  author_name?: string | null;
  read_time?: string | null;
  word_count?: number | null;
  content_html?: string | null;
  content_markdown?: string | null;
  featured_image?: string | null;
  featured_image_alt?: string | null;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  published_at?: string | null;

  // SEO
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  og_data?: { image?: string; title?: string; description?: string } | null;
  twitter_data?: { card?: string; image?: string } | null;
  schema_json?: any | null;

  primaryCategory?: { name: string; slug: string } | null;
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
};

type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

// ---- Helpers ----
const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const stripHtml = (s?: string | null) =>
  (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const fmtDate = (iso?: string | null) =>
  !iso ? '' : new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

/** Compute a 0–100 SEO score + reasons (pass/fail) */
function computeSeoScore(p: ApiPost) {
  const reasons: { ok: boolean; label: string }[] = [];
  let score = 0;
  let total = 0;
  const add = (points: number, ok: boolean, label: string) => {
    total += points;
    if (ok) score += points;
    reasons.push({ ok, label });
  };

  const title = (p.seo_title || p.title || '').trim();
  add(10, title.length >= 30 && title.length <= 60, `Title length ${title.length} (30–60)`);

  const desc = (p.seo_description || p.excerpt || stripHtml(p.content_html)).trim();
  add(10, desc.length >= 110 && desc.length <= 160, `Meta description ${desc.length} (110–160)`);

  const hasCanonical = !!(p.canonical_url || `${SITE_URL}/blog/${p.slug}`);
  add(6, hasCanonical, 'Canonical URL present');

  const hasOg = !!(p.og_data?.image || p.featured_image);
  add(6, hasOg, 'OpenGraph image present');

  const hasTwitter = !!(p.twitter_data?.image || p.og_data?.image || p.featured_image);
  add(4, hasTwitter, 'Twitter card image present');

  add(8, !!p.schema_json, 'Article JSON-LD present');

  const wc = p.word_count || 0;
  const wcScore = clamp((wc / 1200) * 12, 0, 12); // 1200 words → full 12 points
  add(12, wc >= 800, `Word count ${wc} (≥800 recommended)`);
  score += wcScore; total += 12; // scale-in with partial credit

  const rtNum = parseInt((p.read_time || '').replace(/\D/g, '') || '0', 10);
  add(4, rtNum >= 3 && rtNum <= 12, `Read time ${rtNum || '-'} (3–12 min)`);

  add(6, !!(p.primaryCategory || p.categories?.[0]), 'Primary category set');
  add(6, (p.tags?.length || 0) >= 3, `Tags ${(p.tags?.length || 0)} (≥3)`);

  add(4, !!p.featured_image_alt, 'Featured image ALT set');

  const hCount = (p.content_html || '').match(/<(h2|h3)\b/gi)?.length || 0;
  add(6, hCount >= 3, `Subheadings (H2/H3) ${hCount} (≥3)`);

  const linkCount = (p.content_html || '').match(/<a\s+[^>]*href=/gi)?.length || 0;
  add(6, linkCount >= 2, `Links ${linkCount} (≥2)`);

  const finalScore = Math.round(clamp((score / total) * 100));
  const failed = reasons.filter(r => !r.ok);
  const passed = reasons.filter(r => r.ok);
  return { score: finalScore, failed, passed };
}

function statusBadge(s: ApiPost['status']) {
  switch (s) {
    case 'published': return <Badge className="bg-green-600">Published</Badge>;
    case 'scheduled': return <Badge className="bg-amber-600">Scheduled</Badge>;
    case 'draft':     return <Badge variant="outline">Draft</Badge>;
    case 'archived':  return <Badge className="bg-gray-600">Archived</Badge>;
  }
}

function coverUrl(p: ApiPost) {
  // use lib helper so /storage paths or CDN map correctly
  const raw = p.featured_image || p.og_data?.image || '/placeholder/blog-cover.png';
  return API.img(raw);
}

// ---- Component ----
export default function AdminBlogsPage() {
  const [rows, setRows] = React.useState<ApiPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<'all' | ApiPost['status']>('all');
  const [page, setPage] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set('per_page', '12');
      params.set('page', String(page));
      if (status !== 'all') params.set('status', status);
      if (search.trim()) params.set('q', search.trim());

      const data = await API.get<Paginated<ApiPost>>(`/posts?${params.toString()}`);
      setRows(data.data || []);
      setLastPage(data.last_page || 1);
      setTotal(data.total || 0);
    } catch (e: any) {
      setError(e.message ?? 'Failed');
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, status]);

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    load();
  }

  async function onDelete(id: number) {
    try {
      await API.del(`/posts/${id}`);
      await load();
      alert('Deleted successfully.');
    } catch (e: any) {
      alert(`Delete error: ${e.message ?? e}`);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <div className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-3">
          <h1 className="text-xl md:text-2xl font-semibold">Blogs Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/admin/add-blog"><Button><Plus className="h-4 w-4 mr-2" />Add Blog</Button></Link>
            <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
          </div>
        </div>
      </div>

      <main className="container py-6 space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="pt-6">
            <form onSubmit={onSearchSubmit} className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  className="pl-10"
                  placeholder="Search by title, excerpt, tags…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all"><Filter className="h-4 w-4 mr-2 inline" />All</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit">Apply</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="card-elevated">
                <div className="aspect-video bg-muted animate-pulse rounded-t-lg" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-full" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-destructive">{error}</div>
          ) : rows.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">No posts found.</div>
          ) : (
            rows.map((p) => {
              const { score, failed, passed } = computeSeoScore(p);
              const cat = p.primaryCategory?.name || p.categories?.[0]?.name || '—';
              const img = coverUrl(p);
              const scoreColor =
                score >= 85 ? 'text-green-600' : score >= 65 ? 'text-amber-600' : 'text-red-600';

              return (
                <Card key={p.id} className="group card-elevated overflow-hidden hover:scale-[1.01] transition-transform">
                  {/* Cover */}
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={p.featured_image_alt || p.title}
                      className="aspect-video w-full object-cover bg-gradient-to-br from-muted to-muted-foreground/10"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder/blog-cover.png'; }}
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge variant="outline" className="bg-background/70 backdrop-blur">{cat}</Badge>
                      {statusBadge(p.status)}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2">{p.title}</CardTitle>
                    <div className="text-xs text-muted-foreground">/{p.slug}</div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {p.excerpt || stripHtml(p.content_html)?.slice(0, 200)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" /> {p.author_name || 'Seben Team'}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {p.read_time || '—'}
                      </span>
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" /> {(p.tags?.length || 0)} tags
                      </span>
                    </div>

                    {/* SEO score with hover details */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-3">
                            <Progress value={score} className="w-40" />
                            <span className={`text-sm font-medium ${scoreColor}`}>{score}/100</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[360px] bg-background/90">
                          <div className="text-xs space-y-2">
                            {failed.length > 0 ? (
                              <>
                                <div className="font-medium">Needs attention:</div>
                                {failed.map((r, i) => (
                                  <div key={`f-${i}`} className="flex items-start gap-2">
                                    <XCircle className="w-3.5 h-3.5 text-red-600 mt-0.5" />
                                    <span>{r.label}</span>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="flex items-center gap-2 text-green-700">
                                <CheckCircle2 className="w-4 h-4" /> All critical checks passed
                              </div>
                            )}
                            {passed.length > 0 && (
                              <>
                                <div className="font-medium pt-1">Good:</div>
                                {passed.slice(0, 6).map((r, i) => (
                                  <div key={`p-${i}`} className="flex items-start gap-2 opacity-80">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5" />
                                    <span>{r.label}</span>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">{fmtDate(p.published_at)}</div>
                      <div className="flex gap-2">
                        <Link href={`/blog/${p.slug}`} target="_blank">
                          <Button variant="outline" size="sm" title="Preview">
                            <Eye className="h-4 w-4 mr-1" /> Preview
                          </Button>
                        </Link>
                        <Link href={`/admin/edit-blog/${p.id}`}>
                          <Button variant="secondary" size="sm" title="Edit">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          title="Delete"
                          onClick={() => {
                            if (confirm(`Delete "${p.title}"? This cannot be undone.`)) onDelete(p.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {(page - 1) * 12 + 1}–{Math.min(page * 12, total)} of {total}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </Button>
            <Button variant="outline" disabled={page >= lastPage} onClick={() => setPage((p) => Math.min(lastPage, p + 1))}>
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
