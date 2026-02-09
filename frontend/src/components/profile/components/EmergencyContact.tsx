import { Card, Descriptions, Space } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";

const EmergencyContact: React.FC<ProfileLayoutProps> = ({
  values,
}) => {
  return (
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
  );
};

export default EmergencyContact;
