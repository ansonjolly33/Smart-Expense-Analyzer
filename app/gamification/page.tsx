"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Target, Star, Gift } from 'lucide-react';

export default function GamificationPage() {
  const { points, streak } = useStore();

  const nextLevelParams = { limit: 2000, current: points };
  const levelPercentage = (nextLevelParams.current / nextLevelParams.limit) * 100;

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 max-w-2xl mx-auto py-8">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Rank: Financial Vanguard
        </h1>
        <p className="text-muted-foreground text-lg">You are ranking in the top 15% of all SEA users this week.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card flex flex-col items-center justify-center p-8 border-orange-500/50">
           <Flame className="w-12 h-12 text-orange-500 mb-4" />
           <h3 className="text-5xl font-black mb-2">{streak} Days</h3>
           <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Active Logging Streak</p>
        </Card>
        
        <Card className="glass-card flex flex-col justify-center p-8 border-primary/50">
           <div className="flex justify-between w-full mb-4">
              <span className="font-bold text-xl">{points} Total Points</span>
              <span className="text-muted-foreground">Next Rank: 2,000 pts</span>
           </div>
           <Progress value={levelPercentage} className="h-4 w-full bg-secondary" />
           <p className="text-sm pt-4 text-center text-primary font-medium">Earn 50 pts daily to unlock the Gold Avatar Frame!</p>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6">Your Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { label: "First Entry", icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
          { label: "7-Day Warrior", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
          { label: "Perfect Budget", icon: Target, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Impulse Resister", icon: Gift, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map(badge => {
          const Icon = badge.icon;
          return (
            <div key={badge.label} className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${badge.bg} border-foreground/5`}>
              <Icon className={`w-10 h-10 mb-3 ${badge.color}`} />
              <span className="font-bold text-sm text-foreground/90">{badge.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}
