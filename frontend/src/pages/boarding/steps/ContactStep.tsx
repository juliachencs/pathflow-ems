import { useFormContext } from "react-hook-form";
import RHFInput from "../../../components/forms/RHF-Input";
import RHFDatePicker from "../../../components/forms/RHF-DatePicker";
import RHFRadioGroup from "../../../components/forms/RHF-RadioGroup";
import { Divider } from "antd";

export default function ContactStep() {
  const { control } = useFormContext();

  return (
    <>
      <Divider titlePlacement="start">Address Info</Divider>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <RHFInput
          name="address.street"
          control={control}
          label="Street Address"
          required
          placeholder="Street"
          style={{ gridColumn: "1 / -1" }}
        />
        <RHFInput
          name="address.unit"
          control={control}
          label="Apt #"
          placeholder="Apt #"
        />
        <RHFInput
          name="address.city"
          control={control}
          label="City"
          required
          placeholder="City"
        />
        <RHFInput
          name="address.state"
          control={control}
          label="State"
          required
          placeholder="State"
        />
        <RHFInput
          name="address.zip"
          control={control}
          label="Zip Code"
          required
          placeholder="Zip Code"
        />
      </div>
      <Divider titlePlacement="start">Personal Contact Info</Divider>
      <div style={{ maxWidth: "50%" }}>
        <RHFInput
          name="cellPhoneNumber"
          control={control}
          label="Cellphone #"
          required
          placeholder="Phone #"
        />
        <RHFInput
          name="workPhoneNumber"
          control={control}
          label="Work Phone #"
          placeholder="Phone #"
        />
        <RHFInput
          name="email"
          control={control}
          label="Email Address"
          required
          disabled
        />
      </div>

      <Divider titlePlacement="start">Legal Info & Documents</Divider>
      <RHFInput
        name="ssn"
        control={control}
        label="Social Security Number"
        required
        placeholder="SSN #"
        style={{ maxWidth: "40%" }}
      />
      <RHFDatePicker
        name="dob"
        control={control}
        label="Date of Birth"
        required
      />
      <RHFRadioGroup
        name="gender"
        control={control}
        label="Gender"
        required
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
