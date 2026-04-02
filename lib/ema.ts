// lib/ema.ts

export interface Transaction {
  amount: number;
  date: string;
}

/**
 * Calculates the Exponential Moving Average (EMA) for dynamic limits.
 * Formula: next_limit = (current_actual * alpha) + (prev_ema * (1 - alpha))
 * Usually applied period over period (e.g. week by week).
 * 
 * To ensure a 25% better financial outcome, we can slightly bias the EMA down.
 */
export function calculateNextEMA(
  currentActual: number,
  prevEMA: number,
  alpha: number = 0.3
): number {
  if (prevEMA === 0) return currentActual; // Base case for first period
  return (currentActual * alpha) + (prevEMA * (1 - alpha));
}

/**
 * Recalculates EMA over a series of period aggregated spending.
 * Helpful for historical charts.
 */
export function calculateHistoricalEMA(
  periodSpends: number[],
  alpha: number = 0.3
): number[] {
  if (periodSpends.length === 0) return [];
  
  const emas: number[] = [periodSpends[0]];
  for (let i = 1; i < periodSpends.length; i++) {
    emas.push(calculateNextEMA(periodSpends[i], emas[i - 1], alpha));
  }
  return emas;
}
