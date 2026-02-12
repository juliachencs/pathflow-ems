import { Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import WorkAuth from "./WorkAuth";
import RHFRadioGroup from "../../forms/RHF-RadioGroup";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const PersonalDetails: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
  editMode,
}) => {
  const { control } = useFormContext();
  return (
    <Card title="Personal Details">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Descriptions column={2} bordered={bordered} size="small">
          <Descriptions.Item label="SSN">
            {/* {values.ssn.replace(/.(?=.{4})/g, "*")} */}
            {values.SSN}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {dayjs(values.dob).format('MM/DD/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {editMode ? (
              <RHFRadioGroup
                name="gender"
                control={control}
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Not wish to answer",
                    value: "other",
                  },
                ]}
              />
            ) : (
              values.gender
            )}
          </Descriptions.Item>
          <Descriptions.Item label="U.S. Residency">
            {values.workAuthorization.type === "Green Card" ||
            values.workAuthorization.type === "Citizen"
              ? "Yes"
              : "No"}
          </Descriptions.Item>
        </Descriptions>
        {!(
          values.workAuthorization.type === "Green Card" ||
          values.workAuthorization.type === "Citizen"
        ) && <WorkAuth values={values} />}
      </div>
    </Card>
  );
};

export default PersonalDetails;
