import { FC } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { buttonVariants } from './Button.styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button: FC<ButtonProps> = ({ children }) => {
  return <button className={cn(buttonVariants())}>{children}</button>;
};
