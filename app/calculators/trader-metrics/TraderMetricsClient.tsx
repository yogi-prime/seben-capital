"use client";

import React, { useMemo, useState } from "react";

// ---- Types & helpers (same logic) ----
type Trade = {
  id: string;
  date?: string;
  side?: "LONG" | "SHORT";
  entry?: number | null;
  exit?: number | null;
  qty?: number | null;
  pnl: number;
  fee?: number | null;
  risk?: number | null;
};

function uid() { return Math.random().toString(36).slice(2, 10); }

function parseNumber(x: string | number | undefined | null): number | null {
  if (x === undefined || x === null) return null;
  if (typeof x === "number") return isFinite(x) ? x : null;
  const n = parseFloat(String(x).trim().replace(/,/g, ""));
  return isFinite(n) ? n : null;
}

function mean(xs: number[]): number { return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0; }

function cumulative(arr: number[]): number[] {
  const out: number[] = [];
  let s = 0; for (const x of arr) { s += x; out.push(s); }
  return out;
}

function computeMetrics(trades: Trade[], startingCapital: number) {
  const pnls = trades.map(t => t.pnl);
  const wins = pnls.filter(x => x > 0);
  const losses = pnls.filter(x => x < 0);

  const winRate = pnls.length ? wins.length / pnls.length : 0;
  const avgWin = wins.length ? mean(wins) : 0;
  const avgLossAbs = losses.length ? Math.abs(mean(losses)) : 0;
  const rr = avgLossAbs > 0 ? avgWin / avgLossAbs : 0;

  const grossWins = wins.reduce((a, b) => a + b, 0);
  const grossLossesAbs = Math.abs(losses.reduce((a, b) => a + b, 0));
  const profitFactor = grossLossesAbs > 0 ? grossWins / grossLossesAbs : 0;

  const expectancy = winRate * avgWin - (1 - winRate) * avgLossAbs;
  const equity = cumulative(pnls).map(x => startingCapital + x);

  return { count: pnls.length, winRate, avgWin, avgLossAbs, rr, profitFactor, expectancy, equity };
}

// ---- Client UI (unchanged visual design) ----
export default function TraderMetricsClient() {
  const [startingCapital, setStartingCapital] = useState<number>(100000);
  const [trades, setTrades] = useState<Trade[]>([]);
  // keeping csvText state in case you wire import later (no UI change)
  const [csvText, setCsvText] = useState<string>("");

  const metrics = useMemo(() => computeMetrics(trades, startingCapital), [trades, startingCapital]);

  const addManual = () =>
    setTrades(t => [
      ...t,
      {
        id: uid(),
        date: new Date().toISOString().slice(0, 10),
        side: "LONG",
        entry: null,
        exit: null,
        qty: null,
        pnl: 0,
        fee: null,
        risk: null,
      },
    ]);

  const updateTrade = (id: string, key: keyof Trade, value: any) => {
    setTrades(ts => ts.map(t => (t.id === id ? { ...t, [key]: parseNumber(value) ?? value } : t)));
  };

  const removeTrade = (id: string) => setTrades(ts => ts.filter(t => t.id !== id));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-indigo-400">Trader Metrics Calculator</h1>
      <p className="text-gray-400 mb-8">
        Drop your trades and instantly get Win%, RR, Profit Factor, Expectancy, and Drawdowns in a sleek UI.
      </p>

      {/* Config */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <label className="flex flex-col">
          <span className="text-sm text-gray-400 mb-1">Starting Capital</span>
          <input
            type="number"
            inputMode="numeric"
            value={startingCapital}
            onChange={e => setStartingCapital(parseNumber(e.target.value) || 0)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:ring focus:ring-indigo-500"
          />
        </label>
        <div className="flex items-end gap-3">
          <button
            onClick={addManual}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold"
          >
            Add Trade
          </button>
          <button
            onClick={() => setTrades([])}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition text-white font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Trades Table */}
      <div className="overflow-auto border border-gray-700 rounded-lg mb-8">
        <table className="min-w-full text-sm" aria-label="Trades table">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Side</th>
              <th className="text-left p-3">Entry</th>
              <th className="text-left p-3">Exit</th>
              <th className="text-left p-3">Qty</th>
              <th className="text-left p-3">PnL</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(t => (
              <tr key={t.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                <td className="p-2">
                  <input
                    value={t.date || ""}
                    onChange={e => updateTrade(t.id, "date", e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <select
                    value={t.side || "LONG"}
                    onChange={e => updateTrade(t.id, "side", e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                  >
                    <option>LONG</option>
                    <option>SHORT</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={t.entry ?? ""}
                    onChange={e => updateTrade(t.id, "entry", e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={t.exit ?? ""}
                    onChange={e => updateTrade(t.id, "exit", e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={t.qty ?? ""}
                    onChange={e => updateTrade(t.id, "qty", e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={t.pnl}
                    onChange={e => updateTrade(t.id, "pnl", e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => removeTrade(t.id)}
                    className="text-red-400 hover:text-red-300"
                    aria-label="Delete trade"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {trades.length === 0 && (
              <tr>
                <td className="p-3 text-gray-400" colSpan={7}>
                  No trades added yet. Click “Add Trade” to begin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <MetricCard label="Trades" value={metrics.count} />
        <MetricCard label="Win Rate" value={`${(metrics.winRate * 100).toFixed(1)}%`} />
        <MetricCard label="Avg Win" value={metrics.avgWin.toFixed(2)} />
        <MetricCard label="Avg Loss" value={`-${metrics.avgLossAbs.toFixed(2)}`} />
        <MetricCard label="RR (avg)" value={metrics.rr.toFixed(2)} />
        <MetricCard label="Profit Factor" value={metrics.profitFactor.toFixed(2)} />
        <MetricCard label="Expectancy / trade" value={metrics.expectancy.toFixed(2)} />
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-xl font-semibold text-indigo-300">{value}</div>
    </div>
  );
}
