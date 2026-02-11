import { type BoardingFormValues } from "../../app/schema/boardingSchema";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../app/store";
import {
  boardingProfileMapper,
  // profileBoardingMapper,
} from "../../app/util/profileMapper";
import ProfileLayout from "../../components/profile/ProfileLayout";
import type { IProfileFull } from "../../app/types";
import Title from "antd/es/typography/Title";
import { Card } from "antd";
import { FormProvider, useForm } from "react-hook-form";

const dummy: BoardingFormValues = {
  firstName: "Jiaxuan",
  lastName: "Xie",
  address: {
    street: "13201 S Commercial Ave",
    city: "Chicago",
    state: "IL",
    zip: "60633",
  },
  cellPhoneNumber: "3195122427",
  email: "something@gmail.com",
  ssn: "333-333-4444",
  dob: new Date("2026-02-09T06:00:00.000Z"),
  gender: "male",
  isUSCitizen: "no",
  workAuthorization: "H4",
  visaStartDate: new Date("2026-02-01T06:00:00.000Z"),
  visaEndDate: new Date("2026-02-20T06:00:00.000Z"),
  greenCardOrCitizen: "GreenCard",
  reference: {
    firstName: "Jiaxuan",
    lastName: "Xie",
    phone: "3195122427",
    email: "mercucyedge@gmail.com",
    relationship: "Me",
  },
  emergencyContacts: [
    {
      firstName: "Jiaxuan",
      lastName: "Xie",
      middleName: "",
      phone: "3195122427",
      email: "mercucyedge@gmail.com",
      relationship: "Myself",
    },
  ],
};

const ProfileViewOnly: React.FC = () => {
  //   const { profile } = useSelector((state: RootState) => state.profile);

  const profile: IProfileFull = boardingProfileMapper(dummy);
  // const defaults: BoardingFormValues = profileBoardingMapper(profile!);

  // Page will throw error if useFormContext getting null
  // TODO find a way to bypass FormProvider requirement
  const methods = useForm<BoardingFormValues>();

  return (
    <>
      {/* TODO? Later Styling */}
      <Card>
        <Title level={3}>My Profile</Title>
        <FormProvider {...methods}>
          <ProfileLayout values={profile!} />
        </FormProvider>
      </Card>
    </>
  );
};

export default ProfileViewOnly;
