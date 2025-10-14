"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, ArrowLeft, Copy, RotateCcw, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  accountSize: z.string().min(1, "Account size is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  riskPercent: z.string().min(1, "Risk percentage is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0 && Number(v) <= 100, "Must be between 0 and 100"),
  entryPrice: z.string().min(1, "Entry price is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  stopLoss: z.string().min(1, "Stop loss is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Must be a positive number"),
  lotSize: z.string().optional(),
});

type Result = {
  positionSize: number;
  capitalAtRisk: number;
  riskPerUnit: number;
  suggestedLots?: number;
  adjustedQuantity?: number;
} | null;

export default function PositionSizeClient() {
  const { toast } = useToast();
  const [results, setResults] = useState<Result>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { accountSize: "100000", riskPercent: "2", entryPrice: "", stopLoss: "", lotSize: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const accountSize = Number(values.accountSize);
    const riskPercent = Number(values.riskPercent);
    const entryPrice = Number(values.entryPrice);
    const stopLoss = Number(values.stopLoss);
    const lotSize = values.lotSize ? Number(values.lotSize) : null;

    const capitalAtRisk = accountSize * (riskPercent / 100);
    const riskPerUnit = Math.abs(entryPrice - stopLoss);
    const positionSize = Math.floor(capitalAtRisk / riskPerUnit);

    let suggestedLots: number | undefined;
    let adjustedQuantity: number | undefined;
    if (lotSize && positionSize > 0) {
      suggestedLots = Math.floor(positionSize / lotSize);
      adjustedQuantity = suggestedLots * lotSize;
    }

    setResults({ positionSize, capitalAtRisk, riskPerUnit, suggestedLots, adjustedQuantity });
  };

  const handleReset = () => { form.reset(); setResults(null); };

  const copyResult = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: "Copied to clipboard", description: "Value has been copied." });
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  return (
    <TooltipProvider>
      <main className="py-12">
        <div className="container max-w-6xl">
          {/* header bar (kept same) */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/tools">
                <Button variant="outline" size="sm" className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
              <Badge variant="outline" className="border-copper-primary/30 text-copper-primary bg-copper-primary/5">
                Educational Tool Only
              </Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-copper rounded-2xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-copper-primary">Position Size Calculator</h1>
                <p className="text-muted-foreground">
                  Calculate optimal position sizes based on your risk tolerance and account size
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* form */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-copper-primary" />
                  Input Parameters
                </CardTitle>
                <CardDescription>Enter your trading parameters to calculate optimal position size</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <FormField
                      control={form.control}
                      name="accountSize"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Account Size (₹)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Total capital in your trading account</p></TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl><Input inputMode="numeric" placeholder="100000" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="riskPercent"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Risk per Trade (%)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>Common range: 0.5% – 2% per trade</p></TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl><Input inputMode="decimal" placeholder="2" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="entryPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entry Price (₹)</FormLabel>
                          <FormControl><Input inputMode="decimal" placeholder="1000" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stopLoss"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stop Loss (₹)</FormLabel>
                          <FormControl><Input inputMode="decimal" placeholder="950" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lotSize"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel>Lot Size (Optional)</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild><Info className="w-4 h-4 text-muted-foreground cursor-help" /></TooltipTrigger>
                              <TooltipContent><p>For F&O instruments that trade in lots</p></TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl><Input inputMode="numeric" placeholder="50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1 bg-gradient-copper hover:scale-105 transition-transform">Calculate</Button>
                      <Button type="button" variant="outline" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4 mr-2" /> Reset
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* results */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-copper-primary">Results</CardTitle>
                <CardDescription>Your calculated position sizing parameters</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6" aria-live="polite">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Position Size</Label>
                            <div className="text-2xl font-bold text-copper-primary">
                              {results.positionSize.toLocaleString()} shares
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.positionSize.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Capital at Risk</Label>
                            <div className="text-xl font-bold text-destructive">
                              {formatCurrency(results.capitalAtRisk)}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.capitalAtRisk.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-muted-foreground">Risk per Unit</Label>
                            <div className="text-xl font-bold">{formatCurrency(results.riskPerUnit)}</div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => copyResult(results.riskPerUnit.toString())}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {results.suggestedLots && results.adjustedQuantity && (
                        <>
                          <Separator />
                          <div className="p-4 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
                            <Label className="text-sm text-copper-primary font-semibold">Lot Adjusted</Label>
                            <div className="mt-2 space-y-2">
                              <div className="flex justify-between"><span className="text-sm">Suggested Lots:</span><span className="font-bold">{results.suggestedLots}</span></div>
                              <div className="flex justify-between"><span className="text-sm">Adjusted Quantity:</span><span className="font-bold">{results.adjustedQuantity} shares</span></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <h4 className="font-semibold text-success mb-2">Quick Tip</h4>
                      <p className="text-sm text-muted-foreground">
                        The calculated position size ensures you risk only the specified percentage of your account.
                        Common range is 0.5–2% per trade for sustainable trading.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Enter your parameters and click Calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* How it works (kept same) */}
          <Card className="card-elevated mt-12">
            <CardHeader><CardTitle className="text-copper-primary">How Position Sizing Works</CardTitle></CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-copper-primary">Formula</h4>
                  <div className="space-y-2 text-sm bg-muted/20 p-4 rounded-lg">
                    <p><strong>Risk Amount</strong> = Account Size × (Risk % ÷ 100)</p>
                    <p><strong>Risk per Unit</strong> = |Entry Price − Stop Loss|</p>
                    <p><strong>Position Size</strong> = Risk Amount ÷ Risk per Unit</p>
                    <p><strong>Lots</strong> = Position Size ÷ Lot Size (if applicable)</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-copper-primary">Best Practices</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Risk only 1–2% of your account per trade</li>
                    <li>• Always use stop losses to limit downside</li>
                    <li>• Account for lot sizes in F&O trading</li>
                    <li>• Never risk more than you can afford to lose</li>
                    <li>• Adjust position size based on market volatility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* disclaimer */}
          <div className="mt-8 p-4 bg-muted/10 rounded-lg border border-copper-primary/20 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Educational Use Only:</strong> Markets involve risk; results are not guaranteed.
              Consult qualified professionals before making investment decisions.
            </p>
          </div>
        </div>
      </main>
    </TooltipProvider>
  );
}
