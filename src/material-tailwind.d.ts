// src/types/material-tailwind.d.ts
import React from "react";

declare module "@material-tailwind/react" {
  export interface ButtonProps {
    children?: React.ReactNode;
    variant?: "filled" | "outlined" | "gradient" | "text";
    size?: "sm" | "md" | "lg";
    color?:
      | "white"
      | "black"
      | "blue-gray"
      | "gray"
      | "brown"
      | "deep-orange"
      | "orange"
      | "amber"
      | "yellow"
      | "lime"
      | "light-green"
      | "green"
      | "teal"
      | "cyan"
      | "light-blue"
      | "blue"
      | "indigo"
      | "deep-purple"
      | "purple"
      | "pink"
      | "red";
    fullWidth?: boolean;
    className?: string;
    [key: string]: any;
  }

  export interface DialogProps {
    open: boolean;
    handler?: (value: any) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    children?: React.ReactNode;
    className?: string;
    dismiss?: object;
  }

  export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?:
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "lead"
      | "paragraph"
      | "small";
    color?: string;
    textGradient?: boolean;
    className?: string;
    children?: React.ReactNode;
  }

  export const Typography: React.ForwardRefExoticComponent;
  TypographyProps & React.RefAttributes<HTMLElement>;
  export const Button: React.ForwardRefExoticComponent;
  ButtonProps & React.RefAttributes<HTMLButtonElement>;
}
