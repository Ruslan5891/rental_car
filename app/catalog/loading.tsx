import { Container, Loader } from '@/components';
import css from './Catalog.module.css';

export default function CatalogLoading() {
  return (
    <main className={css.main}>
      <Container>
        <Loader title="Loading catalog..." text="Please wait while we fetch the cars for you" />
      </Container>
    </main>
  );
}
