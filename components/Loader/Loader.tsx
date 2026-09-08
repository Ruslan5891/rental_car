import css from './Loader.module.css';

interface LoaderProps {
  title?: string;
  text?: string;
  overlay?: boolean;
  className?: string;
}

export default function Loader({
  title = 'Loading...',
  text = 'Please wait while we fetch the data for you',
  overlay = false,
  className,
}: LoaderProps) {
  const card = (
    <div
      className={className ? `${css.card} ${className}` : css.card}
      role="status"
      aria-live="polite"
    >
      <span className={css.spinner} />
      <div className={css.content}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.text}>{text}</p>
      </div>
    </div>
  );

  if (!overlay) return card;

  return <div className={css.overlay}>{card}</div>;
}
