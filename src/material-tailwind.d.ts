import React from "react";

declare module "@material-tailwind/react" {
  interface BaseDialogProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any; 
  }

  export interface DialogProps extends BaseDialogProps {
    open: boolean;
    handler?: (value: any) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  }

  export interface DialogHeaderProps extends BaseDialogProps {}
  export interface DialogBodyProps extends BaseDialogProps {}
  export interface DialogFooterProps extends BaseDialogProps {}

  export const Dialog: React.FC<DialogProps>;
  export const DialogHeader: React.FC<DialogHeaderProps>;
  export const DialogBody: React.FC<DialogBodyProps>;
  export const DialogFooter: React.FC<DialogFooterProps>;

  export interface TypographyProps extends BaseDialogProps {
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

  export interface ButtonProps extends BaseDialogProps {
    variant?: "filled" | "outlined" | "gradient" | "text";
    size?: "sm" | "md" | "lg";
    color?: string;
    fullWidth?: boolean;
  }

  export const Typography: React.FC<TypographyProps>;
  export const Button: React.FC<ButtonProps>;
}
