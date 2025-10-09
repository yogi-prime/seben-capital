'use client'
import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const QRPage: React.FC = () => {
  const [base, setBase] = useState<string>("https://sebencapital.com/reviews");
  const [query, setQuery] = useState<string>(""); // keep empty (customer-centric)
  const [size, setSize] = useState<number>(320);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [url, setUrl] = useState<string>("");

  const makeUrl = () => {
    const u = new URL(base);
    // if you want to prefill city/service later, set via ?city=... etc.
    // For now customer-centric only: keep clean.
    if (query.trim()) {
      // optional freeform
      const params = new URLSearchParams(query.trim());
      params.forEach((v, k) => u.searchParams.set(k, v));
    }
    setUrl(u.toString());
  };

  useEffect(() => {
    makeUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, query]);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    QRCode.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#ffffff" },
    });
  }, [url, size]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "review-qr.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const S: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100dvh",
      padding: 16,
      background:
        "radial-gradient(1200px 700px at 80% -10%, #1c2536 0%, #0b0f16 60%), #0b0f16",
      color: "#e5e7eb",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, Segoe UI, Roboto, Arial, sans-serif",
      display: "grid",
      placeItems: "center",
    },
    card: {
      width: "min(900px, 94vw)",
      background: "linear-gradient(180deg,#121a27,#0f1623)",
      border: "1px solid #1f2937",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 10px 30px rgba(0,0,0,.35)",
    },
    row: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
    input: {
      background: "#0b1220",
      border: "1px solid #233049",
      color: "#e5e7eb",
      borderRadius: 10,
      padding: "10px 12px",
      outline: "none",
    },
    label: { fontSize: 12, color: "#9ca3af" },
    btn: {
      border: "1px solid #233049",
      background: "#ef3a3a",
      color: "white",
      padding: "12px 16px",
      borderRadius: 12,
      fontWeight: 700,
      cursor: "pointer",
    },
    canvasWrap: {
      display: "grid",
      placeItems: "center",
      background: "white",
      borderRadius: 12,
      padding: 12,
      marginTop: 16,
    },
    url: {
      marginTop: 10,
      fontFamily: "monospace",
      fontSize: 12,
      color: "#9ca3af",
      wordBreak: "break-all",
    },
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <h2 style={{ marginTop: 0 }}>🔗 QR for Reviews Page</h2>
        <div style={S.row}>
          <div style={{ flex: "1 1 340px" }}>
            <div style={S.label}>Base URL</div>
            <input
              style={S.input}
              value={base}
              onChange={(e) => setBase(e.target.value)}
              placeholder="https://sebencapital.com/reviews"
            />
          </div>
          <div style={{ flex: "1 1 240px" }}>
            <div style={S.label}>Optional query (key=value&key2=value2)</div>
            <input
              style={S.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="city=Noida&service=Airport%20pickup"
            />
          </div>
          <div>
            <div style={S.label}>Size</div>
            <select
              style={S.input as any}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
            >
              <option value={256}>256</option>
              <option value={320}>320</option>
              <option value={384}>384</option>
              <option value={448}>448</option>
              <option value={512}>512</option>
            </select>
          </div>
          <button style={S.btn} onClick={downloadPng}>
            Download PNG
          </button>
        </div>

        <div style={S.canvasWrap}>
          <canvas ref={canvasRef} width={size} height={size} />
        </div>

        <div style={S.url}>{url}</div>
      </div>
    </div>
  );
};

export default QRPage;
