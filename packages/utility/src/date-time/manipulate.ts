import dayjs from 'dayjs';
import type { DateInput } from './types';

export function addDays(date: DateInput, amount: number): Date {
  return dayjs(date).add(amount, 'day').toDate();
}

export function addMonths(date: DateInput, amount: number): Date {
  return dayjs(date).add(amount, 'month').toDate();
}

export function startOfDay(date: DateInput): Date {
  return dayjs(date).startOf('day').toDate();
}

export function endOfDay(date: DateInput): Date {
  return dayjs(date).endOf('day').toDate();
}
