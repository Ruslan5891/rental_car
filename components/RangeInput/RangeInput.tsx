import type { ChangeEvent } from 'react';
import css from './RangeInput.module.css';

interface RangeInputProps {
  label: string;
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  className?: string;
}

export default function RangeInput({
  label,
  from,
  to,
  onFromChange,
  onToChange,
  fromPlaceholder = 'From',
  toPlaceholder = 'To',
  className,
}: RangeInputProps) {
  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFromChange(event.target.value);
  };

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    onToChange(event.target.value);
  };

  return (
    <fieldset className={className ? `${css.wrapper} ${className}` : css.wrapper}>
      <legend className={css.label}>{label}</legend>
      <div className={css.group}>
        <input
          className={`${css.input} ${css.inputFrom}`}
          type="text"
          inputMode="numeric"
          placeholder={fromPlaceholder}
          aria-label={`${label}, from`}
          value={from}
          onChange={handleFromChange}
        />
        <input
          className={`${css.input} ${css.inputTo}`}
          type="text"
          inputMode="numeric"
          placeholder={toPlaceholder}
          aria-label={`${label}, to`}
          value={to}
          onChange={handleToChange}
        />
      </div>
    </fieldset>
  );
}
