import { useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { LuCircleAlert } from 'react-icons/lu';
import { cn } from '@/lib/classNames';
import type { TextFieldProps } from './types';
import css from './TextField.module.css';

export default function TextField(props: TextFieldProps) {
  const generatedId = useId();
  const {
    label,
    error,
    className,
    id = generatedId,
    required,
    multiline: _multiline,
    ...rest
  } = props;
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const placeholder = required ? `${label}*` : label;
  const fieldClasses = cn(css.field, hasError && css.fieldError);

  const controlProps = {
    id,
    placeholder,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError ? errorId : undefined,
  };

  return (
    <div className={cn(css.wrapper, hasError && css.wrapperError, className)}>
      <label className={cn(css.label, required && css.labelRequired)} htmlFor={id}>
        {placeholder}
      </label>
      <div className={css.control}>
        {props.multiline ? (
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...controlProps}
            className={cn(fieldClasses, css.textarea)}
            required={required}
          />
        ) : (
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            {...controlProps}
            className={fieldClasses}
            required={required}
          />
        )}
        {hasError && <LuCircleAlert className={css.icon} aria-hidden="true" />}
      </div>
      {hasError && (
        <span className={css.error} id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
