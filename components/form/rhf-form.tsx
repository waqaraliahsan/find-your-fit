"use client";

/**
 * Lightweight React Hook Form wrapper with proper generics.
 * Fixes TS error: Type 'T' does not satisfy the constraint 'FieldValues'.
 */
import React from "react";
import {
  useForm,
  FormProvider,
  type SubmitHandler,
  type FieldValues
} from "react-hook-form";

type Props<T extends FieldValues> = {
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};

export function RHFForm<T extends FieldValues>({
  defaultValues,
  onSubmit,
  children
}: Props<T>) {
  const methods = useForm<T>({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
