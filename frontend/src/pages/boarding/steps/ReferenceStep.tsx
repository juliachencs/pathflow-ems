import { useFieldArray, useFormContext } from "react-hook-form";
import ContactForm from "../../../components/auth/ContactForm";

export default function ReferenceStep() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });
  return (
    <>

      <ContactForm namePrefix="reference"/>

      <div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{ border: "1px solid #eee", padding: 16, marginBottom: 8 }}
          >
            <ContactForm namePrefix={`emergencyContacts.${index}`}/>
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
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
        >
          Add Emergency Contact
        </button>
      </div>
    </>
  );
}
