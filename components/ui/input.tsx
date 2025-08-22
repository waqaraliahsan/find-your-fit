"use client";
import * as React from "react";
import { clsx } from "clsx";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
