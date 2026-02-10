import { useFormContext } from "react-hook-form";
import RHFInput from "./forms/RHF-Input";

type ContactFieldsProps = {
  namePrefix: string;
  disabled?: boolean;
};

export default function ContactForm({
  namePrefix,
  disabled,
}: ContactFieldsProps) {
  const { control } = useFormContext();

  return (
    <>
      <RHFInput
        name={`${namePrefix}.firstName`}
        placeholder="First Name"
        control={control}
        disabled={disabled}
      />
      <RHFInput
        name={`${namePrefix}.lastName`}
        placeholder="Lastname"
        control={control}
        disabled={disabled}
      />
      <RHFInput
        name={`${namePrefix}.middleName`}
        placeholder="Middlename"
        control={control}
        disabled={disabled}
      />
      <RHFInput
        name={`${namePrefix}.phone`}
        placeholder="Phone"
        control={control}
        disabled={disabled}
      />
      <RHFInput
        name={`${namePrefix}.email`}
        placeholder="Email"
        control={control}
        disabled={disabled}
      />
      <RHFInput
        name={`${namePrefix}.relationship`}
        placeholder="Relationship"
        control={control}
        disabled={disabled}
      />
    </>
  );
}
