import React, { FC } from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

const VariantStyles = {
  primary: 'bg-red-300',
  secondary: 'bg-blue-300',
};

export const Button: FC<ButtonProps> = ({ children, variant }) => {
  const variantClassName = VariantStyles[variant || 'primary'];
  return <button className={variantClassName}>{children}</button>;
};
