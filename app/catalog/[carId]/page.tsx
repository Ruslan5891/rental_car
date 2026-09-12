import type { Metadata } from 'next';
import Image from 'next/image';
import { BookingForm, CarInfo, Container } from '@/components';
import { getCarOrNotFound } from '@/lib/car';
import { ROUTES, SITE_NAME, SITE_URL } from '@/lib/constants';
import { formatCarTitle } from '@/lib/format';
import css from './CarPage.module.css';

export async function generateMetadata({
  params,
}: PageProps<'/catalog/[carId]'>): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCarOrNotFound(carId);
  const carTitle = formatCarTitle(car.brand, car.model, car.year);
  const title = `${carTitle} | ${SITE_NAME}`;
  const url = `${SITE_URL}${ROUTES.car(car.id)}`;

  return {
    title,
    description: car.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: car.description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: car.img, alt: carTitle }],
    },
  };
}

export default async function CarPage({ params }: PageProps<'/catalog/[carId]'>) {
  const { carId } = await params;
  const car = await getCarOrNotFound(carId);

  return (
    <main className={css.main}>
      <Container className={css.layout}>
        <Image
          className={css.image}
          src={car.img}
          alt={formatCarTitle(car.brand, car.model, car.year)}
          width={640}
          height={512}
          sizes="(min-width: 1280px) 640px, 100vw"
          priority
        />
        <CarInfo className={css.info} car={car} />
        <BookingForm className={css.form} carId={car.id} />
      </Container>
    </main>
  );
}
