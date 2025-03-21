import React, { FC } from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

const VariantStyles = {
  primary: 'bg-red-300 dark:bg-red-600',
  secondary: 'bg-blue-300 dark:bg-blue-600',
};

export const Button: FC<ButtonProps> = ({ children, variant }) => {
  const variantClassName = VariantStyles[variant || 'primary'];
  return <button className={variantClassName}>{children}</button>;
};
