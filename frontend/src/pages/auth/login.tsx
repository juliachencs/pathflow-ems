import { Card, message } from "antd";
import AuthForm, { type FieldConfig } from "../../components/auth/AuthForm";
import {
  loginSchema,
  type LoginFormValues,
} from "../../features/auth/authSchema";
import { loginUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onFinish = async (data: LoginFormValues) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      message.success("You have successfully logged in!", 3);
    } catch (error) {
        console.log(error);
        // TODO: handle error
    }
  };

  const fields: FieldConfig<LoginFormValues>[] = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
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
        schema={loginSchema}
        onFinish={onFinish}
        fields={fields}
        buttonText="Login"
      />
    </Card>
  );
};

export default Login;
