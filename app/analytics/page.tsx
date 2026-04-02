"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, BarChart3, Presentation } from 'lucide-react';

const mockTrendData = [
  { name: 'Week 1', staticLimit: 12000, actualSpent: 11000, dynamicLimit: 12000 },
  { name: 'Week 2', staticLimit: 12000, actualSpent: 11500, dynamicLimit: 11700 },
  { name: 'Week 3', staticLimit: 12000, actualSpent: 9000, dynamicLimit: 11640 },
  { name: 'Week 4', staticLimit: 12000, actualSpent: 8500, dynamicLimit: 10848 }, // Dynamic Limit drops gently adapting to lower baseline
  { name: 'Week 5', staticLimit: 12000, actualSpent: 8000, dynamicLimit: 10143 },
];

const mockCategoryData = [
  { name: 'Food', amount: 8000 },
  { name: 'Transport', amount: 2500 },
  { name: 'Entertainment', amount: 4200 },
  { name: 'Shopping', amount: 3100 },
  { name: 'Health', amount: 1500 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" /> Reports & History
          </h1>
          <p className="text-muted-foreground mt-2">Visually track your 25% improvement versus Static Budgeting systems.</p>
        </div>
        
        <select 
          className="border border-input bg-card rounded-md px-4 py-2 text-sm shadow-sm"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Dynamic Limits Analysis (Line Chart) */}
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>EMA Adherence vs Static Budget (Traditional)</CardTitle>
            <CardDescription>
              Watch how the actual spending naturally hugs the Dynamic Limit curve down to higher savings, compared to the rigid flat static limit line.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="staticLimit" name="Traditional Static Limit" stroke="#dc2626" strokeDasharray="5 5" strokeWidth={2} />
                <Line type="monotone" dataKey="dynamicLimit" name="SEA Dynamic Limit (EMA)" stroke="#1e40af" strokeWidth={3} />
                <Line type="monotone" dataKey="actualSpent" name="Your Actual Expenses" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown (Bar Chart) */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Where your money went this {period}.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCategoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickMargin={10} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Highlights */}
        <Card className="bg-primary/5 border border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Presentation className="w-5 h-5" /> Period Over Period Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500/20 p-2 rounded-full mt-1">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-bold text-lg text-foreground">You reduced spending by 12%!</p>
                <p className="text-sm text-muted-foreground mr-4">Compared to your previous month, you successfully adapted faster than static algorithms predicted.</p>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-xl border space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Period Savings:</span>
                <span className="font-bold text-green-500">₹24,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dynamic Baseline (EMA) Shift:</span>
                <span className="font-bold text-primary">-₹1,857</span>
              </div>
              <div className="w-full h-px bg-border my-2" />
              <p className="text-xs text-center text-muted-foreground italic">
                Your adherence rate to Sea's generated limits is standing extremely strong at <strong>94%</strong>. Keep it up!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
