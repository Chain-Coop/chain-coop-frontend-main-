import React from "react";

declare module "@material-tailwind/react" {
  interface BaseProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export interface CardProps extends BaseProps {
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
  }

  export interface CardHeaderProps extends BaseProps {
    color?: string;
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
  }

  export interface CardBodyProps extends BaseProps {
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
  }

  export interface CardFooterProps extends BaseProps {
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeaveCapture?: React.PointerEventHandler<HTMLDivElement>;
  }

  export const Card: React.FC<CardProps>;
  export const CardHeader: React.FC<CardHeaderProps>;
  export const CardBody: React.FC<CardBodyProps>;
  export const CardFooter: React.FC<CardFooterProps>;

  export interface DialogProps extends BaseProps {
    open: boolean;
    handler?: (value: boolean) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  }

  export interface DialogHeaderProps extends BaseProps {}
  export interface DialogBodyProps extends BaseProps {}
  export interface DialogFooterProps extends BaseProps {}

  export const Dialog: React.FC<DialogProps>;
  export const DialogHeader: React.FC<DialogHeaderProps>;
  export const DialogBody: React.FC<DialogBodyProps>;
  export const DialogFooter: React.FC<DialogFooterProps>;

  export interface TypographyProps extends BaseProps {
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
  }

  export const Typography: React.FC<TypographyProps>;

  export interface ButtonProps extends BaseProps {
    variant?: "filled" | "outlined" | "gradient" | "text";
    size?: "sm" | "md" | "lg";
    color?: string;
    fullWidth?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
  }

  export const Button: React.FC<ButtonProps>;
}
