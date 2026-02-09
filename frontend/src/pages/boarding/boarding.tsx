import { useState } from "react";
import IdentityStep from "./steps/IdentityStep";
import {
  contactSchema,
  identitySchema,
  referenceSchema,
  workAuthSchema,
} from "../../app/schema/boardingSchema";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "antd/es/typography/Title";
import { Button, Divider, Form, Steps, Typography } from "antd";
import ContactStep from "./steps/ContactStep";
import AuthorizationStep from "./steps/WorkAuthStep";
import ReferenceStep from "./steps/ReferenceStep";
import SummaryStep from "./steps/SummaryStep";

const Boarding: React.FC = () => {
  const [step, setStep] = useState(0);

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

  const methods = useForm({
    defaultValues: defaults,
    resolver: stepResolver(() => step),
  });

  const buttonText = step === 4 ? "Submit" : "Next Step";

  const steps = [
    {
      title: "Step 1",
      content: "Basic Identity",
    },
    {
      title: "Step 2",
      content: "Personal & Legal Info",
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
      content: "Review Your Submission",
    },
  ];

  const onChange = (value: number) => {
    if (value >= step) return;
    setStep(value);
  };

  const onNextStep = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      console.log("done");
      console.log(methods.getValues());
    }
  };
  return (
    <>
      <div
        style={{
          background: "#fff",
          padding: 30,
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          marginBottom: 30,
        }}
      >
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
            marginBottom: 50,
          }}
        >
          Before continiue, please complete your information step by step
        </Typography.Text>
        <Steps current={step} onChange={onChange} items={steps} />
        <Divider style={{ marginBottom: 60 }} />
        <Form layout="vertical">
          <FormProvider {...methods}>
            <CurrComponent />
          </FormProvider>
        </Form>

        <div>
          <Button
            type="primary"
            onClick={onNextStep}
            style={{ padding: "6px 24px", fontWeight: 500 }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Boarding;
