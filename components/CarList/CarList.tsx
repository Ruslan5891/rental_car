import CarCard from '@/components/CarCard/CarCard';
import { PRIORITY_CARDS_COUNT } from '@/lib/constants';
import type { CarListProps } from './types';
import css from './CarList.module.css';

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={css.list} role="list">
      {cars.map((car, index) => (
        <li key={car.id}>
          <CarCard car={car} priority={index < PRIORITY_CARDS_COUNT} />
        </li>
      ))}
    </ul>
  );
}
