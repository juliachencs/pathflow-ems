import { useFormContext } from "react-hook-form";
import RHFInput from "../../../components/forms/RHF-Input";
import type { boardingStepsProps } from "../OnBoard";

const IdentityStep: React.FC<boardingStepsProps> = ({ disabled }) => {
  const { control } = useFormContext();

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <RHFInput
          name="firstName"
          control={control}
          label="First Name"
          required
          placeholder="First Name"
          disabled={disabled}
        />
        <RHFInput
          name="lastName"
          control={control}
          label="Last Name"
          required
          placeholder="Last Name"
          disabled={disabled}
        />
        <RHFInput
          name="middleName"
          control={control}
          label="Middle Name"
          placeholder="Middle Name"
          disabled={disabled}
        />
        <RHFInput
          name="preferedName"
          control={control}
          label="Prefered Name"
          placeholder="Prefered Name"
          disabled={disabled}
        />

        <RHFInput
          name="profileImgUrl"
          control={control}
          label="Profile Image"
          placeholder="Enter a URL"
          style={{ gridColumn: "1 / -1" }}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default IdentityStep;
