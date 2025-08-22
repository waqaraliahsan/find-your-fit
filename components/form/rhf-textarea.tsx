"use client";
import { Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={"min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue outline-none " + (className ?? "")}
      {...props}
    />
  );
}
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
};
export function RHFTextarea<T extends FieldValues>({ name, label, placeholder, required }: Props<T>) {
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
            <Textarea id={id} placeholder={placeholder} {...field} />
            {fieldState.error ? (
              <p className="text-xs text-red-600">{fieldState.error.message}</p>
            ) : null}
          </>
        )}
      />
    </div>
  );
}
