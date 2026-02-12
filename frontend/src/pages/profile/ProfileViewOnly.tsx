import { type BoardingFormValues } from "../../app/schema/boardingSchema";
import ProfileLayout from "../../components/profile/ProfileLayout";
import Title from "antd/es/typography/Title";
import { Card } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProfileById } from "../../features/profile/profileSlice";
import type { IProfileFull } from "../../app/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const ProfileViewOnly: React.FC = () => {
  const params = useParams();
  const { profile } = useSelector((state: RootState) => state.profile);
  // const profile = dummyProfile;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProfileById(params.id ?? ""))
      .unwrap()
      .catch((err) => console.log(err));
  }, [dispatch, params.id]);

  // Page will throw error if useFormContext getting null
  // TODO find a way to bypass FormProvider requirement
  const methods = useForm<BoardingFormValues>();

  return (
    <>
      {/* TODO? Later Styling */}
      <Card>
        <Title level={3}>My Profile</Title>
        <FormProvider {...methods}>
          {profile != null && <ProfileLayout values={profile} />}
        </FormProvider>
      </Card>
    </>
  );
};

export default ProfileViewOnly;
