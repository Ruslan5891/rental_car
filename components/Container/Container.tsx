import { cn } from '@/lib/classNames';
import type { ContainerProps } from './types';
import css from './Container.module.css';

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn(css.container, className)}>{children}</div>;
}
