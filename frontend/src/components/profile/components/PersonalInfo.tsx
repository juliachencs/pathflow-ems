import { Avatar, Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import { UserOutlined } from "@ant-design/icons";

const PersonalInfo: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
}) => {
  return (
    <>
      <Card title="Personal Information">
        <Avatar
          size={128}
          src={values.profileImage}
          style={{ marginBottom: "20px" }}
          icon={<UserOutlined />}
        />
        <Descriptions column={2} bordered={bordered} size="small">
          <Descriptions.Item label="First Name">
            {values.name.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Middle Name">
            {values.name.middleName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {values.name.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Preferred Name">
            {values.name.preferredName || "-"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default PersonalInfo;
