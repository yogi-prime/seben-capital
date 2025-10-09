"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, ArrowLeft, Copy, RotateCcw, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const formSchema = z.object({
  targetAmount: z
    .string()
    .min(1, "Target amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  timeHorizon: z
    .string()
    .min(1, "Time horizon is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 50, "Must be between 1 and 50 years"),
  expectedReturn: z
    .string()
    .min(1, "Expected return is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100, "Must be between 0 and 100"),
  currentSavings: z.string().optional().refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), "Must be zero or positive"),
});

interface YearlyData {
  year: number;
  contributions: number;
  value: number;
  growth: number;
}

export default function SIPGoalClient() {
  const { toast } = useToast();
  const [results, setResults] = useState<{
    requiredMonthlySIP: number;
    totalContributions: number;
    totalGrowth: number;
    yearlyData: YearlyData[];
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetAmount: "5000000",
      timeHorizon: "15",
      expectedReturn: "12",
      currentSavings: "0",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const targetAmount = Number(values.targetAmount);
    const years = Number(values.timeHorizon);
    const annualReturn = Number(values.expectedReturn) / 100;
    const monthlyReturn = annualReturn / 12;
    const months = years * 12;
    const currentSavings = values.currentSavings ? Number(values.currentSavings) : 0;

    // Future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + annualReturn, years);
    const adjustedTarget = targetAmount - futureValueOfCurrentSavings;

    // Required monthly SIP (annuity FV)
    const compoundFactor = Math.pow(1 + monthlyReturn, months);
    const annuityFactor = (compoundFactor - 1) / monthlyReturn;
    const requiredMonthlySIP = Math.max(0, adjustedTarget / annuityFactor);

    // Yearly progression (monthly compounding)
    const yearlyData: YearlyData[] = [];
    let currentValue = currentSavings;
    let totalContributions = currentSavings;

    for (let year = 1; year <= years; year++) {
      // apply annual growth to current savings block
      currentValue = currentValue * (1 + annualReturn);

      for (let month = 1; month <= 12; month++) {
        currentValue += requiredMonthlySIP;
        totalContributions += requiredMonthlySIP;
        if (month < 12) currentValue = currentValue * (1 + monthlyReturn);
      }

      const growth = currentValue - totalContributions;
      yearlyData.push({
        year,
        contributions: Math.round(totalContributions),
        value: Math.round(currentValue),
        growth: Math.round(growth),
      });
    }

    const finalTotalContributions = currentSavings + requiredMonthlySIP * months;
    const finalTotalGrowth = targetAmount - finalTotalContributions;

    setResults({
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      totalContributions: Math.round(finalTotalContributions),
      totalGrowth: Math.round(finalTotalGrowth),
      yearlyData,
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
      <main className="py-12" aria-labelledby="sip-h1">
        <div className="container max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 text-sm">
            <Link href="/tools" className="text-muted-foreground hover:text-copper-primary transition-colors">
              Tools
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-copper-primary" aria-current="page">
              SIP Goal Planner
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
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 id="sip-h1" className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">
                  SIP Goal Planner
                </h1>
                <p className="text-muted-foreground">Plan your SIP investments to reach specific financial goals</p>
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-copper-primary" />
                  Goal Parameters
                </CardTitle>
                <CardDescription>Define your financial goal and investment timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="SIP goal form">
                    <FormField
                      control={form.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Target Amount (₹)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Your financial goal amount</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <Input placeholder="5000000" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeHorizon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Horizon (Years)</FormLabel>
                          <FormControl>
                            <Input placeholder="15" inputMode="numeric" {...field} />
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
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Historical equity returns: 10–15% annually</p>
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
                      name="currentSavings"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Current Savings (₹) — Optional</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Existing savings that will also grow</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <Input placeholder="0" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">
                        Calculate SIP
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
                <CardTitle className="text-copper-primary">SIP Requirements</CardTitle>
                <CardDescription>Your monthly investment plan to reach the goal</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6" aria-live="polite">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-copper-primary font-semibold">Required Monthly SIP</Label>
                            <div className="text-2xl font-bold text-copper-primary">{formatCurrency(results.requiredMonthlySIP)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.requiredMonthlySIP.toString())} aria-label="Copy required SIP">
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

                      <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Expected Growth</Label>
                            <div className="text-xl font-bold text-success">{formatCurrency(results.totalGrowth)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.totalGrowth.toString())} aria-label="Copy expected growth">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <h4 className="font-semibold text-success mb-2">Goal Achievement</h4>
                      <p className="text-sm text-muted-foreground">
                        By investing {formatCurrency(results.requiredMonthlySIP)} monthly for {form.getValues("timeHorizon")} years, you can reach your goal of{" "}
                        {formatCurrency(Number(form.getValues("targetAmount")))}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                    <p className="text-muted-foreground">Enter your goal parameters and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Yearly Progress Chart */}
          {results && (
            <section className="mt-8" aria-labelledby="progress-heading">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle id="progress-heading" className="text-copper-primary">
                    Yearly Progress
                  </CardTitle>
                  <CardDescription>How your investment grows year by year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fill: "hsl(var(--muted-foreground))" }}
                          tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                        />
                        <RechartsTooltip
                          formatter={(value: number, name: string) => [
                            formatCurrency(value),
                            name === "value" ? "Portfolio Value" : name === "contributions" ? "Total Contributions" : "Growth",
                          ]}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="contributions" fill="hsl(var(--copper-primary))" name="contributions" />
                        <Bar dataKey="growth" fill="hsl(var(--success))" name="growth" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-copper-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">Contributions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full" />
                      <span className="text-sm text-muted-foreground">Growth</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* How it Works */}
          <section className="mt-12" aria-labelledby="how-heading">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle id="how-heading" className="text-copper-primary">
                  How SIP Goal Planning Works
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-copper-primary">Formula</h4>
                    <div className="space-y-2 text-sm bg-muted/20 p-4 rounded-lg">
                      <p>
                        <strong>Future Value of Current Savings:</strong>
                      </p>
                      <p>FV = PV × (1 + r)^n</p>
                      <p>
                        <strong>Adjusted Target:</strong>
                      </p>
                      <p>Target − Future Value of Current Savings</p>
                      <p>
                        <strong>Required SIP:</strong>
                      </p>
                      <p>SIP = Adjusted Target ÷ Annuity Factor</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-copper-primary">SIP Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Rupee cost averaging reduces market timing risk</li>
                      <li>• Disciplined investing builds wealth systematically</li>
                      <li>• Smaller amounts can achieve large goals over time</li>
                      <li>• Automation ensures consistent investing</li>
                      <li>• Power of compounding maximizes returns</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Disclaimer */}
          <section className="mt-8" aria-labelledby="disclaimer-heading">
            <div className="p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center">
              <h3 id="disclaimer-heading" className="sr-only">
                Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground">
                <strong>Educational Use Only:</strong> This tool is for educational purposes and should not be considered as financial advice. Markets involve risk; results
                are not guaranteed. SIP investments are subject to market risks.
              </p>
            </div>
          </section>
        </div>
      </main>
    </TooltipProvider>
  );
}
