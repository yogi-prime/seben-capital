"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ArrowLeft, Copy, RotateCcw, Info, TrendingUp, TrendingDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  winRate: z.string().min(1, "Win rate is required").refine((v) => !isNaN(Number(v)) && Number(v) > 0 && Number(v) <= 100, "Must be between 0 and 100"),
  avgWin: z.string().min(1, "Average win is required").refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  avgLoss: z.string().min(1, "Average loss is required").refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  tradesPerMonth: z.string().min(1, "Trades per month is required").refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  isRRatio: z.boolean().default(true),
});

type Result = {
  riskRewardRatio: number;
  expectancyPerTrade: number;
  monthlyExpectancy: number;
  winRate: number;
  lossRate: number;
  profitablityStatus: "profitable" | "unprofitable" | "breakeven";
  breakevenWinRate: number;
} | null;

// Tailwind-safe helper (avoids dynamic class names)
const statusTextClass = (s: "profitable" | "unprofitable" | "breakeven") =>
  s === "profitable" ? "text-success" : s === "unprofitable" ? "text-destructive" : "text-muted-foreground";

const StatusIconCmp = (s: "profitable" | "unprofitable" | "breakeven") =>
  s === "profitable" ? TrendingUp : s === "unprofitable" ? TrendingDown : BarChart3;

