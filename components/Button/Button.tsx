import Link from 'next/link';
import { cn } from '@/lib/classNames';
import type { ButtonProps } from './types';
import css from './Button.module.css';

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className } = props;
  const classes = cn(css.button, css[variant], className);

  if (props.href !== undefined) {
    const { href, target, rel } = props;

    return (
      <Link className={classes} href={href} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _variant, className: _className, type = 'button', ...rest } = props;

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
}
