"use client";

/**
 * Lightweight React Hook Form wrapper with proper generics.
 */
import React from "react";
import {
  useForm,
  FormProvider,
  type SubmitHandler,
  type FieldValues,
  type DefaultValues
} from "react-hook-form";

type Props<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
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
