import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import css from './Button.module.css';

type ButtonVariant = 'primary' | 'outline';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  href?: undefined;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function getClassName(variant: ButtonVariant, className?: string) {
  const classes = [css.button, css[variant]];

  if (className) classes.push(className);

  return classes.join(' ');
}

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className } = props;

  if (props.href !== undefined) {
    const { href, target, rel } = props;

    return (
      <Link href={href} target={target} rel={rel} className={getClassName(variant, className)}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _variant, className: _className, type = 'button', ...rest } = props;

  return (
    <button type={type} className={getClassName(variant, className)} {...rest}>
      {children}
    </button>
  );
}
