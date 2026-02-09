import { useFormContext } from "react-hook-form";
import RHFInput from "../forms/RHF-Input";

type ContactFieldsProps = {
  namePrefix: string; // e.g., "reference" or "emergencyContacts.0"
};

export default function ContactForm({ namePrefix }: ContactFieldsProps) {
  const { control } = useFormContext();

  return (
    <>
      <RHFInput
        name={`${namePrefix}.firstName`}
        label="First Name"
        control={control}
      />
      <RHFInput
        name={`${namePrefix}.lastName`}
        label="Lastname"
        control={control}
      />
      <RHFInput
        name={`${namePrefix}.middleName`}
        label="Middlename"
        control={control}
      />
      <RHFInput name={`${namePrefix}.phone`} label="Phone" control={control} />
      <RHFInput name={`${namePrefix}.email`} label="Email" control={control} />
      <RHFInput
        name={`${namePrefix}.relationship`}
        label="Relationship"
        control={control}
      />
    </>
  );
}
