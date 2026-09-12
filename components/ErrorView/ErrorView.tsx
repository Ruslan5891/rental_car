import Button from '@/components/Button/Button';
import type { ErrorViewProps } from './types';
import css from './ErrorView.module.css';

export default function ErrorView({
  title,
  text = 'Something went wrong. Please check your connection and try again.',
  actionLabel = 'Try again',
  heading: Heading = 'h2',
  onRetry,
}: ErrorViewProps) {
  return (
    <div className={css.wrapper} role="alert">
      <Heading className={css.title}>{title}</Heading>
      <p className={css.text}>{text}</p>
      <Button variant="outline" onClick={onRetry}>
        {actionLabel}
      </Button>
    </div>
  );
}
