import Image from 'next/image';
import Button from '@/components/Button/Button';
import { ROUTES } from '@/lib/constants';
import { formatMileage, formatPrice } from '@/lib/format';
import type { Car } from '@/types/car';
import css from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { id, img, brand, model, year, rentalPrice, location, rentalCompany, type, mileage } = car;

  const primaryBadges = [location.city, location.country, rentalCompany];
  const secondaryBadges = [type, formatMileage(mileage)];

  return (
    <article className={css.card}>
      <div className={css.body}>
        <div className={css.imageWrapper}>
          <Image
            className={css.image}
            src={img}
            alt={`${brand} ${model}`}
            width={244}
            height={268}
            sizes="244px"
          />
        </div>
        <div className={css.info}>
          <div className={css.heading}>
            <h3 className={css.title}>
              {brand} <span className={css.model}>{model}</span>, {year}
            </h3>
            <span className={css.price}>{formatPrice(rentalPrice)}</span>
          </div>
          <div className={css.badges}>
            <ul className={css.badgeRow}>
              {primaryBadges.map(badge => (
                <li className={css.badge} key={badge}>
                  {badge}
                </li>
              ))}
            </ul>
            <ul className={css.badgeRow}>
              {secondaryBadges.map(badge => (
                <li className={css.badge} key={badge}>
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button
        href={ROUTES.car(id)}
        target="_blank"
        rel="noopener noreferrer"
        className={css.button}
      >
        Read more
      </Button>
    </article>
  );
}
