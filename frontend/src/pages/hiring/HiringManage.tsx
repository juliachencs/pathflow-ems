import { Button, Card, Collapse, Divider, Space, Typography } from "antd";
import SendEmailModal from "../../components/hiring/SendEmailModal";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registTokenSchema } from "../../app/schema/registTokenSchema";
import RegistHistory from "../../components/hiring/RegistHistory";
import type { IProfileCore, registerLogInfo } from "../../app/types";
import OnboardingTables from "../../components/hiring/OnboardingTables";
import ReviewModal from "../../components/ReviewModal";
import ProfileLayout from "../../components/profile/ProfileLayout";

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
  {
    _id: "1a2b3c",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
  },
  {
    _id: "1a2b3d",
    fullName: "Michael Chen",
    email: "michael.chen@example.com",
  },
  {
    _id: "1a2b3e",
    fullName: "Sophia Martinez",
    email: "sophia.martinez@example.com",
  },
  { _id: "1a2b3f", fullName: "David Kim", email: "david.kim@example.com" },
  { _id: "1a2b3g", fullName: "Emily Brown", email: "emily.brown@example.com" },
];

// Array 2
const profilesDummy2: IProfileCore[] = [
  {
    _id: "2b3c4d",
    fullName: "James Wilson",
    email: "james.wilson@example.com",
  },
  {
    _id: "2b3c4e",
    fullName: "Olivia Davis",
    email: "olivia.davis@example.com",
  },
  {
    _id: "2b3c4f",
    fullName: "William Garcia",
    email: "william.garcia@example.com",
  },
  {
    _id: "2b3c4g",
    fullName: "Ava Martinez",
    email: "ava.martinez@example.com",
  },
  {
    _id: "2b3c4h",
    fullName: "Liam Anderson",
    email: "liam.anderson@example.com",
  },
];

// Array 3
const profilesDummy3: IProfileCore[] = [
  { _id: "3c4d5e", fullName: "Mia Thomas", email: "mia.thomas@example.com" },
  { _id: "3c4d5f", fullName: "Noah Lee", email: "noah.lee@example.com" },
  {
    _id: "3c4d5g",
    fullName: "Charlotte Harris",
    email: "charlotte.harris@example.com",
  },
  {
    _id: "3c4d5h",
    fullName: "Elijah Walker",
    email: "elijah.walker@example.com",
  },
  {
    _id: "3c4d5i",
    fullName: "Amelia Scott",
    email: "amelia.scott@example.com",
  },
];

const dummyProfile: IProfileFull = {
  _id: "user_001",
  name: {
    firstName: "Alice",
    middleName: "Marie",
    lastName: "Thompson",
    preferredName: "Ali",
  },
  profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
  address: {
    street: "123 Main St",
    secondary: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
  },
  cellPhone: "555-123-4567",
  workPhone: "555-987-6543",
  email: "alice.thompson@example.com",
  SSN: "123-45-6789",
  dob: new Date("1990-07-15"),
  gender: "female", // assuming Gender enum or type: "MALE" | "FEMALE" | "OTHER"
  workAuthorization: {
    type: "F1",
    title: "F1 - OPT",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2026-01-01"),
    url: "",
  },
  reference: {
    person: {
      firstName: "John",
      lastName: "Smith",
      phone: "555-222-3333",
      email: "john.smith@example.com",
    },
    relationship: "Former Manager",
  },
  emergencyContacts: [
    {
      person: {
        firstName: "Mary",
        lastName: "Thompson",
        phone: "555-444-5555",
        email: "mary.thompson@example.com",
      },
      relationship: "Mother",
    },
    {
      person: {
        firstName: "Robert",
        lastName: "Thompson",
        phone: "555-666-7777",
        email: "robert.thompson@example.com",
      },
      relationship: "Father",
    },
  ],
  visaDocuments: {
    OPT: "https://example.com/docs/alice_opt.pdf",
    EAD: "https://example.com/docs/alice_ead.pdf",
    I983: "https://example.com/docs/alice_i983.pdf",
    I20: "https://example.com/docs/alice_i20.pdf",
  },
};

const HiringManage: React.FC = () => {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const methods = useForm<{ name: string; email: string }>({
    defaultValues: { name: "", email: "" },
    resolver: zodResolver(registTokenSchema),
  });

  const handleSubmitToken = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    console.log(methods.getValues());
    methods.reset();
    setIsTokenModalOpen(false);
  };

  const handleTabChange = (key: string) => {
    setIsViewMode(key !== "PENDING");
  };

  const handleAction = async (value: string) => {
    console.log(isViewMode, value, "GaGa");
    setIsReviewModalOpen(true);
  };

  const handleReviewCancel = () => {
    setIsReviewModalOpen(false);
  };

  const handleAcceptBoarding = async () => {
    console.log("accepted");
    handleReviewCancel();
  };

  const handleRejectBoarding = async (feedback: string) => {
    console.log("rejected", feedback);
    handleReviewCancel();
  };

  // Page will throw error if useFormContext getting null
  // TODO find a way to bypass FormProvider requirement
  const methodsHolder = useForm();

  return (
    <>
      <Card style={{ minWidth: "40vw" }}>
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
            open={isTokenModalOpen}
            onCancel={() => {
              setIsTokenModalOpen(false);
            }}
            onSubmit={handleSubmitToken}
          />
        </FormProvider>
        <Space orientation="vertical" size="large">
          <Button onClick={() => setIsTokenModalOpen(true)} type="primary">
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
        <Divider titlePlacement="start" style={{ marginTop: "50px" }}>
          Onboarding Application Review
        </Divider>
        <OnboardingTables
          datasourcePending={profilesDummy1}
          datasourceApproved={profilesDummy2}
          datasourceRejectd={profilesDummy3}
          onTabChange={handleTabChange}
          onAction={handleAction}
        />
      </Card>
      <ReviewModal
        open={isReviewModalOpen}
        onCancel={handleReviewCancel}
        onAccept={handleAcceptBoarding}
        onReject={handleRejectBoarding}
        child={
          <FormProvider {...methodsHolder}>
            <div style={{ width: "100%" }}>
              <ProfileLayout values={dummyProfile} compactMode/>
            </div>
          </FormProvider>
        }
        viewMode={isViewMode}
      />
    </>
  );
};

export default HiringManage;
