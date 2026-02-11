import { Table } from "antd";
import type { VisaListProps } from "../VisaManage";

const VisaListIP: React.FC<VisaListProps> = ({ datasource, columns }) => {
  return (
    <>
      <Table columns={columns} dataSource={datasource ?? []}></Table>
    </>
  );
};

export default VisaListIP;
