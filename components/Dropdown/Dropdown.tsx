'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import { cn } from '@/lib/classNames';
import type { DropdownProps } from './types';
import css from './Dropdown.module.css';

export default function Dropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  name,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const controlId = useId();
  const listId = useId();

  const selectedIndex = options.findIndex(option => option.value === value);
  const selected = selectedIndex === -1 ? undefined : options[selectedIndex];
  const activeOption = isOpen && activeIndex >= 0 ? options[activeIndex] : undefined;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;

    const activeElement = listRef.current?.children[activeIndex];

    if (activeElement instanceof HTMLElement) {
      activeElement.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  const open = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const select = (index: number) => {
    const option = options[index];

    if (option) onChange(option.value);
    close();
  };

  const moveActive = (delta: number) => {
    if (options.length === 0) return;

    const start = activeIndex === -1 ? selectedIndex : activeIndex;
    const next = Math.min(Math.max(start + delta, 0), options.length - 1);

    setActiveIndex(next);
  };

  const handleToggle = () => {
    if (isOpen) {
      close();
    } else {
      open(selectedIndex);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (isOpen) {
          moveActive(1);
        } else {
          open(selectedIndex === -1 ? 0 : selectedIndex);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          moveActive(-1);
        } else {
          open(selectedIndex === -1 ? 0 : selectedIndex);
        }
        break;
      case 'Home':
        if (!isOpen) return;
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        if (!isOpen) return;
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && activeIndex >= 0) {
          select(activeIndex);
        } else {
          handleToggle();
        }
        break;
      case 'Escape':
        if (!isOpen) return;
        event.preventDefault();
        close();
        break;
      case 'Tab':
        if (isOpen) close();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn(css.wrapper, className)}>
      <label id={`${controlId}-label`} htmlFor={controlId} className={css.label}>
        {label}
      </label>
      <button
        id={controlId}
        type="button"
        role="combobox"
        className={css.control}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-activedescendant={activeOption ? `${listId}-${activeIndex}` : undefined}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
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
      {name && <input type="hidden" name={name} value={value} />}
      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={`${controlId}-label`}
          className={css.list}
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  css.option,
                  isSelected && css.optionSelected,
                  isActive && css.optionActive,
                )}
                onPointerEnter={() => setActiveIndex(index)}
                onClick={() => select(index)}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
