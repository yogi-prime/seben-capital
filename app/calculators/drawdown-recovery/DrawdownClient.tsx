"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, RotateCcw, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  peakEquity: z
    .string()
    .min(1, "Peak equity is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  currentEquity: z
    .string()
    .min(1, "Current equity is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
});

type Result = {
  drawdownPercent: number;
  requiredGainPercent: number;
  timeEstimates: Array<{ monthlyReturn: number; months: number; years: number }>;
} | null;

export default function DrawdownClient() {
  const [results, setResults] = useState<Result>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { peakEquity: "100000", currentEquity: "80000" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const peak = Number(values.peakEquity);
    const current = Number(values.currentEquity);

    const drawdownPercent = ((peak - current) / peak) * 100;
    const requiredGainPercent = ((peak - current) / current) * 100;

    const monthlyReturns = [1, 2, 3, 5, 8, 10];
    const timeEstimates = monthlyReturns.map((mr) => {
      const months = Math.log(peak / current) / Math.log(1 + mr / 100);
      return { monthlyReturn: mr, months: Math.round(months), years: Math.round((months / 12) * 10) / 10 };
    });

    setResults({ drawdownPercent, requiredGainPercent, timeEstimates });
  };

  const handleReset = () => {
    form.reset();
    setResults(null);
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const severity = (d: number) => {
    if (d < 10) return { level: "Low", color: "text-success" };
    if (d < 20) return { level: "Moderate", color: "text-copper-primary" };
    if (d < 35) return { level: "High", color: "text-destructive" };
    return { level: "Severe", color: "text-destructive" };
  };

  return (
    <main className="py-8">
      <div className="container max-w-6xl">
        {/* H1 area */}
        <header className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-copper rounded-2xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">
                Drawdown &amp; Recovery Calculator
              </h1>
              <p className="text-muted-foreground">
                Calculate recovery requirements after portfolio drawdowns
              </p>
            </div>
          </div>
          <div className="mt-3">
            <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
              Educational Tool Only
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input form */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-copper-primary" />
                Portfolio Values
              </CardTitle>
              <CardDescription>Enter your peak and current portfolio values</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <FormField
                    control={form.control}
                    name="peakEquity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peak Portfolio Value (₹)</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="100000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentEquity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Portfolio Value (₹)</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="80000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">
                      Calculate Recovery
                    </Button>
                    <Button type="button" variant="outline" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-copper-primary">Recovery Analysis</CardTitle>
              <CardDescription>Understanding your drawdown and recovery requirements</CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6" aria-live="polite">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <div className="text-sm text-muted-foreground">Current Drawdown</div>
                      </div>
                      <div className="text-2xl font-bold text-destructive">
                        -{results.drawdownPercent.toFixed(2)}%
                      </div>
                      <div className={`text-sm font-medium ${severity(results.drawdownPercent).color}`}>
                        {severity(results.drawdownPercent).level} Drawdown
                      </div>
                    </div>

                    <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                      <div className="text-sm text-copper-primary font-semibold mb-1">Required Gain to Recover</div>
                      <div className="text-2xl font-bold text-copper-primary">
                        +{results.requiredGainPercent.toFixed(2)}%
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        From current level: {formatCurrency(Number(form.getValues("currentEquity")))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/10 rounded-lg border border-copper-primary/20">
                    <h2 className="font-semibold text-copper-primary mb-3 text-base">Key Insight</h2>
                    <p className="text-sm text-muted-foreground">
                      A {results.drawdownPercent.toFixed(1)}% loss requires a {results.requiredGainPercent.toFixed(1)}% gain
                      to recover. This asymmetry highlights the importance of risk management.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingDown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your portfolio values and click Calculate to see recovery analysis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Time Estimates */}
        {results && (
          <Card className="card-elevated mt-8">
            <CardHeader>
              <CardTitle className="text-copper-primary">Recovery Time Estimates</CardTitle>
              <CardDescription>Time needed to recover at different monthly return rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.timeEstimates.map((e) => (
                  <div key={e.monthlyReturn} className="p-4 bg-muted/20 rounded-lg text-center">
                    <div className="text-lg font-bold text-copper-primary">{e.monthlyReturn}% per month</div>
                    <div className="text-sm text-muted-foreground mb-2">Monthly Return</div>
                    <div className="text-xl font-bold">{e.months} months</div>
                    <div className="text-sm text-muted-foreground">({e.years} years)</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                <h2 className="font-semibold text-copper-primary mb-2 text-base">Recovery Strategy</h2>
                <p className="text-sm text-muted-foreground">
                  Focus on consistent, risk-managed returns instead of taking outsized risks after losses.
                  Sustainable 2–3% monthly returns can recover drawdowns within reasonable timeframes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational section */}
        <section className="mt-12">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-copper-primary">Understanding Drawdowns</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-copper-primary">Why Recovery % &gt; Drawdown %</h2>
                  <div className="space-y-2 text-sm bg-muted/20 p-4 rounded-lg">
                    <p><strong>Example:</strong> 50% drawdown needs 100% gain</p>
                    <p>• From ₹100,000 to ₹50,000 = −50%</p>
                    <p>• From ₹50,000 to ₹100,000 = +100%</p>
                    <p><strong>Formula:</strong> Required Gain = (Peak − Current) ÷ Current</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-copper-primary">Drawdown Management</h2>
                  <ul className="space-y-2 text-sm">
                    <li>• Set maximum drawdown limits (10–20%)</li>
                    <li>• Position sizing to control risk</li>
                    <li>• Diversify strategies/timeframes</li>
                    <li>• Avoid revenge trading after losses</li>
                    <li>• Focus on process over outcome</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center text-sm text-muted-foreground">
            <strong>Educational Use Only:</strong> This tool is for education and not financial advice. Past performance does not
            guarantee future results.
          </p>
        </section>
      </div>
    </main>
  );
}