export default function RiskRewardClient() {
  const { toast } = useToast();
  const [isRRatio, setIsRRatio] = useState(true);
  const [results, setResults] = useState<Result>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { winRate: "60", avgWin: "2", avgLoss: "1", tradesPerMonth: "20", isRRatio: true },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const winRate = Number(values.winRate) / 100;
    const lossRate = 1 - winRate;
    const avgWin = Number(values.avgWin);
    const avgLoss = Number(values.avgLoss);
    const tradesPerMonth = Number(values.tradesPerMonth);

    const riskRewardRatio = avgWin / avgLoss;
    const expectancyPerTrade = winRate * avgWin - lossRate * avgLoss;
    const monthlyExpectancy = expectancyPerTrade * tradesPerMonth;

    let profitablityStatus: Result extends { profitablityStatus: infer P } ? any : never;
    if (expectancyPerTrade > 0.05) profitablityStatus = "profitable";
    else if (expectancyPerTrade < -0.05) profitablityStatus = "unprofitable";
    else profitablityStatus = "breakeven";

    const breakevenWinRate = avgLoss / (avgWin + avgLoss);

    setResults({
      riskRewardRatio,
      expectancyPerTrade,
      monthlyExpectancy,
      winRate: winRate * 100,
      lossRate: lossRate * 100,
      profitablityStatus,
      breakevenWinRate: breakevenWinRate * 100,
    });
  };

  const handleReset = () => {
    form.reset();
    setResults(null);
  };

  const copyResult = (v: string) => {
    navigator.clipboard.writeText(v);
    toast({ title: "Copied to clipboard", description: "Value has been copied to your clipboard." });
  };

  const formatNumber = (n: number, d = 2) => n.toFixed(d);

  return (
    <TooltipProvider>
      <main className="py-12">
        <div className="container max-w-6xl">
          {/* Header / hero (kept same) */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/tools">
                <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Tools
                </Button>
              </Link>
              <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">Educational Tool Only</Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-copper rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">Risk/Reward &amp; Expectancy</h1>
                <p className="text-muted-foreground">Calculate trading expectancy and risk-reward ratios for your strategy</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-copper-primary" /> Trading Parameters
                </CardTitle>
                <CardDescription>Enter your trading statistics to analyze profitability</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <FormField
                      control={form.control}
                      name="winRate"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Win Rate (%)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Percentage of winning trades</p></TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl><Input inputMode="decimal" placeholder="60" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Label className="text-sm font-medium">Input Type:</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={isRRatio ? "default" : "outline"}
                            size="sm"
                            onClick={() => { setIsRRatio(true); form.setValue("isRRatio", true); }}
                            className={isRRatio ? "bg-gradient-copper hover:scale-105" : "border-copper-primary/30"}
                          >
                            R Multiples
                          </Button>
                          <Button
                            type="button"
                            variant={!isRRatio ? "default" : "outline"}
                            size="sm"
                            onClick={() => { setIsRRatio(false); form.setValue("isRRatio", false); }}
                            className={!isRRatio ? "bg-gradient-copper hover:scale-105" : "border-copper-primary/30"}
                          >
                            Currency
                          </Button>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="avgWin"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormLabel>Average Win ({isRRatio ? "R" : "₹"})</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                                <TooltipContent><p>{isRRatio ? "Risk multiples (e.g., 2R = 2× risk)" : "Average profit per winning trade"}</p></TooltipContent>
                              </Tooltip>
                            </div>
                            <FormControl><Input inputMode="decimal" placeholder={isRRatio ? "2" : "1000"} {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="avgLoss"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormLabel>Average Loss ({isRRatio ? "R" : "₹"})</FormLabel>
                              <Tooltip>
                                <TooltipTrigger asChild><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                                <TooltipContent><p>{isRRatio ? "Usually 1R (your defined risk)" : "Average loss per losing trade"}</p></TooltipContent>
                              </Tooltip>
                            </div>
                            <FormControl><Input inputMode="decimal" placeholder={isRRatio ? "1" : "500"} {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="tradesPerMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trades per Month</FormLabel>
                          <FormControl><Input inputMode="numeric" placeholder="20" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">Calculate</Button>
                      <Button type="button" variant="outline" onClick={() => { handleReset(); setIsRRatio(true); }}>
                        <RotateCcw className="w-4 h-4 mr-2" /> Reset
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-copper-primary">Analysis Results</CardTitle>
                <CardDescription>Your trading strategy profitability analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6" aria-live="polite">
                    {/* Status */}
                    <div
                      className={`p-4 rounded-lg border ${
                        results.profitablityStatus === "profitable"
                          ? "bg-success/10 border-success/20"
                          : results.profitablityStatus === "unprofitable"
                          ? "bg-destructive/10 border-destructive/20"
                          : "bg-muted/10 border-muted/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const Ico = StatusIconCmp(results.profitablityStatus);
                          return <Ico className={`w-6 h-6 ${statusTextClass(results.profitablityStatus)}`} />;
                        })()}
                        <div>
                          <div className={`font-bold text-lg capitalize ${statusTextClass(results.profitablityStatus)}`}>
                            {results.profitablityStatus} Strategy
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {results.profitablityStatus === "profitable"
                              ? "Your strategy has positive expectancy"
                              : results.profitablityStatus === "unprofitable"
                              ? "Your strategy has negative expectancy"
                              : "Your strategy is near breakeven"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Risk:Reward Ratio</Label>
                            <div className="text-2xl font-bold text-copper-primary">1:{formatNumber(results.riskRewardRatio)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.riskRewardRatio.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg ${
                          results.expectancyPerTrade > 0
                            ? "bg-success/10 border border-success/20"
                            : results.expectancyPerTrade < 0
                            ? "bg-destructive/10 border border-destructive/20"
                            : "bg-muted/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Expectancy per Trade</Label>
                            <div
                              className={`text-xl font-bold ${
                                results.expectancyPerTrade > 0
                                  ? "text-success"
                                  : results.expectancyPerTrade < 0
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {isRRatio ? "" : "₹"}
                              {formatNumber(results.expectancyPerTrade)}
                              {isRRatio ? "R" : ""}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.expectancyPerTrade.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Monthly Expectancy</Label>
                            <div
                              className={`text-xl font-bold ${
                                results.monthlyExpectancy > 0
                                  ? "text-success"
                                  : results.monthlyExpectancy < 0
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {isRRatio ? "" : "₹"}
                              {formatNumber(results.monthlyExpectancy)}
                              {isRRatio ? "R" : ""}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.monthlyExpectancy.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-copper-primary font-semibold">Breakeven Win Rate</Label>
                            <div className="text-lg font-bold text-copper-primary">{formatNumber(results.breakevenWinRate)}%</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.breakevenWinRate.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {results.winRate > results.breakevenWinRate
                            ? `Your ${formatNumber(results.winRate)}% win rate is above breakeven`
                            : `Your ${formatNumber(results.winRate)}% win rate is below breakeven`}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-lg border ${
                        results.profitablityStatus === "profitable"
                          ? "bg-success/10 border-success/20"
                          : "bg-destructive/10 border-destructive/20"
                      }`}
                    >
                      <h4
                        className={`font-semibold mb-2 ${
                          results.profitablityStatus === "profitable" ? "text-success" : "text-destructive"
                        }`}
                      >
                        {results.profitablityStatus === "profitable" ? "Strategy Strengths" : "Improvement Areas"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {results.profitablityStatus === "profitable"
                          ? `Excellent! Your strategy generates ${formatNumber(results.expectancyPerTrade)} ${isRRatio ? "R" : "₹"} per trade on average.`
                          : `Consider improving your win rate above ${formatNumber(results.breakevenWinRate)}% or increasing your risk-reward ratio.`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Enter your trading parameters and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Educational section (kept same content/structure) */}
          <Card className="card-elevated mt-12">
            <CardHeader><CardTitle className="text-copper-primary">Understanding Expectancy</CardTitle></CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-copper-primary">Formulas</h4>
                  <div className="space-y-2 text-sm bg-muted/20 p-4 rounded-lg">
                    <p><strong>Risk:Reward Ratio</strong> = Average Win ÷ Average Loss</p>
                    <p><strong>Expectancy</strong> = (Win Rate × Avg Win) − (Loss Rate × Avg Loss)</p>
                    <p><strong>Breakeven Win Rate</strong> = Avg Loss ÷ (Avg Win + Avg Loss)</p>
                    <p><strong>Monthly Expectancy</strong> = Expectancy × Trades per Month</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-copper-primary">Key Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Positive expectancy = profitable strategy</li>
                    <li>• Higher R:R ratios require lower win rates</li>
                    <li>• Focus on expectancy, not just win rate</li>
                    <li>• Track actual performance vs. expected</li>
                    <li>• Consider transaction costs in real trading</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Educational Use Only:</strong> This tool is for education and not financial advice. Past performance does not
              guarantee future results.
            </p>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
