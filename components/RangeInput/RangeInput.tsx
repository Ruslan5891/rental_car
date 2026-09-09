import type { ChangeEvent } from 'react';
import { cn } from '@/lib/classNames';
import { formatDigits, stripNonDigits } from '@/lib/format';
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
  className,
}: RangeInputProps) {
  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFromChange(stripNonDigits(event.target.value));
  };

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    onToChange(stripNonDigits(event.target.value));
  };

  return (
    <fieldset className={cn(css.wrapper, className)}>
      <legend className={css.label}>{label}</legend>
      <div className={css.group}>
        <input
          className={cn(css.input, css.inputFrom)}
          type="text"
          name={fromName}
          inputMode="numeric"
          autoComplete="off"
          placeholder={fromPlaceholder}
          aria-label={`${label}, from`}
          value={formatDigits(from)}
          onChange={handleFromChange}
        />
        <input
          className={cn(css.input, css.inputTo)}
          type="text"
          name={toName}
          inputMode="numeric"
          autoComplete="off"
          placeholder={toPlaceholder}
          aria-label={`${label}, to`}
          value={formatDigits(to)}
          onChange={handleToChange}
        />
      </div>
    </fieldset>
  );
}
