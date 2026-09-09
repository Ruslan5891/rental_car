import Image from 'next/image';
import Button from '@/components/Button/Button';
import { ROUTES } from '@/lib/constants';
import { formatMileage, formatPrice } from '@/lib/format';
import type { CarCardProps } from './types';
import css from './CarCard.module.css';

export default function CarCard({ car, priority = false }: CarCardProps) {
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
            priority={priority}
          />
        </div>
        <div className={css.info}>
          <div className={css.heading}>
            <h2 className={css.title}>
              {brand} <span className={css.model}>{model}</span>, {year}
            </h2>
            <data className={css.price} value={rentalPrice}>
              {formatPrice(rentalPrice)}
            </data>
          </div>
          <div className={css.badges}>
            <ul className={css.badgeRow} role="list">
              {primaryBadges.map(badge => (
                <li className={css.badge} key={badge}>
                  {badge}
                </li>
              ))}
            </ul>
            <ul className={css.badgeRow} role="list">
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
        <span className="visually-hidden">{` about ${brand} ${model} (opens in a new tab)`}</span>
      </Button>
    </article>
  );
}
