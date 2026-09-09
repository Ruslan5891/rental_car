'use client';

import { useState } from 'react';
import type { SubmitEvent } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import type { DropdownOption } from '@/components/Dropdown/types';
import RangeInput from '@/components/RangeInput/RangeInput';
import { buildCarFilters, isMileageRangeValid } from '@/lib/filters';
import { formatPrice, numberToInputValue } from '@/lib/format';
import type { CarFiltersProps } from './types';
import css from './CarFilters.module.css';

export default function CarFilters({ brands, prices, filters, onApply, onReset }: CarFiltersProps) {
  const [brand, setBrand] = useState(filters.brand ?? '');
  const [price, setPrice] = useState(numberToInputValue(filters.price));
  const [minMileage, setMinMileage] = useState(numberToInputValue(filters.minMileage));
  const [maxMileage, setMaxMileage] = useState(numberToInputValue(filters.maxMileage));

  const brandOptions: DropdownOption[] = brands.map(item => ({ value: item, label: item }));
  const priceOptions: DropdownOption[] = prices.map(item => ({
    value: String(item),
    label: String(item),
    selectedLabel: `To ${formatPrice(item)}`,
  }));

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const next = buildCarFilters({ brand, price, minMileage, maxMileage });

    if (!isMileageRangeValid(next)) {
      toast.error('Minimum mileage cannot be greater than maximum mileage.');
      return;
    }

    onApply(next);
  };

  return (
    <form className={css.form} role="search" aria-label="Car filters" onSubmit={handleSubmit}>
      <Dropdown
        label="Car brand"
        name="brand"
        placeholder="Choose a brand"
        options={brandOptions}
        value={brand}
        onChange={setBrand}
      />
      <Dropdown
        label="Price/ 1 hour"
        name="price"
        placeholder="Choose a price"
        options={priceOptions}
        value={price}
        onChange={setPrice}
        className={css.price}
      />
      <RangeInput
        label="Car mileage / km"
        fromName="minMileage"
        toName="maxMileage"
        from={minMileage}
        to={maxMileage}
        onFromChange={setMinMileage}
        onToChange={setMaxMileage}
      />
      <div className={css.actions}>
        <Button type="submit">Search</Button>
        <button type="button" className={css.reset} onClick={onReset}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
