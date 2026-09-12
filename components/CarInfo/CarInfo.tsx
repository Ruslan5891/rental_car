import { LuCircleCheck, LuMapPin } from 'react-icons/lu';
import { buildCarSpecs } from '@/lib/car';
import { cn } from '@/lib/classNames';
import { CAR_SPEC_ICONS } from '@/lib/constants';
import { formatCarTitle, formatPrice } from '@/lib/format';
import type { CarInfoProps } from './types';
import css from './CarInfo.module.css';

export default function CarInfo({ car, className }: CarInfoProps) {
  const {
    brand,
    model,
    year,
    stockNumber,
    location,
    rentalPrice,
    description,
    rentalConditions,
    features,
  } = car;
  const specs = buildCarSpecs(car);

  return (
    <div className={cn(css.card, className)}>
      <div className={css.header}>
        <div className={css.heading}>
          <h1 className={css.title}>{formatCarTitle(brand, model, year)}</h1>
          <p className={css.article}>Article: {stockNumber}</p>
        </div>
        <p className={css.location}>
          <LuMapPin className={css.icon} aria-hidden="true" />
          {location.city}, {location.country}
        </p>
        <data className={css.price} value={rentalPrice}>
          {formatPrice(rentalPrice)}
        </data>
      </div>
      <p className={css.description}>{description}</p>
      <section className={css.section} aria-labelledby="rental-conditions">
        <h2 className={css.subtitle} id="rental-conditions">
          Rental Conditions:
        </h2>
        <ul className={css.list} role="list">
          {rentalConditions.map(condition => (
            <li key={condition} className={css.item}>
              <LuCircleCheck className={css.icon} aria-hidden="true" />
              {condition}
            </li>
          ))}
        </ul>
      </section>
      <section className={css.section} aria-labelledby="car-specifications">
        <h2 className={css.subtitle} id="car-specifications">
          Car Specifications:
        </h2>
        <dl className={css.list}>
          {specs.map(({ key, label, value }) => {
            const Icon = CAR_SPEC_ICONS[key];

            return (
              <div key={key} className={cn(css.item, css.spec)}>
                <dt className={css.term}>
                  <Icon className={css.icon} aria-hidden="true" />
                  {label}:
                </dt>
                <dd className={css.definition}>{value}</dd>
              </div>
            );
          })}
        </dl>
      </section>
      <section className={css.section} aria-labelledby="car-features">
        <h2 className={css.subtitle} id="car-features">
          Features
        </h2>
        <ul className={css.list} role="list">
          {features.map(feature => (
            <li key={feature} className={css.item}>
              <LuCircleCheck className={css.icon} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
