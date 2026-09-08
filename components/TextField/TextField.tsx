import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { LuCircleAlert } from 'react-icons/lu';
import css from './TextField.module.css';

interface TextFieldBaseProps {
  label: string;
  error?: string;
  className?: string;
}

interface TextFieldAsInputProps extends TextFieldBaseProps, InputHTMLAttributes<HTMLInputElement> {
  multiline?: false;
}

interface TextFieldAsTextareaProps
  extends TextFieldBaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

type TextFieldProps = TextFieldAsInputProps | TextFieldAsTextareaProps;

export default function TextField(props: TextFieldProps) {
  const { label, error, className, id, required } = props;
  const hasError = Boolean(error);
  const errorId = id ? `${id}-error` : undefined;
  const placeholder = required ? `${label}*` : label;

  const wrapperClasses = [css.wrapper];
  if (hasError) wrapperClasses.push(css.wrapperError);
  if (className) wrapperClasses.push(className);

  const fieldClasses = [css.field, hasError && css.fieldError].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses.join(' ')}>
      <label className={css.label} htmlFor={id}>
        {placeholder}
      </label>
      <div className={css.control}>
        {props.multiline ? (
          <textarea
            {...stripCustomProps(props)}
            className={`${fieldClasses} ${css.textarea}`}
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
          />
        ) : (
          <input
            {...stripCustomProps(props)}
            className={fieldClasses}
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : undefined}
          />
        )}
        {hasError && <LuCircleAlert className={css.icon} aria-hidden="true" />}
      </div>
      {hasError && (
        <span id={errorId} className={css.error}>
          {error}
        </span>
      )}
    </div>
  );
}

function stripCustomProps<T extends TextFieldProps>(props: T) {
  const {
    label: _label,
    error: _error,
    className: _className,
    multiline: _multiline,
    ...rest
  } = props;

  return rest;
}
