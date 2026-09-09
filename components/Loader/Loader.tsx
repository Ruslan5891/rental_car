import { cn } from '@/lib/classNames';
import type { LoaderProps } from './types';
import css from './Loader.module.css';

export default function Loader({
  title = 'Loading...',
  text = 'Please wait while we fetch the data for you',
  overlay = false,
  className,
}: LoaderProps) {
  const card = (
    <div className={cn(css.card, className)} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <div className={css.content}>
        <p className={css.title}>{title}</p>
        <p className={css.text}>{text}</p>
      </div>
    </div>
  );

  if (!overlay) return card;

  return <div className={css.overlay}>{card}</div>;
}
