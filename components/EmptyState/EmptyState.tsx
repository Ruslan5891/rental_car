import Image from 'next/image';
import Button from '@/components/Button/Button';
import type { EmptyStateProps } from './types';
import css from './EmptyState.module.css';

export default function EmptyState({
  title = 'No cars found',
  text = 'We couldn`t find any cars that match your current filters. Try changing your search criteria or reset the filters.',
  actionLabel = 'Reset filters',
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src="/images/not-found.png"
        alt=""
        width={414}
        height={388}
        priority
      />
      <div className={css.content}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.text}>{text}</p>
      </div>
      {actionHref && (
        <Button variant="outline" href={actionHref}>
          {actionLabel}
        </Button>
      )}
      {!actionHref && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
