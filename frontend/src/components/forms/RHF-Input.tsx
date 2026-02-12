import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

type RHFInputProps<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  style?: React.CSSProperties
};

export default function RHFInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled = false,
  required = false,
  style,
}: RHFInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
          required={required}
          style={style}
        >
          <Input {...field} placeholder={placeholder} disabled={disabled} />
        </Form.Item>
      )}
    />
  );
}