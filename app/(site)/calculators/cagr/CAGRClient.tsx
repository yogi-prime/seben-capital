"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const formSchema = z.object({
  initialValue: z.string().min(1, "Initial value is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  finalValue: z.string().min(1, "Final value is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  years: z.string().min(1, "Years is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
});

type Result = {
  cagr: number;
  totalGrowth: number;
  yearlyGrowth: Array<{ year: number; value: number; growth: number }>;
} | null;

export default function CAGRClient() {
  const [results, setResults] = useState<Result>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { initialValue: "100000", finalValue: "200000", years: "5" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const initial = Number(values.initialValue);
    const finalV = Number(values.finalValue);
    const yrs = Number(values.years);

    const cagr = (Math.pow(finalV / initial, 1 / yrs) - 1) * 100;
    const totalGrowth = ((finalV - initial) / initial) * 100;

    const yearlyGrowth: Result["yearlyGrowth"] = [];
    const r = 1 + cagr / 100;

    for (let y = 0; y <= yrs; y++) {
      const value = initial * Math.pow(r, y);
      yearlyGrowth.push({
        year: y,
        value: Math.round(value),
        growth: y === 0 ? 0 : Math.round((((value - initial) / initial) * 100) * 100) / 100,
      });
    }

    setResults({ cagr, totalGrowth, yearlyGrowth });
  };

  const handleReset = () => {
    form.reset();
    setResults(null);
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const getCAGRRating = (c: number) => {
    if (c < 8) return { rating: "Conservative", color: "text-muted-foreground" };
    if (c < 12) return { rating: "Good", color: "text-copper-primary" };
    if (c < 18) return { rating: "Excellent", color: "text-success" };
    return { rating: "Outstanding", color: "text-success" };
  };

  return (
    <main className="py-8">
      <div className="container max-w-6xl">
        {/* Header area (H1) */}
        <header className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-copper rounded-2xl flex items-center justify-center">
              <Percent className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">
                CAGR Calculator (Compound Annual Growth Rate)
              </h1>
              <p className="text-muted-foreground">Calculate annualised returns with chart, examples and benchmarks.</p>
            </div>
          </div>
          <div className="mt-3">
            <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
              Educational Tool Only
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-copper-primary" />
                Investment Details
              </CardTitle>
              <CardDescription>Enter start value, end value and period</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <FormField
                    control={form.control}
                    name="initialValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Investment (₹)</FormLabel>
                        <FormControl><Input inputMode="numeric" placeholder="100000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="finalValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Value (₹)</FormLabel>
                        <FormControl><Input inputMode="numeric" placeholder="200000" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="years"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Period (Years)</FormLabel>
                        <FormControl><Input inputMode="numeric" placeholder="5" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">
                      Calculate CAGR
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
              <CardTitle className="text-copper-primary">CAGR Analysis</CardTitle>
              <CardDescription>Your compound annual growth rate</CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6" aria-live="polite">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                      <div className="text-center">
                        <div className="text-sm text-copper-primary font-semibold mb-2">Compound Annual Growth Rate</div>
                        <div className="text-4xl font-bold text-copper-primary mb-2">
                          {results.cagr.toFixed(2)}%
                        </div>
                        <div className={`text-sm font-medium ${getCAGRRating(results.cagr).color}`}>
                          {getCAGRRating(results.cagr).rating} Performance
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="text-sm text-muted-foreground">Total Growth</div>
                      <div className="text-2xl font-bold text-success">{results.totalGrowth.toFixed(2)}%</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Over {form.getValues("years")} years
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="text-sm text-muted-foreground">Initial</div>
                        <div className="text-lg font-bold">
                          {formatCurrency(Number(form.getValues("initialValue")))}
                        </div>
                      </div>
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="text-sm text-muted-foreground">Final</div>
                        <div className="text-lg font-bold">
                          {formatCurrency(Number(form.getValues("finalValue")))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/10 rounded-lg border border-copper-primary/20">
                    <h2 className="font-semibold text-copper-primary mb-2 text-base">CAGR Benchmark</h2>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Fixed Deposits: 6–7% CAGR</p>
                      <p>• Nifty 50 (Historical): 10–12% CAGR</p>
                      <p>• Small/Mid Cap: 12–15% CAGR (Higher Risk)</p>
                      <p>• Outstanding Performers: 18%+ CAGR</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Percent className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Enter your investment details and click Calculate to see CAGR
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Growth Chart */}
        {results && (
          <Card className="card-elevated mt-8">
            <CardHeader>
              <CardTitle className="text-copper-primary">Hypothetical Straight-Line Growth</CardTitle>
              <CardDescription>
                How your investment would grow at {results.cagr.toFixed(2)}% CAGR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.yearlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      formatter={(val: number, name: string) => [
                        name === "value" ? formatCurrency(val) : `${val}%`,
                        name === "value" ? "Portfolio Value" : "Total Growth",
                      ]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--copper-primary))" name="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-copper-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">Portfolio Value</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational Section (semantic H2/H3 for SEO) */}
        <section className="mt-12">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-copper-primary">Understanding CAGR</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-3 text-copper-primary">CAGR Formula</h2>
                  <div className="space-y-2 text-sm bg-muted/20 p-4 rounded-lg">
                    <p><strong>CAGR = (Final Value / Initial Value)^(1/Years) − 1</strong></p>
                    <p>Example with your inputs:</p>
                    <p>
                      CAGR = ({form.getValues("finalValue") || "Final"} / {form.getValues("initialValue") || "Initial"})
                      ^(1/{form.getValues("years") || "Years"}) − 1
                    </p>
                    <p>CAGR represents the constant annual return required to reach the final value.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3 text-copper-primary">Benefits</h2>
                  <ul className="space-y-2 text-sm">
                    <li>• Smooths out volatility for comparison</li>
                    <li>• Better than arithmetic averages for long periods</li>
                    <li>• Standardizes different investment horizons</li>
                    <li>• Useful for benchmarking performance</li>
                    <li>• Accounts for compounding</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center text-sm text-muted-foreground">
            <strong>Educational Use Only:</strong> Historical CAGR does not guarantee future returns. Markets are volatile; evaluate risk carefully.
          </p>
        </section>
      </div>
    </main>
  );
}
