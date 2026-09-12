'use client';

import { Container, ErrorView } from '@/components';
import type { ErrorPageProps } from '@/types/common';
import css from './Catalog.module.css';

export default function CatalogError({ retry }: ErrorPageProps) {
  return (
    <main className={css.main}>
      <Container>
        <ErrorView
          heading="h1"
          title="Could not load the catalog"
          text="Something went wrong while loading the cars. Please check your connection and try again."
          onRetry={retry}
        />
      </Container>
    </main>
  );
}
