import type { ChangeEvent } from 'react';
import { cn } from '@/lib/classNames';
import { formatDigits, limitDigits, stripNonDigits } from '@/lib/format';
import type { RangeInputProps } from './types';
import css from './RangeInput.module.css';

export default function RangeInput({
  label,
  fromName,
  toName,
  from,
  to,
  onFromChange,
  onToChange,
  fromPlaceholder = 'From',
  toPlaceholder = 'To',
  maxDigits,
  className,
}: RangeInputProps) {
  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFromChange(limitDigits(stripNonDigits(event.target.value), maxDigits));
  };

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    onToChange(limitDigits(stripNonDigits(event.target.value), maxDigits));
  };

  return (
    <fieldset className={cn(css.wrapper, className)}>
      <legend className={css.label}>{label}</legend>
      <div className={css.group}>
        <input
          className={cn(css.input, css.inputFrom)}
          name={fromName}
          type="text"
          value={formatDigits(from)}
          aria-label={`${label}, from`}
          inputMode="numeric"
          autoComplete="off"
          placeholder={fromPlaceholder}
          onChange={handleFromChange}
        />
        <input
          className={cn(css.input, css.inputTo)}
          name={toName}
          type="text"
          value={formatDigits(to)}
          aria-label={`${label}, to`}
          inputMode="numeric"
          autoComplete="off"
          placeholder={toPlaceholder}
          onChange={handleToChange}
        />
      </div>
    </fieldset>
  );
}
