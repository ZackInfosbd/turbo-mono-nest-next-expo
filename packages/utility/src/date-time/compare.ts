import dayjs from 'dayjs';
import type { DateInput } from './types';

export function isAfter(date: DateInput, compareDate: DateInput): boolean {
  return dayjs(date).isAfter(compareDate);
}

export function isBefore(date: DateInput, compareDate: DateInput): boolean {
  return dayjs(date).isBefore(compareDate);
}

export function isSameDay(date: DateInput, compareDate: DateInput): boolean {
  return dayjs(date).isSame(compareDate, 'day');
}
