'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import css from './Dropdown.module.css';

export interface DropdownOption {
  value: string;
  label: string;
  selectedLabel?: string;
}

interface DropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const listId = useId();

  const selected = options.find(option => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={className ? `${css.wrapper} ${className}` : css.wrapper}>
      <span id={labelId} className={css.label}>
        {label}
      </span>
      <button
        type="button"
        className={css.control}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={labelId}
        aria-controls={listId}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={selected ? css.value : css.placeholder}>
          {selected ? (selected.selectedLabel ?? selected.label) : placeholder}
        </span>
        {isOpen ? (
          <LuChevronUp className={css.icon} aria-hidden="true" />
        ) : (
          <LuChevronDown className={css.icon} aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <ul id={listId} role="listbox" aria-labelledby={labelId} className={css.list}>
          {options.map(option => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={isSelected ? `${css.option} ${css.optionSelected}` : css.option}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
