import type { ButtonHTMLAttributes } from 'react';
import type { ChildrenProps, ClassNameProps } from '@/types/common';

export type ButtonVariant = 'primary' | 'outline';

interface ButtonBaseProps extends ChildrenProps, ClassNameProps {
  variant?: ButtonVariant;
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

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;
