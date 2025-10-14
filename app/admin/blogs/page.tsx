'use client';

import * as React from 'react';
import Link from 'next/link';

// --- shadcn/ui ---
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

// --- icons ---
import {
  Plus, Eye, Edit, Trash2, ExternalLink, RefreshCw, Search, Filter, CheckCircle2, XCircle,
} from 'lucide-react';



// ---- Config ----
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://192.168.29.26:8000/api';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://192.168.29.26:3000';

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
function fmtDate(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
function stripHtml(s: string) {
  return (s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
function clamp(n: number, min = 0, max = 100) { return Math.max(min, Math.min(max, n)); }

/** Compute a 0–100 SEO score + reasons */
function computeSeoScore(p: ApiPost) {
  const reasons: { ok: boolean; label: string }[] = [];
  let score = 0;
  let total = 0;

  function add(points: number, ok: boolean, label: string) {
    total += points;
    if (ok) score += points;
    reasons.push({ ok, label });
  }

  // Title length 30–60
  const title = p.seo_title?.trim() || p.title?.trim() || '';
  add(10, title.length >= 30 && title.length <= 60, `Title length ${title.length} (30–60)`);
  // Meta description 110–160
  const descSrc = (p.seo_description || p.excerpt || stripHtml(p.content_html || '')).trim();
  add(10, descSrc.length >= 110 && descSrc.length <= 160, `Meta description length ${descSrc.length} (110–160)`);
  // Canonical present
  add(6, !!(p.canonical_url || `${SITE_URL}/blog/${p.slug}`), 'Canonical URL present');
  // OG/Twitter image present
  add(6, !!(p.og_data?.image || p.featured_image), 'OpenGraph image present');
  add(4, !!(p.twitter_data?.image || p.og_data?.image || p.featured_image), 'Twitter card image present');
  // Schema present
  add(8, !!p.schema_json, 'Article JSON-LD present');
  // Word count ≥ 800 (scaled)
  const wc = p.word_count || 0;
  const wcScore = clamp((wc / 800) * 8, 0, 8);
  add(8, wcScore >= 4, `Word count ${wc} (≥800 recommended)`);
  score += wcScore; total += 8; // scale-in
  // Read time 3–12
  const rtNum = parseInt((p.read_time || '').replace(/\D/g, '') || '0', 10);
  add(4, rtNum >= 3 && rtNum <= 12, `Read time ${rtNum || '-'} (3–12 min)`);
  // Category + ≥3 tags
  add(6, !!(p.primaryCategory || p.categories?.[0]), 'Primary category selected');
  add(6, (p.tags?.length || 0) >= 3, `Tags count ${(p.tags?.length || 0)} (≥3)`);
  // Image ALT
  add(4, !!p.featured_image_alt, 'Featured image ALT set');
  // Headings H2/H3 present
  const hCount = (p.content_html || '').match(/<(h2|h3)\b/gi)?.length || 0;
  add(6, hCount >= 3, `Subheadings (H2/H3) ${hCount} (≥3)`);
  // Links present
  const linkCount = (p.content_html || '').match(/<a\s+[^>]*href=/gi)?.length || 0;
  add(6, linkCount >= 2, `Links ${linkCount} (≥2)`);

  const finalScore = Math.round(clamp((score / total) * 100));
  return { score: finalScore, reasons };
}

function statusBadge(s: ApiPost['status']) {
  switch (s) {
    case 'published': return <Badge className="bg-green-600">Published</Badge>;
    case 'scheduled': return <Badge className="bg-amber-600">Scheduled</Badge>;
    case 'draft': return <Badge variant="outline">Draft</Badge>;
    case 'archived': return <Badge className="bg-gray-600">Archived</Badge>;
  }
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

      const res = await fetch(`${API_BASE}/posts?${params.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
      const data: Paginated<ApiPost> = await res.json();
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
      const res = await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed ${res.status}`);
      await load();
      alert('Deleted successfully.');
    } catch (e: any) {
      alert(`Delete error: ${e.message ?? e}`);
    }
  }

  const filtered = rows; // server already filters

  return (
    <div className="min-h-screen bg-background">
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

        {/* Table */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle>All Blogs</CardTitle>
            <div className="text-sm text-muted-foreground">{total} total • page {page} of {lastPage}</div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[32px]">#</TableHead>
                    <TableHead>Title & Excerpt</TableHead>
                    <TableHead className="min-w-[140px]">Category</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[110px]">Published</TableHead>
                    <TableHead className="min-w-[160px]">SEO Score</TableHead>
                    <TableHead className="min-w-[180px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8">Loading…</TableCell></TableRow>
                  ) : error ? (
                    <TableRow><TableCell colSpan={7} className="text-center text-destructive py-8">{error}</TableCell></TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8">No posts found.</TableCell></TableRow>
                  ) : (
                    filtered.map((p, i) => {
                      const { score, reasons } = computeSeoScore(p);
                      const cat = p.primaryCategory?.name || p.categories?.[0]?.name || '—';
                      return (
                        <TableRow key={p.id}>
                          <TableCell>{(page - 1) * 12 + i + 1}</TableCell>
                          <TableCell>
                            <div className="font-medium line-clamp-1">{p.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">{p.excerpt || stripHtml(p.content_html || '').slice(0, 140)}</div>
                            <div className="text-xs text-muted-foreground mt-1">/{p.slug}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="whitespace-nowrap">{cat}</Badge>
                          </TableCell>
                          <TableCell>{statusBadge(p.status)}</TableCell>
                          <TableCell className="whitespace-nowrap">{fmtDate(p.published_at)}</TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-3">
                                    <Progress value={score} className="w-32" />
                                    <span className={`text-sm font-medium ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                      {score}/100
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[340px]">
                                  <div className="text-xs space-y-1">
                                    {reasons.map((r, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        {r.ok ? <CheckCircle2 className="h-3.5 w-3.5 text-green-600" /> : <XCircle className="h-3.5 w-3.5 text-red-600" />}
                                        <span>{r.label}</span>
                                      </div>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/blog/${p.slug}`} target="_blank">
                                <Button variant="outline" size="sm" title="Preview">
                                  <Eye className="h-4 w-4 mr-1" /> Preview
                                </Button>
                              </Link>

                              {/* Edit (just alert for now) */}
                            <Link href={`/admin/edit-blog/${p.id}`}>
  <Button variant="secondary" size="sm" title="Edit">
    <Edit className="h-4 w-4 mr-1" /> Edit
  </Button>
</Link>

                              {/* Delete confirm */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm" title="Delete">
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this post?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. Post: <strong>{p.title}</strong>
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      onClick={() => onDelete(p.id)}
                                    >
                                      Yes, delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">Showing {(page - 1) * 12 + 1}–{Math.min(page * 12, total)} of {total}</div>
              <div className="flex gap-2">
                <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Prev
                </Button>
                <Button variant="outline" disabled={page >= lastPage} onClick={() => setPage((p) => Math.min(lastPage, p + 1))}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick tips card */}
        <Card className="card-elevated">
          <CardHeader><CardTitle>SEO Quick Tips</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>• Title 30–60 chars, Meta description 110–160 chars.</div>
            <div>• OG/Twitter images set; JSON-LD present; canonical set.</div>
            <div>• ≥800 words, 3–8 min read, 3+ H2/H3, 3+ tags, 1 category.</div>
            <div>• Add internal & external links; image ALT text; clean slug.</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
