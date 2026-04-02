"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';
import { LogIn, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { loginAsDemo, isAuthenticated, isLoading } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_50%)] pointer-events-none" />
      <Card className="w-full max-w-md glass-card border-primary/20 shadow-2xl z-10">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-lg">
            <span className="text-white font-black text-2xl">S</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome to SEA</CardTitle>
          <CardDescription>
            Smart Expense Analyzer. Built to outperform static budgets by 25%.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            onClick={loginAsDemo} 
            disabled={isLoading}
            className="w-full py-6 text-lg font-bold bg-gradient-to-br from-green-500 to-primary hover:from-green-600 hover:to-primary/90 text-white shadow-xl shadow-primary/20 transition-all border-0"
          >
            {isLoading ? (
              <span className="animate-pulse flex items-center gap-2">Connecting...</span>
            ) : (
              <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> Demo Login</span>
            )}
          </Button>

          <div className="relative">
             <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or login with Supabase</span></div>
          </div>

          <div className="space-y-4 opacity-50 pointer-events-none">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <Input placeholder="you@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <Input placeholder="••••••••" type="password" />
            </div>
            <Button variant="outline" className="w-full font-bold gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground pt-4">
            Click "Demo Login" above to instantly seed realistic data and view the 25% performance improvement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
