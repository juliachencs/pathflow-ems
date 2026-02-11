import { useFormContext } from "react-hook-form";
import RHFRadioGroup from "../../../components/forms/RHF-RadioGroup";
import RHFDatePicker from "../../../components/forms/RHF-DatePicker";
import RHFInput from "../../../components/forms/RHF-Input";
import { useEffect } from "react";
import type { boardingStepsProps } from "../OnBoard";

const AuthorizationStep: React.FC<boardingStepsProps> = ({ disabled }) => {
  const { control, watch, unregister } = useFormContext();
  const isCitizen = watch("isUSCitizen");
  const visaType = watch("workAuthorization");

  useEffect(() => {
    unregister("workAuthorization");
    unregister("optReceiptUrl");
    unregister("otherVisaTitle");
    unregister("visaStartDate");
    unregister("visaEndDate");
  }, [isCitizen, unregister]);

  useEffect(() => {
    unregister("optReceiptUrl");
    unregister("otherVisaTitle");
    unregister("greenCardOrCitizen");
  }, [visaType, unregister]);

  return (
    <>
      <RHFRadioGroup
        name="isUSCitizen"
        label="Permanent resident or citizen of the U.S.?"
        required
        disabled={disabled}
        control={control}
        options={[
          {
            label: "Yes",
            value: "yes",
          },
          {
            label: "No",
            value: "no",
          },
        ]}
      />
      {isCitizen === "yes" && (
        <RHFRadioGroup
          name="greenCardOrCitizen"
          label="You are Green Card Holder or Citizen?"
          required
          disabled={disabled}
          control={control}
          options={[
            {
              label: "Green Card",
              value: "GreenCard",
            },
            {
              label: "Citizen",
              value: "Citizen",
            },
          ]}
        />
      )}

      {isCitizen === "no" && (
        <RHFRadioGroup
          name="workAuthorization"
          label="What is your work authorization?"
          required
          disabled={disabled}
          control={control}
          options={[
            //"L2", "F1", "H4", "Other"
            {
              label: "H1-B",
              value: "H1-B",
            },
            {
              label: "L2",
              value: "L2",
            },
            {
              label: "F1",
              value: "F1",
            },
            {
              label: "H4",
              value: "H4",
            },
            {
              label: "Other",
              value: "Other",
            },
          ]}
        />
      )}

      {visaType && (
        <>
          <RHFDatePicker
            name="visaStartDate"
            label="Start Date"
            required
            disabled={disabled}
            control={control}
          />
          <RHFDatePicker
            name="visaEndDate"
            label="End Date"
            required
            disabled={disabled}
            control={control}
          />
        </>
      )}

      {visaType === "F1" && (
        <RHFInput
          name="optReceiptUrl"
          control={control}
          label="Upload your OPT Receipt"
          required
          disabled={disabled}
          placeholder="Provide URL"
        />
      )}

      {visaType === "Other" && (
        <RHFInput
          name="otherVisaTitle"
          control={control}
          label="Specify your Visa Title"
          required
          disabled={disabled}
          placeholder="Visa Title"
          style={{ maxWidth: "30%" }}
        />
      )}
    </>
  );
};

export default AuthorizationStep;
