import { motion, MotionProps } from "framer-motion";
import { Typography, TypographyProps } from "@material-tailwind/react";
import { forwardRef } from "react";

const ForwardedTypography = forwardRef<HTMLElement, TypographyProps>(
  (props, ref) => <Typography {...props} ref={ref as any} />,
);

ForwardedTypography.displayName = "ForwardedTypography";

export const MotionTypography = motion(ForwardedTypography);

export type MotionTypographyProps = TypographyProps & MotionProps;
