"use client";
import { Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
};
export function RHFInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  required
}: Props<T>) {
  const { control } = useFormContext<T>();
  const id = String(name);
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <Input id={id} placeholder={placeholder} type={type} {...field} />
            {fieldState.error ? (
              <p className="text-xs text-red-600">{fieldState.error.message}</p>
            ) : null}
          </>
        )}
      />
    </div>
  );
}
