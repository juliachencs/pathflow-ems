import {
  Button,
  Card,
  Collapse,
  Divider,
  message,
  Space,
  Typography,
} from "antd";
import SendEmailModal from "../../components/hiring/SendEmailModal";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registTokenSchema } from "../../app/schema/registTokenSchema";
import RegistHistory from "../../components/hiring/RegistHistory";
import OnboardingTables from "../../components/hiring/OnboardingTables";
import ReviewModal from "../../components/ReviewModal";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  fetchOnboardList,
  fetchOnboardStatusById,
  fetchRegistrationHistory,
  sendInvitationToUser,
  updateBoardingStatusById,
} from "../../features/hiring/hiringSlice";

type Action = "APPROVE" | "REJECT";

const HiringManage: React.FC = () => {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentEmpId, setCurrentEmpId] = useState("");
  const methods = useForm<{ name: string; email: string }>({
    defaultValues: { name: "", email: "" },
    resolver: zodResolver(registTokenSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const {
    onboardListApproved,
    onboardListPending,
    onboardListRejected,
    registrationHistory,
    loadedOnboarding,
  } = useSelector((state: RootState) => state.hiring);

  useEffect(() => {
    try {
      dispatch(fetchRegistrationHistory())
        .unwrap()
        .catch((e) => console.log(e));
      dispatch(fetchOnboardList())
        .unwrap()
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
      // TODO handle!
    }
  }, [dispatch]);

  const handleSubmitToken = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    const payload = methods.getValues();
    console.log(payload);
    try {
      await dispatch(sendInvitationToUser(payload)).unwrap();
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
    methods.reset();
    setIsTokenModalOpen(false);
  };

  const handleTabChange = (key: string) => {
    setIsViewMode(key !== "PENDING");
  };

  const handleAction = async (id: string) => {
    try {
      await dispatch(fetchOnboardStatusById(id)).unwrap();
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
    setCurrentEmpId(id);
    setIsReviewModalOpen(true);
  };

  const handleReviewCancel = () => {
    setIsReviewModalOpen(false);
  };

  const handleAcceptBoarding = async () => {
    const payload = {
      id: currentEmpId,
      payload: {
        actionType: "APPROVE" as Action,
        payload: {
          feedback: undefined,
        },
      },
    };
    try {
      await dispatch(updateBoardingStatusById(payload)).unwrap();
      message.success("Success!", 3);
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
    handleReviewCancel();
  };

  const handleRejectBoarding = async (feedback: string) => {
    const payload = {
      id: currentEmpId,
      payload: {
        actionType: "REJECT" as Action,
        payload: {
          feedback: feedback,
        },
      },
    };
    try {
      await dispatch(updateBoardingStatusById(payload)).unwrap();
      message.success("Success!", 3);
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
    handleReviewCancel();
  };

  // Page will throw error if useFormContext getting null
  // TODO! find a way to bypass FormProvider requirement
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
                    datasource={registrationHistory ?? []}
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
          datasourcePending={onboardListPending ?? []}
          datasourceApproved={onboardListApproved ?? []}
          datasourceRejectd={onboardListRejected ?? []}
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
          loadedOnboarding && (
            <FormProvider {...methodsHolder}>
              <div style={{ width: "100%" }}>
                <ProfileLayout values={loadedOnboarding} compactMode />
              </div>
            </FormProvider>
          )
        }
        viewMode={isViewMode}
      />
    </>
  );
};

export default HiringManage;
