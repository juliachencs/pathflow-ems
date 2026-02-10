import { Card, Divider } from "antd";
import Title from "antd/es/typography/Title";
import type { FileStatus, VisaStatus } from "../../app/types";
import type { DocType } from "../../app/types";
import VisaProcess from "../../components/visa/VisaProcess";
import VisaCompleted from "../../components/visa/VisaCompleted";
import VisaNotRequired from "../../components/visa/VisaNotRequired";

const MyVisa: React.FC = () => {

  const mockData: { key: DocType; status: FileStatus; visaState: VisaStatus } =
    {
      key: "EAD",
      status: "PENDING",
      visaState: 'FINISHED',
    };

  const feedback = "document too blur";

  return (
    <>
    {/* TODO fix styling */}
      <Card
        style={{
          padding: "0 80px 30px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Title
          level={3}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          My Visa Status
        </Title>
        <Divider></Divider>
        {mockData.visaState === "PROGRESS" && (
          <VisaProcess
            docKey={mockData.key}
            docStatus={mockData.status}
            feedback={feedback}
          />
        )}
        {mockData.visaState === 'FINISHED' && (
            <VisaCompleted />
        )}
        {(mockData.visaState === 'NA' || mockData.visaState === 'NR') && (
            <VisaNotRequired />
        )}
      </Card>
    </>
  );
};

export default MyVisa;
