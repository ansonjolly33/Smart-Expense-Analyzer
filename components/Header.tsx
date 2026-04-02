"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ReceiptText, SlidersHorizontal, Lightbulb, Trophy, Target, BarChart3, LogOut } from 'lucide-react';
import { useStore } from '@/lib/store';

const LINKS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ReceiptText },
  { href: '/limits', label: 'Dynamic Limits', icon: SlidersHorizontal },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/gamification', label: 'Gamification', icon: Trophy },
];

export function Header() {
  const pathname = usePathname();
  const { logout } = useStore();

  if (pathname === '/login') return null;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b bg-background/50 text-sm">
      <div className="container flex h-16 items-center overflow-x-auto whitespace-nowrap px-4 w-full scrollbar-none justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-lg text-primary mr-6 flex items-center gap-2 shrink-0">
            <div className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg font-extrabold pb-0.5">
              S
            </div>
            <span className="hidden md:inline-block text-foreground">Smart Expense Analyzer</span>
          </Link>
          <nav className="flex items-center gap-6 shrink-0 pr-4">
            {LINKS.map(link => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-foreground font-medium",
                    active ? "text-primary border-b-2 border-primary h-[60px]" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-4 flex items-center gap-1">
          <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
