import type { Car } from '@/types/car';
import type { ClassNameProps } from '@/types/common';

export interface CarInfoProps extends ClassNameProps {
  car: Car;
}
