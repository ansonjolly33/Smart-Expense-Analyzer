"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import { Target, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

const INITIAL_GOALS: Goal[] = [
  { id: '1', title: 'Emergency Fund', targetAmount: 100000, currentAmount: 65000, deadline: '2026-12-31' },
  { id: '2', title: 'MacBook Pro', targetAmount: 150000, currentAmount: 120000, deadline: '2026-06-15' },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTarget || !newDeadline) return;
    
    setGoals(prev => [...prev, {
      id: Math.random().toString(),
      title: newTitle,
      targetAmount: Number(newTarget),
      currentAmount: 0,
      deadline: newDeadline
    }]);
    setNewTitle('');
    setNewTarget('');
    setNewDeadline('');
  };

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Target className="w-8 h-8 text-primary" /> Savings Goals
        </h1>
        <p className="text-muted-foreground mt-2">
          Users sticking to Dynamic Limits show a <strong>25% higher goal adherence rate</strong> overall!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 glass-card h-fit border-primary/20">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>Set targets and track progress</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Goal Title</label>
                <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Vacation" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Amount (₹)</label>
                <Input value={newTarget} onChange={e => setNewTarget(e.target.value)} type="number" placeholder="50000" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Deadline</label>
                <Input value={newDeadline} onChange={e => setNewDeadline(e.target.value)} type="date" required className="block w-full" />
              </div>
              <Button type="submit" className="w-full gap-2">
                <PlusCircle className="w-4 h-4" /> Add Goal
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          {goals.map(goal => {
            const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const isNearDeadline = new Date(goal.deadline).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000;
            
            return (
              <Card key={goal.id} className="relative overflow-hidden glass-card">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${percentage >= 100 ? 'bg-green-500' : 'bg-primary'}`} />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {goal.title} 
                        {percentage >= 100 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </CardTitle>
                      <CardDescription>Goal Date: {new Date(goal.deadline).toLocaleDateString()}</CardDescription>
                    </div>
                    {isNearDeadline && percentage < 100 && (
                      <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3" /> Approaching deadline
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span className="text-foreground">{formatCurrency(goal.currentAmount)} Saved</span>
                    <span className="text-muted-foreground">Target: {formatCurrency(goal.targetAmount)}</span>
                  </div>
                  <Progress value={percentage} className="h-4" />
                  <p className="text-xs text-muted-foreground mt-3 text-right">
                    {percentage.toFixed(1)}% Completed
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
