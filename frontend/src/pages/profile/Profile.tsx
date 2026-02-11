import { FormProvider, useForm } from "react-hook-form";
import {
  onboardingSchema,
  type BoardingFormValues,
} from "../../app/schema/boardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../app/store";
import {
  boardingProfileMapper,
  // profileBoardingMapper,
} from "../../app/util/profileMapper";
import ProfileLayout from "../../components/profile/ProfileLayout";
import type { IProfileFull } from "../../app/types";
import Title from "antd/es/typography/Title";
import { Button, Card, message, Popconfirm, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { fetchUserProfile, updateUserProfile } from "../../features/profile/profileSlice";

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

const Profile: React.FC = () => {
  //   const { profile } = useSelector((state: RootState) => state.profile);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const profile: IProfileFull = boardingProfileMapper(dummy);
  // const defaults: BoardingFormValues = profileBoardingMapper(profile!);

    useEffect(() => {
      dispatch(fetchUserProfile()).unwrap().catch((err)=>console.log(err));
    },[dispatch])

  const methods = useForm<BoardingFormValues>({
    // defaultValues: defaults,
    defaultValues: dummy,
    resolver: zodResolver(onboardingSchema),
  });

  const onSave = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    console.log(methods.getValues());
    const payload = boardingProfileMapper(methods.getValues());
    try {
      await dispatch(updateUserProfile(payload)).unwrap();
      message.success("Successfully update profile!", 3);
      setEditMode((prev) => !prev);
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  };

  const onCancel = () => {
    setEditMode((prev) => !prev);
    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        {/* TODO? Later Styling */}
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Title level={3}>My Profile</Title>

            {!editMode ? (
              <Button
                type="primary"
                onClick={() => {
                  setEditMode((prev) => !prev);
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Space>
                <Popconfirm
                  placement="bottomRight"
                  title="You surely want to do this?"
                  description="All the change will be discarded"
                  onConfirm={onCancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Cancel</Button>
                </Popconfirm>

                <Button type="primary" onClick={onSave}>
                  Save
                </Button>
              </Space>
            )}
          </div>
          <ProfileLayout values={profile!} editMode={editMode} />
        </Card>
      </FormProvider>
    </>
  );
};

export default Profile;
