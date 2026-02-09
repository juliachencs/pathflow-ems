import { DatePicker, Form } from "antd";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import dayjs from "dayjs";

type RHFDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};

export default function RHFDatePicker<T extends FieldValues>({
  name,
  control,
  label,
}: RHFDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
        >
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toDate() : null)}
          />
        </Form.Item>
      )}
    />
  );
}