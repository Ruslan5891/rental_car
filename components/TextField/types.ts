import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import type { ClassNameProps } from '@/types/common';

interface TextFieldBaseProps extends ClassNameProps {
  label: string;
  error?: string;
}

interface TextFieldAsInputProps extends TextFieldBaseProps, InputHTMLAttributes<HTMLInputElement> {
  multiline?: false;
}

interface TextFieldAsTextareaProps
  extends TextFieldBaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline: true;
}

export type TextFieldProps = TextFieldAsInputProps | TextFieldAsTextareaProps;
