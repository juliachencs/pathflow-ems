import { useEffect, useMemo, useState } from "react";
import IdentityStep from "./steps/IdentityStep";
import {
  contactSchema,
  identitySchema,
  referenceSchema,
  workAuthSchema,
  type BoardingFormValues,
} from "../../app/schema/boardingSchema";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "antd/es/typography/Title";
import {
  Button,
  Card,
  Divider,
  Form,
  message,
  Result,
  Steps,
  Typography,
} from "antd";
import ContactStep from "./steps/ContactStep";
import AuthorizationStep from "./steps/WorkAuthStep";
import ReferenceStep from "./steps/ReferenceStep";
import SummaryStep from "./steps/SummaryStep";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { boardingProfileMapper } from "../../app/util/profileMapper";
import type { BoardingStatus, IProfileFull } from "../../app/types";
import {
  reSubmitBoardingApplication,
  submitBoardingApplication,
} from "../../features/boarding/boardingSlice";
import { setBoarding } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

type ResultStatus = "success" | "error" | "info";
interface resultElements {
  resultTitle: string;
  resultSubTitle: string;
  buttonText: string;
  status: ResultStatus;
}

export interface boardingStepsProps {
  disabled: boolean;
}

const steps = [
  {
    title: "Step 1",
    content: "Basic Identity",
  },
  {
    title: "Step 2",
    content: "Personal Detail",
  },
  {
    title: "Step 3",
    content: "Work Authorization",
  },
  {
    title: "Step 4",
    content: "Reference & Others",
  },
  {
    title: "Step 5",
    content: "Review",
  },
];

const defaults = {
  firstName: "",
  lastName: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
  cellPhoneNumber: "",
  // TODO Handle the email address import here
  email: "something@gmail.com",
  ssn: "",
  dob: null,
  gender: "",
  // driverLicenceUrl: "",
};

const stepProvider = [
  {
    component: IdentityStep,
    schema: identitySchema,
  },
  {
    component: ContactStep,
    schema: contactSchema,
  },
  { component: AuthorizationStep, schema: workAuthSchema },
  { component: ReferenceStep, schema: referenceSchema },
  { component: SummaryStep },
];

const statusRecord: Record<BoardingStatus, resultElements> = {
  PENDING: {
    resultTitle: "Waiting for HR to review your form",
    resultSubTitle: "Please be patient and check back later",
    buttonText: "Click here to view your form",
    status: "info",
  },
  REJECTED: {
    resultTitle: "Your onboarding form was rejected",
    resultSubTitle: "Check the feedback below and edit the form accordingly",
    buttonText: "Click here to start edit your form",
    status: "error",
  },
  APPROVED: {
    resultTitle: "Congrats, your onboarding process is completed!",
    resultSubTitle: "Welcome onboard! AYE AYE!",
    buttonText: "Back to Homescreen",
    status: "success",
  },
  UNSUBMIT: {
    resultTitle: "You shouldn't see this page",
    resultSubTitle: "Contact Administator for help",
    buttonText: "",
    status: "info",
  },
};

const OnBoard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [farStep, setFarStep] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const { currentUser } = useSelector((state: RootState) => state.auth);
  const {
    // status, feedback
    boardingValues,
  } = useSelector((state: RootState) => state.boarding);

  // dummies
  const status: BoardingStatus = "PENDING";
  const feedback = null;
  const currentUser = useMemo((): { boarding: BoardingStatus } => {
    return { boarding: "REJECTED" };
  }, []);

  useEffect(() => {
    // I believe I know what I'm doing
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (currentUser?.boarding === "UNSUBMIT") setShowForm(true);
  }, [currentUser]);

  const CurrComponent = stepProvider[step].component;
  const getSchemaForStep = (step: number) => stepProvider[step]?.schema;

  // Each step, create new Resolver
  // TODO?: Use simpler design, single resolver and only validate nessasary part each time
  const stepResolver =
    (getCurrentStep: () => number): Resolver =>
    // Suppress type issues for now
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any, context, options: any) => {
      const schema = getSchemaForStep(getCurrentStep());

      if (!schema) {
        return {
          values,
          errors: {},
        };
      }

      return zodResolver(schema)(values, context, options);
    };

  // TODO data refresh, state setting
  // Yeah type is whaterver (for now)
  const methods = useForm<BoardingFormValues>({
    defaultValues: boardingValues ?? defaults,
    resolver: stepResolver(() => step),
  });

  const onChange = (value: number) => {
    if (editMode) {
      if (value > farStep) return;
    }
    setStep(value);
  };

  const submitApplication = async (data: IProfileFull) => {
    try {
      if (currentUser?.boarding === "UNSUBMIT") {
        await dispatch(submitBoardingApplication(data)).unwrap();
      } else {
        await dispatch(reSubmitBoardingApplication(data)).unwrap();
      }
      message.success("You have successfully submit the form!", 3);
      dispatch(setBoarding(status));
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  };

  // TODO More dynamic Step handling & further dismantle of Boarding page
  const onNextStep = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (step < 4) {
      setFarStep((prev) => (step >= prev ? step + 1 : prev));
      setStep((prev) => prev + 1);
    } else {
      console.log("done", methods.getValues());
      submitApplication(boardingProfileMapper(methods.getValues()));
    }
  };

  const onClickResult = () => {
    if (status === "APPROVED") {
      navigate("/dashboard");
      return;
    }

    if (status === "PENDING") setEditMode(false);

    setShowForm(true);
  };

  return (
    <>
      {/* TODO fix styling */}
      <Card
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: 30,
        }}
      >
        {!showForm && (
          <Result
            status={statusRecord[status].status}
            title={statusRecord[status].resultTitle}
            subTitle={statusRecord[status].resultSubTitle}
            extra={[
              <Button type="primary" onClick={onClickResult}>
                {statusRecord[status].buttonText}
              </Button>,
            ]}
          >
            {feedback && (
              <>
                <Typography.Text type="secondary">HR Feedback:</Typography.Text>
                <br />
                <Typography.Text>{feedback}</Typography.Text>
              </>
            )}
          </Result>
        )}
        {showForm && (
          <div>
            <Title
              level={2}
              style={{
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Onboarding Process
            </Title>
            <Typography.Text
              type="secondary"
              style={{
                display: "block",
                textAlign: "center",
                fontSize: 14,
                marginBottom: 30,
              }}
            >
              Before continiue, please complete your information step by step
            </Typography.Text>
            <Steps
              current={step}
              onChange={onChange}
              items={steps}
              style={{ margin: "30px 30px" }}
            />
            <Divider style={{ marginBottom: 40 }} />
            <Form layout="vertical">
              <FormProvider {...methods}>
                <CurrComponent disabled />
              </FormProvider>
            </Form>
            <Button
              type="primary"
              onClick={onNextStep}
              style={{ padding: "6px 24px", fontWeight: 500, marginTop: 50 }}
            >
              {step === 4 ? "Submit" : "Next Step"}
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default OnBoard;
