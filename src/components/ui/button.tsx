import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import "./button.css"; // Import the custom CSS

// Define interfaces for props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Build the class string
    const baseClass = "button-base";
    const variantClass = `button-variant-${variant}`;
    const sizeClass = `button-size-${size}`;

    // Simple class joining (replace with clsx/tailwind-merge if complex merging needed)
    const finalClassName = [baseClass, variantClass, sizeClass, className]
      .filter(Boolean) // Remove null/undefined
      .join(" ");

    return (
      <Comp
        className={finalClassName}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };