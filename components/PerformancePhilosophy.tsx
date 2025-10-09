'use client'

import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell
} from "recharts";

const GOLD = "hsl(var(--copper-primary))";
const TEXT = "hsl(var(--foreground))";
const MUTED = "hsl(var(--muted-foreground))";
const BORDER = "hsl(var(--border))";
const POPOVER = "hsl(var(--popover))";

const CopperLegend = ({ payload }: any) => {
  if (!payload) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      {payload.map((item: any) => (
        <div key={item.value} className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: GOLD, opacity: item.payload?.name === "Our Strategy" ? 1 : 0.7 }}
          />
          <span className="text-sm" style={{ color: MUTED }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

const CopperTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];
  return (
    <div
      style={{
        background: POPOVER,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "10px 12px",
        color: TEXT,
        boxShadow: "0 6px 24px rgba(0,0,0,0.15)"
      }}
    >
      <div style={{ fontWeight: 600, color: GOLD, marginBottom: 2 }}>{label}</div>
      <div className="text-sm">
        Annual Return : <span style={{ color: TEXT, fontWeight: 600 }}>{p.value}%</span>
      </div>
    </div>
  );
};

const PerformancePhilosophy = () => {
  const data = useMemo(
    () => ([
      { name: "FD", value: 6.5, key: "fd" },
      { name: "Debt MF", value: 7.5, key: "debt" },
      { name: "Corporate Bonds", value: 8.5, key: "bonds" },
      { name: "Real Estate", value: 9.0, key: "re" },
      { name: "Balanced Advantage", value: 10.5, key: "baf" },
      { name: "Gold", value: 12.0, key: "gold" },
      { name: "Global Equities (US)", value: 12.5, key: "us" },
      { name: "NIFTY 50", value: 14.0, key: "nifty" },
      { name: "Our Strategy", value: 36.0, key: "ours" },
    ]),
    []
  );

  const metrics = [
    { value: "5–6%", label: "Monthly Target", description: "Portfolio Management objective, not guaranteed", color: "text-success" },
    { value: "≤3%",  label: "Max Drawdown",   description: "Risk management policy limit",                    color: "text-copper-primary" },
    { value: "T+30", label: "Liquidity",       description: "Capital withdrawal timeframe",                    color: "text-foreground" }
  ];

  return (
    <section className="py-24" aria-labelledby="perf-heading">
      <div className="container">
        <div className="text-center mb-16">
          <h2 id="perf-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Performance <span className="text-gradient-copper">Philosophy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We focus on consistent, risk-adjusted returns rather than chasing market peaks. Our approach
            prioritizes capital preservation and sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" itemScope itemType="https://schema.org/ItemList">
          {metrics.map((m, idx) => (
            <Card key={m.label} className="card-elevated text-center hover-copper transition-all duration-300" itemProp="itemListElement">
              <meta itemProp="position" content={String(idx + 1)} />
              <CardHeader className="pb-4">
                <CardTitle className={`text-4xl font-bold font-heading ${m.color} mb-2`} itemProp="name">
                  {m.value}
                </CardTitle>
                <CardDescription className="text-lg font-semibold text-copper-primary" itemProp="description">
                  {m.label}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-elevated mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">
              Benchmark vs Strategy <span className="text-sm font-normal text-muted-foreground">(Illustrative)</span>
            </CardTitle>
            <CardDescription className="text-center mt-2">Annual Return (% CAGR)</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barCategoryGap={20}>
                  <defs>
                    <linearGradient id="copperGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GOLD} stopOpacity={0.95} />
                      <stop offset="100%" stopColor={GOLD} stopOpacity={0.45} />
                    </linearGradient>
                    <linearGradient id="copperBright" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GOLD} stopOpacity={1} />
                      <stop offset="100%" stopColor={GOLD} stopOpacity={0.65} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke={BORDER} opacity={0.4} />
                  <XAxis dataKey="name" tick={{ fill: MUTED }} axisLine={{ stroke: BORDER }} tickLine={{ stroke: BORDER }} />
                  <YAxis tick={{ fill: MUTED }} axisLine={{ stroke: BORDER }} tickLine={{ stroke: BORDER }} unit="%" width={48} domain={[0, 40]} />
                  <Tooltip cursor={{ fill: "hsl(var(--muted)/.15)" }} content={<CopperTooltip />} />
                  <Legend content={<CopperLegend />} />

                  <Bar dataKey="value" name="Annual Return" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={900}>
                    {data.map((entry) => (
                      <Cell key={entry.key} fill={entry.name === "Our Strategy" ? "url(#copperBright)" : "url(#copperGrad)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mt-4">
              <AlertTriangle className="w-4 h-4" />
              <span>Charts show potential, not promises. Backtests are hypothetical; markets carry risk.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-copper-primary/20 bg-copper-primary/5">
          <CardContent className="py-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-copper-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-copper-primary mb-2">Risk Disclosure</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Markets are risky; returns are not guaranteed.</strong> Trading and investing involve substantial risk of loss.
                  Past performance or targets are not indicative of future results. We are not SEBI registered investment advisors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PerformancePhilosophy;
