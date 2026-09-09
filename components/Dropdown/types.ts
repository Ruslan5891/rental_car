import type { ClassNameProps } from '@/types/common';

export interface DropdownOption {
  value: string;
  label: string;
  selectedLabel?: string;
}

export interface DropdownProps extends ClassNameProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
}
