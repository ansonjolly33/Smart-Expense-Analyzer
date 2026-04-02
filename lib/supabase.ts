import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Shopping' | 'Bills' | 'Health' | 'Others';

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  date: string;
  category: Category;
  type: 'income' | 'expense';
  notes: string;
}

export interface DynamicLimit {
  category: Category;
  current_limit: number;
  prev_ema: number;
  alpha: number;
}
