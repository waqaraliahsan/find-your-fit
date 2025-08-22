"use client";
import * as React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
type Props<T> = {
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
};
export function RHFForm<T extends Record<string, any>>({ defaultValues, onSubmit, children }: Props<T>) {
  const methods = useForm<T>({ defaultValues, mode: "onSubmit" });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
