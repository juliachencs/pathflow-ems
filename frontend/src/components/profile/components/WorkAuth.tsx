import { Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import dayjs from "dayjs";

const WorkAuth: React.FC<ProfileLayoutProps> = ({ values }) => {
  return (
    <Card type="inner" title="Work Authorization">
      <Descriptions column={2} size="small">
        <Descriptions.Item label="Visa Type">
          {values.workAuthorization.type}
        </Descriptions.Item>
        {values.workAuthorization.type === "Other" && (
          <Descriptions.Item label="Visa Title">
            {values.workAuthorization.title}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="Start Date">
          {values.workAuthorization.startDate
            ? dayjs(values.workAuthorization.startDate.toISOString()).format(
                "MM/DD/YYYY",
              )
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {values.workAuthorization.endDate
            ? dayjs(values.workAuthorization.endDate.toISOString()).format(
                "MM/DD/YYYY",
              )
            : "-"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default WorkAuth;
