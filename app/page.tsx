"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { IndianRupee, TrendingDown, Target, Zap, Bot, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { transactions, limits, points, streak } = useStore();

  const totalBalance = 245000;
  const totalSpent = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Smart Expense Analyzer</h1>
          <p className="text-muted-foreground mt-2">Your Behavior-Driven Dashboard</p>
        </div>
        
        <div className="flex items-center gap-4 bg-card p-3 rounded-lg border shadow-sm">
          <div className="text-right">
            <p className="text-sm font-medium">Gamification Score</p>
            <p className="text-2xl font-bold text-accent">{points} pts</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-right">
            <p className="text-sm font-medium">Daily Streak</p>
            <p className="text-2xl font-bold text-orange-500 flex items-center gap-1">
              <Zap className="h-5 w-5 fill-current" /> {streak}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary overflow-hidden relative">
          <div className="absolute opacity-10 right-[-10px] top-[-10px]">
            <IndianRupee className="w-40 h-40" />
          </div>
          <CardHeader>
            <CardTitle className="text-primary-foreground">Total Balance</CardTitle>
            <CardDescription className="text-primary-foreground/80">Available Liquid Cash</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-white">{formatCurrency(totalBalance - totalSpent)}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/90 font-medium">
              <ShieldCheck className="w-5 h-5" />
              <span>You are performing 25% better than static budgeting!</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forecasted Spending</CardTitle>
            <CardDescription>Based on EMA adaptation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency((totalSpent * 1.2) + 5000)}</p>
            <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
              <TrendingDown className="h-4 w-4" /> 12% lower than last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heuristic Nudges</CardTitle>
            <CardDescription>AI-driven suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm font-medium border border-destructive/20">
              You exceeded the &apos;Food&apos; limit by 18% — cook at home today to save ₹450.
            </div>
            <Link href="/insights" className="text-sm text-primary hover:underline font-medium inline-block">
              View all insights &rarr;
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Dynamic Limits vs. Actual</h2>
          <Link href="/limits" className="text-sm text-muted-foreground hover:text-foreground">
            Manage Limits Setup
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {limits.map((limit) => {
            const spent = transactions
              .filter(t => t.category === limit.category && t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0);
            
            // Mock base calculation for visual progress bar.
            const percentage = Math.min((spent / (limit.current_limit + spent)) * 100, 100) || 5;

            return (
              <Card key={limit.category} className="glass-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{limit.category}</CardTitle>
                    <span className="text-sm font-medium px-2 py-1 bg-secondary rounded-full">
                      EMA limit: {formatCurrency(limit.current_limit + spent)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>{formatCurrency(spent)} Spent</span>
                    <span className="text-muted-foreground">{formatCurrency(limit.current_limit)} Left</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-3 text-right italic">
                    (Next period EMA is estimating {formatCurrency((spent * 0.3) + (limit.prev_ema * 0.7))})
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-muted-foreground pb-8">
        <p>Built as implementation of SEA research project by Anson Jolly & Akshara P P, 2025</p>
        <p>Privacy-preserving financial insights</p>
      </footer>
    </div>
  );
}
