import { Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import WorkAuth from "./WorkAuth";
import { dateFormatter } from "../dateBuildHelper";

const PersonalDetails: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
}) => {
  return (
    <Card title="Personal Details">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Descriptions column={2} bordered={bordered} size="small">
          <Descriptions.Item label="SSN">
            {/* {values.ssn.replace(/.(?=.{4})/g, "*")} */}
            {values.SSN}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {dateFormatter(values.dob)}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{values.gender}</Descriptions.Item>
          <Descriptions.Item label="U.S. Residency">
            {values.workAuthorization.type === "GreenCard" ||
            values.workAuthorization.type === "Citizen"
              ? "Yes"
              : "No"}
          </Descriptions.Item>
        </Descriptions>
        {!(values.workAuthorization.type === "GreenCard" ||
          values.workAuthorization.type === "Citizen") && (
          <WorkAuth values={values} />
        )}
      </div>
    </Card>
  );
};

export default PersonalDetails;
