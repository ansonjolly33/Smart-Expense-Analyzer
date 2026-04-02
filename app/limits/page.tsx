"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { Info, MoveRight } from 'lucide-react';

export default function LimitsPage() {
  const { limits } = useStore();

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Dynamic Limits (EMA Sandbox)</h1>
        <p className="text-muted-foreground">Understand how your limits physically adapt to your behavior.</p>
      </div>

      <div className="bg-accent/10 border border-accent/20 p-6 rounded-xl flex items-start gap-4">
        <Info className="w-6 h-6 text-accent shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-accent mb-1">How it works: Exponential Moving Average</h3>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-3xl">
            Instead of fixed arbitrary limits that you fail to meet, the Smart Expense Analyzer uses mathematically proven EMA (Exponential Moving Average).
            <br/><br/>
            <code>Limit_next = (Actual_Spent × α) + (Previous_Limit × (1 - α))</code>
            <br/><br/>
            With an α (alpha) of 0.3, the system forgives historical anomalies but reacts 30% to aggressive overspending, dynamically shrinking your budget boundaries gently so you bounce back comfortably to achieve 25% better final savings.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {limits.map(limit => (
           <Card key={limit.category} className="glass-card">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{limit.category} Tracking</span>
                  <span className="text-sm font-normal text-muted-foreground bg-background px-3 py-1 rounded-full border">
                    α = {limit.alpha}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10">
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Previous Baseline</p>
                    <p className="text-3xl font-bold text-muted-foreground line-through opacity-70 cursor-not-allowed">
                      {formatCurrency(limit.prev_ema)}
                    </p>
                  </div>

                  <MoveRight className="w-10 h-10 text-muted-foreground hidden md:block opacity-50" />

                  <div className="text-center space-y-2 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary/20 text-primary text-[10px] font-bold px-2 rounded w-max">
                      ACTIVELY ADAPTED
                    </div>
                    <p className="text-sm font-medium text-primary">Current Allowed Limit</p>
                    <p className="text-4xl font-extrabold text-foreground">
                      {formatCurrency(limit.current_limit)}
                    </p>
                  </div>

                </div>
              </CardContent>
           </Card>
        ))}
      </div>
    </div>
  );
}
