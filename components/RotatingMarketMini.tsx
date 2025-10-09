'use client'

import { useEffect, useMemo, useState } from "react";
import TradingViewMini from "@/components/TradingViewMini";

type Item = { label?: string; symbol: string };

type Props = {
  items: Item[];
  intervalMs?: number;
  height?: number | string;
  theme?: "dark" | "light";
};

export default function RotatingMarketMini({
  items,
  intervalMs = 5000,
  height = 260,
  theme = "dark",
}: Props) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!safeItems.length) return;
    const id = setInterval(() => setI((p) => (p + 1) % safeItems.length), intervalMs);
    return () => clearInterval(id);
  }, [safeItems.length, intervalMs]);

  if (!safeItems.length) return null;

  const current = safeItems[i];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-muted-foreground">{current.label ?? current.symbol}</div>
        <div className="text-[11px] text-muted-foreground">auto-rotating • {Math.round(intervalMs / 1000)}s</div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <TradingViewMini
          symbol={current.symbol}
          dateRange="12M"
          colorTheme={theme}
          autosize
          height={height}
          isTransparent
          noTimeScale={false}
          locale="en"
        />
      </div>
    </div>
  );
}
