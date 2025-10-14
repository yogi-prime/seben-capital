"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, ArrowLeft, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const formSchema = z.object({
  optionType: z.string(),
  position: z.string(),
  premium: z
    .string()
    .min(1, "Premium is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  strikePrice: z
    .string()
    .min(1, "Strike price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  spotPrice: z
    .string()
    .min(1, "Current spot price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Must be a positive number"),
});

interface ResultShape {
  payoffData: Array<{ spot: number; pl: number }>;
  breakeven: number;
  maxProfit: number | string;
  maxLoss: number | string;
  currentPL: number;
}

export default function OptionsPLClient() {
  const { toast } = useToast();
  const [results, setResults] = useState<ResultShape | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      optionType: "call",
      position: "long",
      premium: "50",
      strikePrice: "1000",
      spotPrice: "1000",
      quantity: "1",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const premium = Number(values.premium);
    const strike = Number(values.strikePrice);
    const spot = Number(values.spotPrice);
    const quantity = Number(values.quantity);
    const isCall = values.optionType === "call";
    const isLong = values.position === "long";

    // payoff points
    const payoffData: ResultShape["payoffData"] = [];
    const spotRange = Math.max(strike * 0.3, 200);
    const minSpot = Math.max(strike - spotRange, 10);
    const maxSpot = strike + spotRange;
    const step = (maxSpot - minSpot) / 50;

    for (let s = minSpot; s <= maxSpot; s += step) {
      let intrinsicValue = 0;
      if (isCall) intrinsicValue = Math.max(s - strike, 0);
      else intrinsicValue = Math.max(strike - s, 0);

      const pl = isLong ? (intrinsicValue - premium) * quantity : (premium - intrinsicValue) * quantity;
      payoffData.push({ spot: Math.round(s), pl: Math.round(pl) });
    }

    // breakeven
    let breakeven = 0;
    if (isCall) breakeven = isLong ? strike + premium : strike - premium;
    else breakeven = isLong ? strike - premium : strike + premium;

    // max profit/loss
    let maxProfit: number | string = 0;
    let maxLoss: number | string = 0;
    if (isLong) {
      maxLoss = premium * quantity;
      maxProfit = isCall ? "Unlimited" : (strike - premium) * quantity;
    } else {
      maxProfit = premium * quantity;
      maxLoss = isCall ? "Unlimited" : (strike - premium) * quantity;
    }

    // current P/L at given spot
    const currentIntrinsic = isCall ? Math.max(spot - strike, 0) : Math.max(strike - spot, 0);
    const currentPL = isLong ? (currentIntrinsic - premium) * quantity : (premium - currentIntrinsic) * quantity;

    setResults({ payoffData, breakeven, maxProfit, maxLoss, currentPL });
  };

  const handleReset = () => {
    form.reset();
    setResults(null);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <main className="py-12" aria-labelledby="opl-h1">
      <div className="container max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/tools" className="text-muted-foreground hover:text-copper-primary transition-colors">
            Tools
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-copper-primary" aria-current="page">
            Options P/L Calculator
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
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 id="opl-h1" className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">
                Options P/L Calculator
              </h1>
              <p className="text-muted-foreground">Calculate profit/loss for single option strategies</p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-copper-primary" />
                Option Parameters
              </CardTitle>
              <CardDescription>Enter option details to calculate P/L scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-label="Options P/L form">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="optionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Option Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger aria-label="Select option type">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="call">Call</SelectItem>
                              <SelectItem value="put">Put</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger aria-label="Select position">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="long">Long (Buy)</SelectItem>
                              <SelectItem value="short">Short (Sell)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="premium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Premium (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="50" inputMode="decimal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="1" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="strikePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Strike Price (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="1000" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spotPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Spot (₹)</FormLabel>
                          <FormControl>
                            <Input placeholder="1000" inputMode="numeric" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">
                      Calculate P/L
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
              <CardTitle className="text-copper-primary">P/L Analysis</CardTitle>
              <CardDescription>Profit/Loss scenarios at expiry</CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6" aria-live="polite">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <div className="text-sm text-muted-foreground">Breakeven</div>
                      <div className="text-lg font-bold text-copper-primary">₹{results.breakeven.toFixed(2)}</div>
                    </div>

                    <div
                      className={`p-4 rounded-lg ${
                        results.currentPL > 0
                          ? "bg-success/10 border border-success/20"
                          : results.currentPL < 0
                          ? "bg-destructive/10 border border-destructive/20"
                          : "bg-muted/20"
                      }`}
                    >
                      <div className="text-sm text-muted-foreground">Current P/L</div>
                      <div
                        className={`text-lg font-bold ${
                          results.currentPL > 0
                            ? "text-success"
                            : results.currentPL < 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatCurrency(results.currentPL)}
                      </div>
                    </div>

                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="text-sm text-muted-foreground">Max Profit</div>
                      <div className="text-lg font-bold text-success">
                        {typeof results.maxProfit === "number" ? formatCurrency(results.maxProfit) : results.maxProfit}
                      </div>
                    </div>

                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="text-sm text-muted-foreground">Max Loss</div>
                      <div className="text-lg font-bold text-destructive">
                        {typeof results.maxLoss === "number" ? formatCurrency(results.maxLoss) : results.maxLoss}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                    <h4 className="font-semibold text-copper-primary mb-2">Note</h4>
                    <p className="text-sm text-muted-foreground">
                      This shows expiry P/L only. Greeks, time decay, and volatility changes are not modeled.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                  <p className="text-muted-foreground">
                    Enter option parameters and click Calculate to see P/L analysis
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Payoff Chart */}
        {results && (
          <section className="mt-8" aria-labelledby="payoff-heading">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle id="payoff-heading" className="text-copper-primary">
                  Payoff Diagram
                </CardTitle>
                <CardDescription>P/L at different spot prices at expiry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.payoffData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="spot"
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <RechartsTooltip
                        formatter={(value: number) => [formatCurrency(value), "P/L"]}
                        labelFormatter={(label) => `Spot: ₹${label}`}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="pl" stroke="hsl(var(--copper-primary))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Risk Disclaimer */}
        <section className="mt-8" aria-labelledby="disclaimer-heading">
          <div className="p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center">
            <h3 id="disclaimer-heading" className="sr-only">
              Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground">
              <strong>Educational Use Only:</strong> This tool shows expiry P/L only and doesn't account for Greeks, time
              decay, or volatility. Options trading involves substantial risk. Always consult professionals before trading.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
