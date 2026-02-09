import { useFormContext } from "react-hook-form";
import RHFInput from "../../../components/forms/RHF-Input";
import RHFDatePicker from "../../../components/forms/RHF-DatePicker";
import RHFRadioGroup from "../../../components/forms/RHF-RadioGroup";

export default function ContactStep() {
  const { control } = useFormContext();

  return (
    <>
      <RHFInput name="address.unit" control={control} placeholder="Apt #" />
      <RHFInput name="address.street" control={control} placeholder="Street" />
      <RHFInput name="address.city" control={control} placeholder="City" />
      <RHFInput name="address.state" control={control} placeholder="State" />
      <RHFInput name="address.zip" control={control} placeholder="Zip Code" />
      <RHFInput
        name="cellPhoneNumber"
        control={control}
        placeholder="Phone #"
      />
      <RHFInput
        name="workPhoneNumber"
        control={control}
        placeholder="Work Phone #"
      />
      <RHFInput name="email" control={control} placeholder="Email" disabled />
      <RHFInput name="ssn" control={control} placeholder="SSN #" />
      <RHFDatePicker name="dob" control={control} />
      <RHFRadioGroup
        name="gender"
        control={control}
        options={[
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Not wish to answer",
            value: "other",
          },
        ]}
      />
    </>
  );
}
