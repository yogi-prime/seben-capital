'use client'

import { memo, useEffect, useRef } from "react";

type Props = {
  symbol: string;               // e.g. "FX_IDC:USDINR"
  dateRange?: string;           // "12M" | "6M" | ...
  colorTheme?: "dark" | "light";
  autosize?: boolean;
  width?: number | string;
  height?: number | string;
  isTransparent?: boolean;
  noTimeScale?: boolean;
  locale?: string;
};

const TradingViewMini = memo(function TradingViewMini({
  symbol,
  dateRange = "12M",
  colorTheme = "dark",
  autosize = true,
  width = "100%",
  height = 220,
  isTransparent = true,
  noTimeScale = false,
  locale = "en",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.type = "text/javascript";

    script.innerHTML = JSON.stringify({
      symbol,
      chartOnly: false,
      dateRange,
      noTimeScale,
      colorTheme,
      isTransparent,
      locale,
      autosize,
      width: autosize ? "100%" : width,
      height: autosize ? "100%" : height,
    });

    containerRef.current.appendChild(script);
    return () => { if (containerRef.current) containerRef.current.innerHTML = ""; };
  }, [symbol, dateRange, colorTheme, autosize, width, height, isTransparent, noTimeScale, locale]);

  return (
    <div
      className="tradingview-widget-container rounded-lg overflow-hidden"
      style={{ width: "100%", height: typeof height === "number" ? `${height}px` : height }}
      ref={containerRef}
      aria-label={`${symbol} mini chart`}
    >
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          href={`https://www.tradingview.com/symbols/${symbol.replace(":", "-")}/`}
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">{symbol} chart by TradingView</span>
        </a>
      </div>
    </div>
  );
});

export default TradingViewMini;
