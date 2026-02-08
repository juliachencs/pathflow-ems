import { Card, message } from "antd";
import AuthForm, { type FieldConfig } from "../../components/auth/authForm";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../features/auth/authSchema";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { registerUser } from "../../features/auth/authSlice";

const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const registerToken = searchParams.get("registerToken")?? '';
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (data: RegisterFormValues) => {
    try {
      await dispatch(registerUser({ ...data, registerToken: registerToken })).unwrap();
      message.success("You have successfully logged in!", 3);
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  };
  const fields: FieldConfig<RegisterFormValues>[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "password",
      placeholder: "Enter your password",
      type: "password",
    },
  ];

  return (
    <Card
      style={{
        width: 380,
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.85)",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Welcome to Pathflow</h2>
      <AuthForm
        schema={registerSchema}
        onFinish={onFinish}
        fields={fields}
        buttonText="Sign Up"
      />
    </Card>
  );
};

export default Register;
