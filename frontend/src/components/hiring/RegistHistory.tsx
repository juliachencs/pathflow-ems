import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { registerLogInfo } from "../../app/types";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export type RegistHistoryProps = {
  datasource: registerLogInfo[];
};

const presets = [
  { status: "success", icon: <CheckCircleOutlined /> },
  { status: "processing", icon: <SyncOutlined spin /> },
  { status: "default", icon: <ClockCircleOutlined /> },
];

const columns: ColumnsType<registerLogInfo> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Registration Link",
    dataIndex: "registrationLink",
    key: "registrationLink",
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) => {
      let index = 2;
      let message = "Unused";
      if (record.hasRegistered) {
        index = 1;
        message = "Registed";
      }
      if (record.hasApplied) {
        index = 0;
        message = "Onboarding";
      }
      return (
        <Tag color={presets[index].status} icon={presets[index].icon}>
          {message}
        </Tag>
      );
    },
  },
];
const RegistHistory: React.FC<RegistHistoryProps> = ({ datasource }) => {
  return <Table dataSource={datasource} columns={columns}></Table>;
};

export default RegistHistory;
