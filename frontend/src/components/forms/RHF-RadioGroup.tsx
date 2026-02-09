import { Form, Radio } from "antd";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";

type RadioOption = {
  label: React.ReactNode;
  value: string | number | boolean;
};

type RHFRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: RadioOption[];
  label?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function RHFRadioGroup<T extends FieldValues>({
  name,
  control,
  options,
  label,
  disabled = false,
  required = false,
}: RHFRadioGroupProps<T>) {
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
        >
          <Radio.Group
            {...field}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            disabled={disabled}
          >
            {options.map((option) => (
              <Radio.Button value={option.value}>{option.label}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      )}
    />
  );
}
