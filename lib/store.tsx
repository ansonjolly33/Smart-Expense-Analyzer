"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Category, DynamicLimit } from './supabase';
import { calculateNextEMA } from './ema';

interface State {
  isAuthenticated: boolean;
  transactions: Transaction[];
  limits: DynamicLimit[];
  points: number;
  streak: number;
  addTransaction: (tx: Omit<Transaction, 'id' | 'user_id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  importCSV: (csvText: string) => void;
  isLoading: boolean;
  loginAsDemo: () => void;
  logout: () => void;
}

const StoreContext = createContext<State | null>(null);

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', user_id: 'demo', amount: 450, date: new Date().toISOString(), category: 'Food', type: 'expense', notes: 'Lunch' },
  { id: '2', user_id: 'demo', amount: 1200, date: new Date(Date.now() - 86400000).toISOString(), category: 'Transport', type: 'expense', notes: 'Uber' },
];

const INITIAL_LIMITS: DynamicLimit[] = [
  { category: 'Food', current_limit: 8000, prev_ema: 8200, alpha: 0.3 },
  { category: 'Transport', current_limit: 3000, prev_ema: 2900, alpha: 0.3 },
  { category: 'Entertainment', current_limit: 5000, prev_ema: 6000, alpha: 0.3 },
];

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [limits, setLimits] = useState<DynamicLimit[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loginAsDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setTransactions(MOCK_TRANSACTIONS);
      setLimits(INITIAL_LIMITS);
      setPoints(1240);
      setStreak(14);
      setIsLoading(false);
    }, 1500); // Simulate network load
  };

  const logout = () => {
    setIsAuthenticated(false);
    setTransactions([]);
    setLimits([]);
    setPoints(0);
    setStreak(0);
  };

  const addTransaction = (tx: Omit<Transaction, 'id' | 'user_id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substring(7),
      user_id: 'demo'
    };
    setTransactions(prev => [newTx, ...prev]);
    setPoints(p => p + 10);
    
    if (tx.type === 'expense') {
      setLimits(prevLimits => {
        return prevLimits.map(lim => {
          if (lim.category === tx.category) {
            const updatedEMA = calculateNextEMA(tx.amount, lim.prev_ema, lim.alpha);
            return {
              ...lim,
              prev_ema: updatedEMA,
              current_limit: Math.max(500, lim.current_limit - tx.amount)
            };
          }
          return lim;
        });
      });
    }
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const importCSV = (csvText: string) => {
    try {
      const rows = csvText.split('\n').filter(r => r.trim());
      const newTxs: Transaction[] = rows.slice(1).map((row, i) => {
        const [date, amount, category, type, notes] = row.split(',');
        return {
          id: `csv-${Date.now()}-${i}`,
          user_id: 'demo',
          date: new Date(date).toISOString(),
          amount: Number(amount),
          category: category as Category,
          type: type as 'income' | 'expense',
          notes: notes || 'Imported'
        };
      });
      setTransactions(prev => [...newTxs, ...prev]);
    } catch(e) {
      console.error("CSV Parse Error", e);
    }
  };

  return (
    <StoreContext.Provider value={{
      isAuthenticated, transactions, limits, points, streak,
      addTransaction, deleteTransaction, updateTransaction, importCSV,
      isLoading, loginAsDemo, logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
