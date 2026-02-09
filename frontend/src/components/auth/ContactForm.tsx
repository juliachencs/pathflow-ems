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
        placeholder="First Name"
        control={control}
      />
      <RHFInput
        name={`${namePrefix}.lastName`}
        placeholder="Lastname"
        control={control}
      />
      <RHFInput
        name={`${namePrefix}.middleName`}
        placeholder="Middlename"
        control={control}
      />
      <RHFInput name={`${namePrefix}.phone`} placeholder="Phone" control={control} />
      <RHFInput name={`${namePrefix}.email`} placeholder="Email" control={control} />
      <RHFInput
        name={`${namePrefix}.relationship`}
        placeholder="Relationship"
        control={control}
      />
    </>
  );
}
