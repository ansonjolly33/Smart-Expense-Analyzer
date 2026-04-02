"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, CheckCircle2, AlertTriangle, TrendingDown } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function InsightsPage() {
  const { transactions } = useStore();

  const foodSpent = transactions.filter(t => t.category === 'Food').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-yellow-500" /> Heuristic Insights
        </h1>
        <p className="text-muted-foreground mt-2">Real-time proactive nudges analyzing your behavior trends.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Insight 1 */}
        <Card className="border-destructive bg-destructive/5 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /> Overspending Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">You have exceeded your &apos;Food&apos; Dynamic Limit by 18% ({formatCurrency(foodSpent - 8000 > 0 ? foodSpent - 8000 : 450)}).</p>
            <div className="bg-background/50 p-3 rounded text-sm text-foreground/80 border">
              <strong>Suggestion:</strong> Cook at home twice this week to save ~₹1,200.
            </div>
            <Button variant="destructive" className="w-full font-bold">Apply Suggestion</Button>
          </CardContent>
        </Card>

        {/* Mock Insight 2 */}
        <Card className="border-primary bg-primary/5 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <TrendingDown className="w-5 h-5" /> Transport Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Uber expenses are up 40% vs last week&apos;s EMA.</p>
            <div className="bg-background/50 p-3 rounded text-sm text-foreground/80 border">
              <strong>Suggestion:</strong> Take the metro tomorrow to stay under the Dynamic Limit padding.
            </div>
            <Button className="w-full font-bold">Will Do (+15 pts)</Button>
          </CardContent>
        </Card>

        {/* Mock Insight 3 - Positive Reinforcement */}
        <Card className="border-green-500 bg-green-500/5 glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-5 h-5" /> Goal Momentum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">You&apos;ve maintained 100% adherence to your Health limit. Unbelievable focus!</p>
            <div className="bg-background/50 p-3 rounded text-sm text-foreground/80 border">
              Your "Laptop Fund" goal is projected to be reached 2 weeks early.
            </div>
            <Button variant="outline" className="w-full text-green-500 border-green-500 bg-transparent hover:bg-green-500/10">
              Share Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
