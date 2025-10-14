"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowLeft, Copy, RotateCcw, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts";

const formSchema = z.object({
  startingCapital: z.string().min(1, "Starting capital is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  monthlyContribution: z.string().min(1, "Monthly contribution is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Must be zero or positive"),
  expectedReturn: z.string().min(1, "Expected return is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100, "Must be between 0 and 100"),
  years: z.string().min(1, "Years is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 50, "Must be between 1 and 50 years"),
});

interface ChartDataPoint {
  year: number;
  value: number;
  contributions: number;
  growth: number;
}

export default function CompoundingClient() {
  const { toast } = useToast();
  const [results, setResults] = useState<{
    futureValue: number;
    totalContributions: number;
    totalGrowth: number;
    chartData: ChartDataPoint[];
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startingCapital: "100000",
      monthlyContribution: "10000",
      expectedReturn: "12",
      years: "10",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const startingCapital = Number(values.startingCapital);
    const monthlyContribution = Number(values.monthlyContribution);
    const annualReturn = Number(values.expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const years = Number(values.years);
    const months = years * 12;

    let currentValue = startingCapital;
    let totalContributions = startingCapital;
    const chartData: ChartDataPoint[] = [];

    chartData.push({ year: 0, value: startingCapital, contributions: startingCapital, growth: 0 });

    for (let month = 1; month <= months; month++) {
      currentValue = currentValue * (1 + monthlyReturn);
      currentValue += monthlyContribution;
      totalContributions += monthlyContribution;

      if (month % 12 === 0) {
        const totalGrowth = currentValue - totalContributions;
        chartData.push({
          year: month / 12,
          value: Math.round(currentValue),
          contributions: totalContributions,
          growth: Math.round(totalGrowth),
        });
      }
    }

    const finalTotalGrowth = currentValue - totalContributions;
    setResults({
      futureValue: Math.round(currentValue),
      totalContributions,
      totalGrowth: Math.round(finalTotalGrowth),
      chartData,
    });
  };

  const handleReset = () => {
    form.reset();
    setResults(null);
  };

  const copyResult = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Copied to clipboard", description: "Value has been copied to your clipboard." });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <TooltipProvider>
      <main className="py-12" aria-labelledby="compounding-h1">
        <div className="container max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/tools" className="text-muted-foreground hover:text-copper-primary transition-colors">
              Tools
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-copper-primary" aria-current="page">
              Compounding Calculator
            </span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/tools">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground"
                  aria-label="Back to Tools"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
              <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                Educational Tool Only
              </Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-copper rounded-2xl flex items-center justify-center" aria-hidden="true">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 id="compounding-h1" className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">
                  Compounding Calculator
                </h1>
                <p className="text-muted-foreground">Visualize the power of compound returns over time periods</p>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-copper-primary" />
                  Investment Parameters
                </CardTitle>
                <CardDescription>Enter your investment details to see compound growth</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Compounding input form">
                    <FormField
                      control={form.control}
                      name="startingCapital"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Capital (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="100000" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="monthlyContribution"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Monthly Contribution (₹)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" aria-label="Help: Monthly Contribution" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Additional amount invested each month</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <Input placeholder="10000" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expectedReturn"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Expected Annual Return (%)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" aria-label="Help: Expected Annual Return" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Historical market returns ~10–15% annually (varies)</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <Input placeholder="12" inputMode="decimal" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input placeholder="10" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">
                        Calculate
                      </Button>
                      <Button type="button" variant="outline" onClick={handleReset} aria-label="Reset form">
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
                <CardTitle className="text-copper-primary">Results</CardTitle>
                <CardDescription>Your compound growth projection</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6" aria-live="polite">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Future Value</Label>
                            <div className="text-2xl font-bold text-success">{formatCurrency(results.futureValue)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.futureValue.toString())} aria-label="Copy future value">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Total Contributions</Label>
                            <div className="text-xl font-bold">{formatCurrency(results.totalContributions)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.totalContributions.toString())} aria-label="Copy total contributions">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-copper-primary font-semibold">Total Growth</Label>
                            <div className="text-xl font-bold text-copper-primary">{formatCurrency(results.totalGrowth)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.totalGrowth.toString())} aria-label="Copy total growth">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                    <p className="text-muted-foreground">Enter your parameters and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Chart */}
          {results && (
            <section className="mt-8" aria-labelledby="growth-chart-heading">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle id="growth-chart-heading" className="text-copper-primary">
                    Growth Over Time
                  </CardTitle>
                  <CardDescription>Visualizing your investment growth year by year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="year"
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                          tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                        />
                        <RechartsTooltip
                          formatter={(value: number, name: string) => [
                            formatCurrency(value),
                            name === "value" ? "Total Value" : name === "contributions" ? "Total Contributions" : "Growth",
                          ]}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--success))"
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="contributions"
                          stroke="hsl(var(--copper-primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--copper-primary))", strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full" />
                      <span className="text-sm text-muted-foreground">Total Value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-copper-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">Contributions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* How it Works */}
          <section className="mt-12" aria-labelledby="how-works-heading">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle id="how-works-heading" className="text-copper-primary">
                  How Compounding Works
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-copper-primary">Formula</h4>
                    <div className="space-y-2 text-sm bg-muted/20 p-4 rounded-lg">
                      <p><strong>Monthly Return</strong> = Annual Return ÷ 12</p>
                      <p><strong>Each Month:</strong></p>
                      <p>• Current Value × (1 + Monthly Return)</p>
                      <p>• Add Monthly Contribution</p>
                      <p><strong>Growth</strong> = Final Value − Total Contributions</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-copper-primary">Key Principles</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Time is your greatest asset in compounding</li>
                      <li>• Regular contributions accelerate growth</li>
                      <li>• Small differences in returns compound significantly</li>
                      <li>• Start early, even with smaller amounts</li>
                      <li>• Consistency beats timing the market</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Risk Disclaimer */}
          <section className="mt-8" aria-labelledby="disclaimer-heading">
            <div className="p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center">
              <h3 id="disclaimer-heading" className="sr-only">Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                <strong>Educational Use Only:</strong> This tool is for educational purposes and should not be considered as financial advice.
                Markets involve risk; results are not guaranteed. Past performance is not indicative of future results.
              </p>
            </div>
          </section>
        </div>
      </main>
    </TooltipProvider>
  );
}
