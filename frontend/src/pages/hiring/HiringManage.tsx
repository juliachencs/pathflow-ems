import { Button, Card, Collapse, Divider, Space, Typography } from "antd";
import SendEmailModal from "../../components/hiring/SendEmailModal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registTokenSchema } from "../../app/schema/registTokenSchema";
import RegistHistory from "../../components/hiring/RegistHistory";
import type { IProfileCore, registerLogInfo } from "../../app/types";
import OnboardingTables from "../../components/hiring/OnboardingTables";

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


// Array 1
const profilesDummy1: IProfileCore[] = [
  { _id: "1a2b3c", fullName: "Alice Johnson", email: "alice.johnson@example.com" },
  { _id: "1a2b3d", fullName: "Michael Chen", email: "michael.chen@example.com" },
  { _id: "1a2b3e", fullName: "Sophia Martinez", email: "sophia.martinez@example.com" },
  { _id: "1a2b3f", fullName: "David Kim", email: "david.kim@example.com" },
  { _id: "1a2b3g", fullName: "Emily Brown", email: "emily.brown@example.com" },
];

// Array 2
const profilesDummy2: IProfileCore[] = [
  { _id: "2b3c4d", fullName: "James Wilson", email: "james.wilson@example.com" },
  { _id: "2b3c4e", fullName: "Olivia Davis", email: "olivia.davis@example.com" },
  { _id: "2b3c4f", fullName: "William Garcia", email: "william.garcia@example.com" },
  { _id: "2b3c4g", fullName: "Ava Martinez", email: "ava.martinez@example.com" },
  { _id: "2b3c4h", fullName: "Liam Anderson", email: "liam.anderson@example.com" },
];

// Array 3
const profilesDummy3: IProfileCore[] = [
  { _id: "3c4d5e", fullName: "Mia Thomas", email: "mia.thomas@example.com" },
  { _id: "3c4d5f", fullName: "Noah Lee", email: "noah.lee@example.com" },
  { _id: "3c4d5g", fullName: "Charlotte Harris", email: "charlotte.harris@example.com" },
  { _id: "3c4d5h", fullName: "Elijah Walker", email: "elijah.walker@example.com" },
  { _id: "3c4d5i", fullName: "Amelia Scott", email: "amelia.scott@example.com" },
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
    <Card style={{minWidth: '40vw'}}>
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
        <Collapse
          items={[
            {
              key: "item",
              label: "Registration Token History",
              children: (
                <RegistHistory
                  datasource={registerHistoryDummy}
                ></RegistHistory>
              ),
            },
          ]}
        />
      </Space>
      <Divider titlePlacement="start" style={{marginTop: '50px'}}>Onboarding Application Review</Divider>
      <OnboardingTables datasourcePending={profilesDummy1} datasourceApproved={profilesDummy2} datasourceRejectd={profilesDummy3}/>
    </Card>
  );
};

export default HiringManage;
