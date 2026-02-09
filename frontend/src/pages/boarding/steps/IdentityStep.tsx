import { useFormContext } from "react-hook-form";
import RHFInput from "../../../components/forms/RHF-Input";


export default function IdentityStep() {
  const { control } = useFormContext();

  return (
    <>
      <RHFInput name="firstName" control={control} placeholder="First Name" />
      <RHFInput name="lastName" control={control} placeholder="Last Name" />
      <RHFInput name="middleName" control={control} placeholder="Middle Name" />
      <RHFInput
        name="preferedName"
        control={control}
        placeholder="Prefered Name"
      />
      <RHFInput
        name="profileImgUrl"
        control={control}
        placeholder="Profile Image URL"
      />
    </>
  );
}
