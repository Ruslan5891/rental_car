import type { ReactNode } from 'react';
import css from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={className ? `${css.container} ${className}` : css.container}>{children}</div>
  );
}
