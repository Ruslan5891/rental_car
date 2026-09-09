'use client';

import { Button, Container } from '@/components';
import type { CatalogErrorProps } from './types';
import css from './Catalog.module.css';

export default function CatalogError({ error, retry }: CatalogErrorProps) {
  return (
    <main className={css.main}>
      <Container className={css.message}>
        <h1 className={css.messageTitle}>Could not load the catalog</h1>
        <p className={css.messageText}>
          {error.message || 'Something went wrong. Please try again.'}
        </p>
        <Button variant="outline" onClick={() => retry()}>
          Try again
        </Button>
      </Container>
    </main>
  );
}
