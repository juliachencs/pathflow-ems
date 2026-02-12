import { Avatar, Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import { UserOutlined } from "@ant-design/icons";
import RHFInput from "../../forms/RHF-Input";
import { useFormContext } from "react-hook-form";

const PersonalInfo: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
  editMode,
}) => {
  const { control } = useFormContext();
  return (
    <>
      <Card title="Personal Information">
        <Avatar
          size={128}
          src={values.profileImage}
          style={{ marginBottom: "20px" }}
          icon={<UserOutlined />}
        />
        {editMode && (<RHFInput name="profileImgUrl" label="Profile Image link" placeholder="ImgURL" control={control}/>)}
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
            {editMode ? (
              <RHFInput name="preferedName" control={control} />
            ) : (
              values.name.preferredName || "-"
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default PersonalInfo;
