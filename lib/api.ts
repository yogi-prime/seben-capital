// lib/api.ts
export const CONFIG = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:3000',
  API_BASE: process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, '') || 'http://localhost:8000/api',
  IMAGE_BASE: process.env.NEXT_PUBLIC_IMAGE_BASE?.replace(/\/+$/, '') || '', // optional
};

// simple fetch wrapper(s)
type Json = Record<string, any>;
type Options = Omit<RequestInit, 'body'> & { json?: Json; formData?: FormData };

async function request<T = any>(path: string, opts: Options = {}): Promise<T> {
  const url = path.startsWith('http') ? path : `${CONFIG.API_BASE}${path}`;
  const headers: HeadersInit = opts.headers || {};
  let body: any = undefined;

  if (opts.formData) {
    body = opts.formData;
  } else if (opts.json) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(opts.json);
  }

  const res = await fetch(url, { ...opts, headers, body, cache: 'no-store' });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch {
      msg = await res.text();
    }
    throw new Error(msg);
  }
  // try json, else text
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  // @ts-ignore
  return res.text();
}

export const API = {
  get: <T = any>(path: string, opts?: Options) => request<T>(path, { method: 'GET', ...(opts || {}) }),
  post: <T = any>(path: string, opts?: Options) => request<T>(path, { method: 'POST', ...(opts || {}) }),
  put:  <T = any>(path: string, opts?: Options) => request<T>(path, { method: 'PUT',  ...(opts || {}) }),
  del:  <T = any>(path: string, opts?: Options) => request<T>(path, { method: 'DELETE', ...(opts || {}) }),

  // utility: image absolute URL from Laravel /storage path or relative
  img(src?: string | null) {
    if (!src) return '';
    if (/^https?:\/\//i.test(src)) return src;
    if (CONFIG.IMAGE_BASE) return `${CONFIG.IMAGE_BASE}${src.startsWith('/') ? '' : '/'}${src}`;
    // fallback: assume same origin
    return src;
  },

  siteUrl(path = '/') {
    return `${CONFIG.SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  }
};
