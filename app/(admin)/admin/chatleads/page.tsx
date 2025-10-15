'use client';

import { useEffect, useState } from 'react';
import { API } from '@/lib/api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Loader2, Search, Phone, Mail, Share2, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Lead = {
  id: number;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  status: 'in_progress' | 'submitted';
  answers?: Record<string, any> | null;
  messages_count: number;
  created_at: string;
  updated_at: string;
};

type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

function fmt(dt: string) {
  try { return new Date(dt).toLocaleString(); } catch { return dt; }
}

// Build the friendly outreach copy (plain text so it works for email and WhatsApp)
function buildGreetingText(lead: Lead) {
  const first = (lead.name || '').split(' ')[0] || 'there';
  return [
    `Hi ${first},`,
    ``,
    `This side Seben Team — hope you're doing great! 🙌`,
    ``,
    `Thanks for connecting with us. We'd love to help you choose the right course.`,
    `Could you tell us which course you’re most interested in (e.g. Utkarsh, Options Strategies, Risk Management)?`,
    ``,
    `If you want, reply with a quick note about your current level and goals — we’ll guide you to the best path.`,
    ``,
    `Best regards,`,
    `Seben Team`,
    `https://sebencapital.com`,
  ].join('\n');
}

export default function ChatLeadsPage() {
  const { toast } = useToast();

  // filters
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sort, setSort] = useState('-created_at');
  const [page, setPage] = useState(1);

  // data
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<{current_page: number, last_page: number, total: number}>({current_page: 1, last_page: 1, total: 0});

  // detail drawer
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<any | null>(null);
  const perPage = 20;

  async function fetchLeads(p = 1) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (status !== 'all') params.set('status', status);
      if (from) params.set('date_from', from);
      if (to) params.set('date_to', to);
      params.set('per_page', String(perPage));
      params.set('page', String(p));
      params.set('sort', sort);

      const res = await API.get<Paginated<Lead>>(`/chatbot/leads?${params.toString()}`);
      setRows(res.data);
      setMeta({ current_page: res.current_page, last_page: res.last_page, total: res.total });
      setPage(res.current_page);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchLeads(1); /* eslint-disable-next-line */ }, [status, from, to, sort]);

  const onSearch = () => fetchLeads(1);

  async function openDetail(id: number) {
    setOpen(true);
    setDetail(null);
    try {
      const res = await API.get<{ data: any }>(`/chatbot/leads/${id}?include=messages`);
      setDetail(res.data);
    } catch (e) { console.error(e); }
  }

  function exportCsv() {
    const header = ['ID','Name','Phone','Email','Status','Created At'];
    const rowsCsv = rows.map(r => [r.id, r.name ?? '', r.phone ?? '', r.email ?? '', r.status, fmt(r.created_at)]);
    const csv = [header, ...rowsCsv].map(a => a.map(x => `"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `chatleads-page-${page}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  // ---------- Actions ----------
  function doCall(phone?: string | null) {
    if (!phone) {
      toast({ title: 'No phone number', description: 'This lead does not have a phone number.' });
      return;
    }
    // strip everything except digits and +
    const normalized = phone.replace(/[^\d+]/g, '');
    window.location.href = `tel:${normalized}`;
  }

  // Robust mail flow: mailto → Gmail fallback → clipboard fallback
  function doEmail(lead: Lead) {
    if (!lead.email) {
      toast({ title: 'No email', description: 'This lead does not have an email.' });
      return;
    }

    const subject = encodeURIComponent('Quick hello from Seben Capital ✨');
    const body = encodeURIComponent(buildGreetingText(lead));

    const mailto = `mailto:${encodeURIComponent(lead.email)}?subject=${subject}&body=${body}`;

    // 1) Hidden anchor click
    const a = document.createElement('a');
    a.href = mailto;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();

    // 2) Gmail fallback
    setTimeout(() => {
      if (!document.hidden) {
        const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          lead.email!
        )}&su=${subject}&body=${body}`;

        const w = window.open(gmail, '_blank', 'noopener,noreferrer');
        if (!w) {
          // 3) Clipboard fallback
          navigator.clipboard.writeText(
            `To: ${lead.email}\nSubject: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`
          );
          toast({
            title: 'Email composer blocked',
            description: 'We copied a ready-made email to your clipboard. Paste it into your email app.',
          });
        }
      }
    }, 600);
  }

  // WhatsApp: direct to wa.me with same message. If phone present, DM to that number; else open composer with just text.
  function doWhatsApp(lead: Lead) {
    const text = encodeURIComponent(buildGreetingText(lead));

    // normalize phone to international (best-effort for Indian numbers)
    let phone = (lead.phone || '').replace(/[^\d+]/g, '');
    if (phone && !phone.startsWith('+')) {
      const digits = phone.replace(/\D/g, '');
      // If 10-digit (Indian) assume +91; adjust this to your primary audience
      if (digits.length === 10) phone = `+91${digits}`;
      else if (digits.length > 10 && digits.startsWith('0')) phone = `+${digits.slice(1)}`;
      else if (!phone.startsWith('+')) phone = `+${digits}`;
    }

    const url = phone
      ? `https://wa.me/${encodeURIComponent(phone)}?text=${text}`
      : `https://wa.me/?text=${text}`;

    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) {
      navigator.clipboard.writeText(decodeURIComponent(text));
      toast({
        title: 'WhatsApp blocked',
        description: 'We copied the message to your clipboard. Open WhatsApp and paste it.',
      });
    }
  }

  async function doShare(lead: Lead) {
    const text = [
      `Seben Lead`,
      `Name: ${lead.name || '—'}`,
      `Phone: ${lead.phone || '—'}`,
      `Email: ${lead.email || '—'}`,
      `Status: ${lead.status}`,
      `Created: ${fmt(lead.created_at)}`
    ].join('\n');

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lead', text });
        return;
      } catch { /* user cancelled */ }
    }
    await navigator.clipboard.writeText(text);
    toast({ title: 'Copied', description: 'Lead details copied to clipboard.' });
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Chat Leads</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv}><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
            <Button onClick={() => fetchLeads(page)} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Refresh
            </Button>
          </div>
        </div>

        <Card className="card-elevated">
          <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-5">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                onKeyDown={(e)=>{ if(e.key==='Enter') onSearch(); }}
                placeholder="Search name / phone / email"
                className="pl-9"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
            <Input type="date" value={to} onChange={e=>setTo(e.target.value)} />

            <div className="md:col-span-5 flex justify-between items-center">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Sort" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="-created_at">Newest</SelectItem>
                  <SelectItem value="created_at">Oldest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="-id">ID (desc)</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=>{ setQ(''); setStatus('all'); setFrom(''); setTo(''); setSort('-created_at'); fetchLeads(1); }}>
                  Clear
                </Button>
                <Button onClick={onSearch}><Search className="w-4 h-4 mr-2" />Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated overflow-hidden">
          <CardHeader><CardTitle>Leads ({meta.total})</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="min-w-[160px]">Name</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Msgs</TableHead>
                    <TableHead className="hidden xl:table-cell">Created</TableHead>
                    <TableHead className="w-[180px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map(r => (
                    <TableRow key={r.id} className="hover:bg-muted/50">
                      <TableCell>{r.id}</TableCell>
                      <TableCell className="font-medium">{r.name || <span className="text-muted-foreground">—</span>}</TableCell>
                      <TableCell className="hidden md:table-cell">{r.phone || '—'}</TableCell>
                      <TableCell className="hidden lg:table-cell">{r.email || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === 'submitted' ? 'default' : 'outline'}>
                          {r.status.replace('_',' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{r.messages_count}</TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">{fmt(r.created_at)}</TableCell>

                      {/* ACTIONS */}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon" variant="outline"
                                aria-label="Call"
                                onClick={() => doCall(r.phone)}
                                disabled={!r.phone}
                                className="border-copper-primary/30"
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Call</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon" variant="outline"
                                aria-label="Email"
                                onClick={() => doEmail(r)}
                                disabled={!r.email}
                                className="border-copper-primary/30"
                              >
                                <Mail className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Email</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon" variant="outline"
                                aria-label="WhatsApp"
                                onClick={() => doWhatsApp(r)}
                                className="border-copper-primary/30"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>WhatsApp</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon" variant="outline"
                                aria-label="Share"
                                onClick={() => doShare(r)}
                                className="border-copper-primary/30"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Share / Copy</TooltipContent>
                          </Tooltip>

                          <Button
                            variant="ghost"
                            className="hidden sm:inline px-2 text-copper-primary"
                            onClick={() => openDetail(r.id)}
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {!rows.length && !loading && (
                    <TableRow><TableCell colSpan={8} className="text-center py-10 text-muted-foreground">No leads</TableCell></TableRow>
                  )}
                  {loading && (
                    <TableRow><TableCell colSpan={8} className="text-center py-10"><Loader2 className="w-5 h-5 animate-spin inline-block" /></TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {meta.current_page} of {meta.last_page}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" disabled={page<=1 || loading} onClick={()=>{ const p = Math.max(1, page-1); fetchLeads(p); }}>
                  Prev
                </Button>
                <Button variant="outline" disabled={page>=meta.last_page || loading} onClick={()=>{ const p = Math.min(meta.last_page, page+1); fetchLeads(p); }}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detail drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-full sm:max-w-[560px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Lead Details</SheetTitle>
            </SheetHeader>

            {!detail ? (
              <div className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin inline-block" /></div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div><div className="text-xs text-muted-foreground">ID</div><div className="font-medium">{detail.id}</div></div>
                  <div><div className="text-xs text-muted-foreground">Status</div><Badge>{detail.status}</Badge></div>
                  <div><div className="text-xs text-muted-foreground">Name</div><div>{detail.name || '—'}</div></div>
                  <div><div className="text-xs text-muted-foreground">Phone</div><div>{detail.phone || '—'}</div></div>
                  <div><div className="text-xs text-muted-foreground">Email</div><div>{detail.email || '—'}</div></div>
                  <div><div className="text-xs text-muted-foreground">Created</div><div>{fmt(detail.created_at)}</div></div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Answers</div>
                  <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">{JSON.stringify(detail.answers || {}, null, 2)}</pre>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Transcript ({detail.messages?.length || 0})</div>
                  <div className="space-y-2">
                    {(detail.messages || []).map((m: any) => (
                      <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-2 rounded-md text-xs ${m.type === 'user' ? 'bg-copper-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          <div className="opacity-70 mb-1">{m.type} • {fmt(m.created_at)}</div>
                          <div>{m.content}</div>
                        </div>
                      </div>
                    ))}
                    {!detail.messages?.length && <div className="text-sm text-muted-foreground">No messages.</div>}
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}
