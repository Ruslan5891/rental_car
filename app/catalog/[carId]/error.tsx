'use client';

import { Button, Container } from '@/components';
import css from './error.module.css';
import type { CarErrorProps } from './types';

export default function CarError({ error, retry }: CarErrorProps) {
  return (
    <main className={css.main}>
      <Container className={css.message}>
        <h1 className={css.title}>Could not load the car</h1>
        <p className={css.text}>{error.message || 'Something went wrong. Please try again.'}</p>
        <Button variant="outline" onClick={() => retry()}>
          Try again
        </Button>
      </Container>
    </main>
  );
}
