import type { Metadata } from 'next';
import Image from 'next/image';
import { BookingForm, CarInfo, Container } from '@/components';
import { getCarOrNotFound } from '@/lib/car';
import { formatCarTitle } from '@/lib/format';
import css from './CarPage.module.css';

export async function generateMetadata({
  params,
}: PageProps<'/catalog/[carId]'>): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCarOrNotFound(carId);
  const title = `${formatCarTitle(car.brand, car.model, car.year)} | RentalCar`;

  return {
    title,
    description: car.description,
    openGraph: {
      title,
      description: car.description,
      images: [{ url: car.img, alt: formatCarTitle(car.brand, car.model, car.year) }],
    },
  };
}

export default async function CarPage({ params }: PageProps<'/catalog/[carId]'>) {
  const { carId } = await params;
  const car = await getCarOrNotFound(carId);

  return (
    <main className={css.main}>
      <Container className={css.layout}>
        <div className={css.aside}>
          <Image
            className={css.image}
            src={car.img}
            alt={formatCarTitle(car.brand, car.model, car.year)}
            width={640}
            height={512}
            sizes="640px"
            priority
          />
          <BookingForm carId={car.id} />
        </div>
        <CarInfo car={car} />
      </Container>
    </main>
  );
}
