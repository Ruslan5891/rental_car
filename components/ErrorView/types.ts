export type ErrorViewHeading = 'h1' | 'h2' | 'h3';

export interface ErrorViewProps {
  title: string;
  text?: string;
  actionLabel?: string;
  heading?: ErrorViewHeading;
  onRetry: () => void;
}
