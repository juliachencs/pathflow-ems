import { useFormContext } from "react-hook-form";
import RHFRadioGroup from "../../../components/forms/RHF-RadioGroup";
import RHFDatePicker from "../../../components/forms/RHF-DatePicker";
import RHFInput from "../../../components/forms/RHF-Input";
import { useEffect } from "react";

export default function AuthorizationStep() {
  const { control, watch, unregister } = useFormContext();
  const isCitizen = watch("isUSCitizen");
  const visaType = watch("workAuthorization");

  useEffect(() => {
    unregister("workAuthorization");
  }, [isCitizen, unregister]);

  return (
    <>
      <RHFRadioGroup
        name="isUSCitizen"
        label="Permanent resident or citizen of the U.S.?"
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
          <RHFDatePicker name="visaStartDate" control={control} />
          <RHFDatePicker name="visaEndDate" control={control} />
        </>
      )}

      {visaType === "F1" && (
        <RHFInput
          name="optReceiptUrl"
          control={control}
          label="Upload your OPT Receipt"
          placeholder="Provide URL"
        />
      )}

      {visaType === "Other" && (
        <RHFInput
          name="otherVisaTitle"
          control={control}
          label="Specify your Visa Title"
          placeholder="Visa Title"
        />
      )}
    </>
  );
}
