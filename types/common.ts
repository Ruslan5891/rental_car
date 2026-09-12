import type { ReactNode } from 'react';

export interface ClassNameProps {
  className?: string;
}

export interface ChildrenProps {
  children: ReactNode;
}

export type ClassValue = string | false | null | undefined;

export interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export type SearchParamsInput = URLSearchParams | Record<string, string | string[] | undefined>;
