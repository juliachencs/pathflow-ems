import { Button, Card, Descriptions, Space, Typography } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import { useFieldArray, useFormContext } from "react-hook-form";
import ContactForm from "../../ContactForm";

const EmergencyContact: React.FC<ProfileLayoutProps> = ({
  values,
  editMode,
}) => {
  const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      control,
      name: "emergencyContacts",
    });
  return (
    <>
      {editMode && (
        <Card title="Emergency Contacts">
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
              <Button onClick={() => remove(index)}>Remove Contact</Button>
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
          >
            Add Emergency Contact
          </Button>
        </Card>
      )}
      {!editMode &&
        values.emergencyContacts &&
        values.emergencyContacts.length > 0 && (
          <Card title="Emergency Contacts">
            <Space size="middle" style={{ width: "100%" }}>
              {values.emergencyContacts!.map((contact, index) => (
                <Card key={index} title={`Contact ${index + 1}`} size="small">
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="First Name">
                      {contact.person.firstName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Middle Name">
                      {contact.person.middleName || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name">
                      {contact.person.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      {contact.person.phone || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {contact.person.email || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Relationship">
                      {contact.relationship}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              ))}
            </Space>
          </Card>
        )}
    </>
  );
};

export default EmergencyContact;
