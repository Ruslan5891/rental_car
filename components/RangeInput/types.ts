import type { ClassNameProps } from '@/types/common';

export interface RangeInputProps extends ClassNameProps {
  label: string;
  fromName: string;
  toName: string;
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  maxDigits?: number;
}
