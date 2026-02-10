import { Card, Divider } from "antd";
import Title from "antd/es/typography/Title";
import type { FileStatus } from "../../app/types";
import type { DocType } from "../../app/types";
import VisaProcess from "../../components/visa/VisaProcess";

const MyVisa: React.FC = () => {
  // TODO handle finished / NA / NR

  // TODO rework on description data structure

  const mockData: { key: DocType; status: FileStatus } = {
    key: "EAD",
    status: 'APPROVED',
  };

  const feedback = 'document too blur'

  return (
    <>
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
        <VisaProcess docKey={mockData.key} docStatus={mockData.status} feedback={feedback}/>
      </Card>
    </>
  );
};

export default MyVisa;
