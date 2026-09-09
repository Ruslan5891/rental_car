import type { ClassValue } from '@/types/common';

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
