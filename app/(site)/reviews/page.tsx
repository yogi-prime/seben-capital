'use client'
import React, { useEffect, useMemo, useState } from "react";

// ------- CONFIG -------
const GMB_URL =
  "https://www.google.com/search?sca_esv=1be9f2246bcf563b&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-3M7Ia3OS3QxXeddA4WyGiK5HcogiGJm5CTwxmF0wClc65mMyxtFuMblj0QP-_6m1WiFwPaMW8fJAkPH239LXyJg5m4&q=TransRentals+Reviews&sa=X&ved=2ahUKEwjis7Gn3vWPAxUGzjgGHfiALA0Q0bkNegQIHxAE&biw=1920&bih=911&dpr=1#lrd=0x395e8709ac9f1389:0x9eb6b226fd53ce75,3,,,,";

const STORAGE_KEY = "tr_review_hashes_v4"; // local dedupe

// ------- tiny utils -------
const ri = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const ch = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const shuf = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const hash = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
    h >>>= 0;
  }
  return h.toString(16);
};
const randHex128 = () => {
  const a = new Uint32Array(4);
  crypto.getRandomValues(a);
  return [...a].map((n) => n.toString(16).padStart(8, "0")).join("");
};

// ------- word tokens (customer + vehicle rental only) -------
const fillers = ["Honestly", "FYI", "Quick note", "Real talk", "Tbh", "", "", ""];
const hedges = ["really", "quite", "super", "surprisingly", "genuinely", "fairly", "remarkably"];
const adv = ["smoothly", "seamlessly", "professionally", "politely", "promptly", "reliably"];
const adj = ["clean", "well-maintained", "comfortable", "on-time", "transparent", "value-for-money", "stress-free"];
const verbs = ["handled", "managed", "coordinated", "delivered", "arranged", "sorted", "resolved", "took care of"];
const tokens = [
  "booking",
  "pickup",
  "driver",
  "vehicle condition",
  "pricing",
  "support",
  "availability",
  "navigation",
  "drop-off",
];

const closers = [
  "Highly recommended.",
  "Will book again.",
  "Kudos to the team.",
  "Five stars from me.",
  "Great value.",
  "Totally satisfied.",
  "Two thumbs up.",
];

const starsStr = "★★★★★";

// ------- generator (variable length + structure) -------
function generateVehicleCustomerReview({ allowTypos = false }: { allowTypos?: boolean } = {}) {
  const sCount = ri(2, 6); // variable sentence count
  const seed = randHex128();
  const parts: string[] = [];

  for (let i = 0; i < sCount; i++) {
    const filler = ch(fillers);
    const h = ch(hedges);
    const a = ch(adj);
    const v = ch(verbs);
    const ad = ch(adv);
    const t1 = ch(tokens);
    const t2 = ch(tokens.filter((x) => x !== t1));
    const shape = (seed.charCodeAt(i % seed.length) + i) % 6;

    let s = "";
    if (shape === 0) {
      s = `${filler ? filler + ": " : ""}The ${t1} was ${h} ${a} and everything ran ${ad}.`;
    } else if (shape === 1) {
      s = `They ${v} ${t1} ${ad}, plus ${t2} stayed ${a}.`;
    } else if (shape === 2) {
      const joiner = ch([",", " &", " and"]);
      s = `From ${t1} to ${t2}${joiner} the process felt ${h} smooth.`;
    } else if (shape === 3) {
      s = `I liked how ${t1} was ${v} ${ad}.`;
    } else if (shape === 4) {
      s = `${t1[0].toUpperCase() + t1.slice(1)} was ${a}${Math.random() < 0.35 ? ` and ${h} reliable` : ""}.`;
    } else {
      s = `Pricing matched the estimate and coordination was ${h} easy.`;
    }

    if (allowTypos && Math.random() < 0.08) {
      const i2 = ri(0, Math.max(0, s.length - 2));
      if (!/\s/.test(s[i2])) s = Math.random() < 0.5 ? s.slice(0, i2) + s[i2] + s.slice(i2) : s.slice(0, i2) + s.slice(i2 + 1);
    }
    parts.push(s);
  }

  // closer
  const close = ch(closers);
  const extras = Math.random() < 0.35 ? " " + ch(["Great experience.", "Super convenient.", "Loved the cleanliness."]) : "";
  let text = `${parts.join(" ")} ${close}${extras}`;
  // occasional double space for human vibe
  if (Math.random() < 0.25) text = text.replaceAll(". ", ".  ");
  return text.trim();
}

