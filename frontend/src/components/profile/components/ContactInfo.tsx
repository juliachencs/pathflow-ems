import { Card, Descriptions, Space } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import RHFInput from "../../forms/RHF-Input";
import { useFormContext } from "react-hook-form";

const ContactInfo: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
  editMode,
}) => {
  const { control } = useFormContext();
  return (
    <Card title="Contact Information">
      <Descriptions column={2} bordered={bordered} size="small">
        <Descriptions.Item label="Address">
          {editMode ? (
            <>
              <Space.Compact>
                {" "}
                <RHFInput
                  name="address.unit"
                  control={control}
                  placeholder="Apt #"
                />
                <RHFInput
                  name="address.street"
                  control={control}
                  placeholder="street"
                />
                <RHFInput
                  name="address.city"
                  control={control}
                  placeholder="city"
                />
                <RHFInput
                  name="address.state"
                  control={control}
                  placeholder="state"
                />
                <RHFInput
                  name="address.zip"
                  control={control}
                  placeholder="zip"
                />
              </Space.Compact>
            </>
          ) : (
            `${values.address.secondary} ${values.address.street} ${values.address.city}, ${values.address.state} ${values.address.zip} `
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Cell Phone">
          {editMode ? (
            <RHFInput name="cellPhoneNumber" control={control} />
          ) : (
            values.cellPhone
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Work Phone">
          {editMode ? (
            <RHFInput name="workPhoneNumber" control={control} />
          ) : (
            values.workPhone || "-"
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{values.email}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ContactInfo;
