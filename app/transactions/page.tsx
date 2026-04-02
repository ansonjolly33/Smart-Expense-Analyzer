"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { UploadCloud, PlusCircle, Trash2, Edit2 } from 'lucide-react';
import { Category, Transaction } from '@/lib/supabase';

export default function TransactionsPage() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction, importCSV } = useStore();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [notes, setNotes] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    
    if (editingId) {
      updateTransaction(editingId, {
        amount: Number(amount),
        category,
        notes
      });
      setEditingId(null);
    } else {
      addTransaction({
        amount: Number(amount),
        date: new Date().toISOString(),
        category,
        type: 'expense',
        notes
      });
    }
    
    setAmount('');
    setNotes('');
    setCategory('Food');
  };

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setAmount(t.amount.toString());
    setCategory(t.category);
    setNotes(t.notes);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        importCSV(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container py-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Manage your inputs and upload receipts</p>
        </div>
        <div>
          <input 
            type="file" 
            accept=".csv" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileUpload}
          />
          <Button variant="outline" className="gap-2" onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="w-4 h-4" /> CSV Sync
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit glass-card">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Expense" : "Add Expense"}</CardTitle>
            <CardDescription>{editingId ? "Modify transaction tracking" : "Log spending to earn +10 pts"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitTransaction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount (₹)</label>
                <Input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="450" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                >
                  <option value="Food" className="bg-background text-foreground">Food</option>
                  <option value="Transport" className="bg-background text-foreground">Transport</option>
                  <option value="Entertainment" className="bg-background text-foreground">Entertainment</option>
                  <option value="Shopping" className="bg-background text-foreground">Shopping</option>
                  <option value="Bills" className="bg-background text-foreground">Bills</option>
                  <option value="Health" className="bg-background text-foreground">Health</option>
                  <option value="Others" className="bg-background text-foreground">Others</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (Optional)</label>
                <Input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Lunch at cafe" />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="w-full gap-2">
                  <PlusCircle className="w-4 h-4" /> {editingId ? "Update" : "Add"} Transaction
                </Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={() => {
                    setEditingId(null); setAmount(''); setNotes('');
                  }}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Recent History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No transactions found.</p>
              ) : (
                transactions.map(t => (
                  <div key={t.id} className="group flex flex-col md:flex-row justify-between items-start md:items-center p-3 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border">
                    <div className="flex-1">
                      <p className="font-semibold text-primary/90">{t.category}</p>
                      <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()} - {t.notes}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <div className="text-right">
                        <p className={t.type === 'expense' ? "font-bold text-orange-500" : "font-bold text-green-500"}>
                          {t.type === 'expense' ? "-" : "+"}{formatCurrency(t.amount)}
                        </p>
                      </div>
                      
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => startEdit(t)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteTransaction(t.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
