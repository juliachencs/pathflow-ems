import { useFieldArray, useFormContext } from "react-hook-form";
import ContactForm from "../../../components/ContactForm";
import { Button, Divider, Typography } from "antd";
import type { boardingStepsProps } from "../OnBoard";

const ReferenceStep: React.FC<boardingStepsProps> = ({ disabled }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });
  return (
    <>
      <Divider titlePlacement="start">Do you have a refernecer?</Divider>
      <Typography.Text
        type="secondary"
        style={{ display: "block", marginBottom: 20, fontSize: 14 }}
      >
        If yes, provide his information below:
      </Typography.Text>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          maxWidth: "80%",
          marginBottom: "30px",
        }}
      >
        <ContactForm namePrefix="reference" disabled={disabled} />
      </div>
      <Divider titlePlacement="start">Emergency Contact</Divider>
      <div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 16,
              marginBottom: 8,
              maxWidth: "80%",
            }}
          >
            <Typography.Text
              style={{
                display: "block",
                marginBottom: 20,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Emergency Contact Info
            </Typography.Text>
            <ContactForm namePrefix={`emergencyContacts.${index}`} />
            <Button onClick={() => remove(index)} disabled={disabled}>
              Remove Contact
            </Button>
          </div>
        ))}

        <Button
          type="dashed"
          onClick={() =>
            append({
              firstName: "",
              lastName: "",
              middleName: "",
              phone: "",
              email: "",
              relationship: "",
            })
          }
          style={{ marginTop: "20px", marginBottom: "45px" }}
          disabled={disabled}
        >
          Add Emergency Contact
        </Button>
      </div>
    </>
  );
};

export default ReferenceStep;
