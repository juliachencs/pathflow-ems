import { Button, Card, Collapse, Divider, Space, Typography } from "antd";
import SendEmailModal from "../../components/hiring/SendEmailModal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registTokenSchema } from "../../app/schema/registTokenSchema";
import RegistHistory from "../../components/hiring/RegistHistory";
import type { registerLogInfo } from "../../app/types";


const registerHistoryDummy: registerLogInfo[] = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    registrationLink: "https://yourapp.com/register/abc123",
    hasRegistered: true,
    hasApplied: true,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    registrationLink: "https://yourapp.com/register/def456",
    hasRegistered: true,
    hasApplied: false,
  },
  {
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    registrationLink: "https://yourapp.com/register/ghi789",
    hasRegistered: false,
    hasApplied: false,
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    registrationLink: "https://yourapp.com/register/jkl012",
    hasRegistered: false,
    hasApplied: true,
  },
  {
    name: "Emily Brown",
    email: "emily.brown@example.com",
    registrationLink: "https://yourapp.com/register/mno345",
    hasRegistered: true,
    hasApplied: true,
  },
];

const HiringManage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<{ name: string; email: string }>({
    defaultValues: { name: "", email: "" },
    resolver: zodResolver(registTokenSchema),
  });

  const handleSubmitToken = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    console.log(methods.getValues());
    methods.reset();
    setIsModalOpen(false);
  };
  return (
    <Card>
      <Typography.Title
        level={3}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        Hiring Management
      </Typography.Title>
      <Divider style={{ margin: "30px 0" }}></Divider>
      <Divider titlePlacement="start"> Manage Registration</Divider>
      <FormProvider {...methods}>
        <SendEmailModal
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onSubmit={handleSubmitToken}
        />
      </FormProvider>
      <Space orientation="vertical" size="large">
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Generate token and send email
        </Button>
        <Collapse items={[{key: 'item', label: 'Registration Token History', children: (
          <RegistHistory datasource={registerHistoryDummy}></RegistHistory>
        )}]}/>
      </Space>
            <Divider titlePlacement="end"> Manage Onboarding</Divider>
    </Card>
  );
};

export default HiringManage;
