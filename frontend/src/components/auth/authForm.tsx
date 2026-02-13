import { zodResolver } from "@hookform/resolvers/zod";
import Title from "antd/es/typography/Title";
import { useForm, type FieldValues, type Path, type Resolver } from "react-hook-form";
import RHFInput from "../forms/RHF-Input";
import RHFPassword from "../forms/RHF-Password";
import { Button, Form } from "antd";

export type FieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "password";
};

type AuthFormProps<T extends FieldValues> = {
  // I gave up on this type shit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  fields: FieldConfig<T>[];
  onFinish: (values: T) => void;
  title?: string;
  buttonText: string;
};

const AuthForm = <T extends FieldValues>({
  schema,
  fields,
  onFinish,
  title,
  buttonText
}: AuthFormProps<T>) => {
  const { control, handleSubmit } = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as unknown as Resolver<T, any, T>,
  });

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onFinish)}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Title level={3}>{title}</Title>

      {fields.map((field) =>
        field.type === "password" ? (
          <RHFPassword<T>
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            control={control}
          />
        ) : (
          <RHFInput<T>
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            control={control}
          />
        ),
      )}

      {/* TODO& style fix */}
      <Button htmlType="submit" type="primary" block>
        {buttonText}
      </Button>
    </Form>
  );
};

export default AuthForm;
