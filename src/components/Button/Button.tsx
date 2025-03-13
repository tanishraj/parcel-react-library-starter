import React, { FC } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export const Button: FC<ButtonProps> = ({ children, variant }) => {
  return (
    <button style={{ backgroundColor: variant === "primary" ? "red" : "blue" }}>
      {children}
    </button>
  );
};
