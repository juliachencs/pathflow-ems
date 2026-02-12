import { Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";

const ReferencePerson: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
}) => {
  return (
    <Card title="Reference">
      <Descriptions column={2} bordered={bordered} size="small">
        <Descriptions.Item label="First Name">
          {values.reference?.person?.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Middle Name">
          {values.reference?.person?.middleName || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {values.reference?.person?.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {values.reference?.person?.phone || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {values.reference?.person?.email || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Relationship">
          {values.reference?.relationship || "-"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ReferencePerson;
