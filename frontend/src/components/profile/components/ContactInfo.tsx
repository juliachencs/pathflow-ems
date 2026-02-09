import { Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";

const ContactInfo: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
}) => {
  return (
    <Card title="Contact Information">
      <Descriptions column={2} bordered={bordered} size="small">
        <Descriptions.Item label="Address">
          {values.address.street}
        </Descriptions.Item>
        <Descriptions.Item label="Cell Phone">
          {values.cellPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Work Phone">
          {values.workPhone || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{values.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ContactInfo;
