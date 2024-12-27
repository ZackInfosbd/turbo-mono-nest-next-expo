import dayjs from 'dayjs';
import type { DateInput } from './dateTime-types';

export function formatDate(
  date: DateInput,
  format: string = 'YYYY-MM-DD',
): string {
  return dayjs(date).format(format);
}

export function formatDateTime(date: DateInput): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function formatRelative(date: DateInput): string {
  const now = dayjs();
  const target = dayjs(date);
  const diffDays = now.diff(target, 'day');

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays === -1) return 'Tomorrow';

  return formatDate(date);
}
