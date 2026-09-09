export interface CarErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}
