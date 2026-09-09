import type { ReactNode } from 'react';

export interface ClassNameProps {
  className?: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export type ClassValue = string | false | null | undefined;

export type SearchParamsInput = URLSearchParams | Record<string, string | string[] | undefined>;