function ensureUnique(text: string) {
  const usedRaw = localStorage.getItem(STORAGE_KEY);
  const used: string[] = usedRaw ? JSON.parse(usedRaw) : [];
  let out = text;
  let h = hash(out);
  let guard = 0;
  while (used.includes(h) && guard < 6) {
    out = out + (Math.random() < 0.5 ? " +" : " ~");
    h = hash(out);
    guard++;
  }
  used.push(h);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(used.slice(-800)));
  return out;
}

const ReviewsPage: React.FC = () => {
  const [review, setReview] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const make = () => {
    setReview(ensureUnique(generateVehicleCustomerReview({ allowTypos: false })));
    setStatus("New review generated.");
  };

  useEffect(() => {
    make(); // every load = fresh review
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyAndGo = async () => {
    try {
      await navigator.clipboard.writeText(`${review} (${starsStr})`);
      setStatus("✅ Copied. Redirecting…");
    } catch {
      setStatus("Copy blocked — you can paste manually.");
    } finally {
      setTimeout(() => (window.location.href = GMB_URL), 600);
    }
  };

  const S: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100dvh",
      padding: "20px 16px",
      background:
        "radial-gradient(1200px 700px at 80% -10%, #1c2536 0%, #0b0f16 60%), #0b0f16",
      color: "#e5e7eb",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, Segoe UI, Roboto, Arial, sans-serif",
      display: "grid",
      placeItems: "center",
    },
    card: {
      width: "min(920px, 92vw)",
      background: "linear-gradient(180deg,#121a27,#0f1623)",
      border: "1px solid #1f2937",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 10px 30px rgba(0,0,0,.35)",
    },
    head: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
    title: { fontSize: 22, fontWeight: 800, letterSpacing: 0.3 },
    stars: { display: "flex", gap: 4, fontSize: 20 },
    star: { filter: "drop-shadow(0 1px 2px rgba(0,0,0,.35))" },
    text: {
      background: "#0b1220",
      border: "1px dashed #2a3a56",
      borderRadius: 14,
      padding: 16,
      lineHeight: 1.65,
      fontSize: 16,
      color: "#e5e7eb",
      marginTop: 8,
      whiteSpace: "pre-wrap",
    },
    row: {
      marginTop: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      flexWrap: "wrap",
    },
    btn: {
      border: "1px solid #233049",
      background: "#ef3a3a",
      color: "white",
      padding: "12px 16px",
      borderRadius: 12,
      fontWeight: 700,
      cursor: "pointer",
    },
    sub: { fontSize: 12, color: "#9ca3af" },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      padding: "8px 12px",
      borderRadius: 999,
      background: "#101826",
      border: "1px solid #2a3a56",
      color: "#cbd5e1",
    },
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.head}>
          <div style={S.badge}>✨ Quick Review Helper</div>
          <div style={{ flex: 1 }} />
          <div style={S.stars} aria-hidden>
            <span style={S.star}>⭐</span>
            <span style={S.star}>⭐</span>
            <span style={S.star}>⭐</span>
            <span style={S.star}>⭐</span>
            <span style={S.star}>⭐</span>
          </div>
        </div>

        <div style={S.text}>{review || "Generating…"} </div>

        <div style={S.row}>
          <div style={S.sub}>{status || "Copy → Google Reviews opens. Paste & submit."}</div>
          <button style={S.btn} onClick={copyAndGo}>
            Copy & Go to Google Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
