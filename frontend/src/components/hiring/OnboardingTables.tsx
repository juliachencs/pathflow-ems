import { Button, Table, Tabs, type TabsProps } from "antd";
import type { IProfileCore } from "../../app/types";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

type OnboardingTablesProps = {
  datasourcePending: IProfileCore[];
  datasourceApproved: IProfileCore[];
  datasourceRejectd: IProfileCore[];
  onTabChange?: (key: string) => void;
  onAction?: (value: string) => void;
};
const OnboardingTables: React.FC<OnboardingTablesProps> = ({
  datasourcePending,
  datasourceApproved,
  datasourceRejectd,
  onTabChange,
  onAction,
}) => {
  const columns: ColumnsType<IProfileCore> = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (value) => (
        <Button type="link" onClick={() => onAction?.(value)}>
          View Application
        </Button>
      ),
    },
  ];

  const tabs: TabsProps["items"] = [
    {
      key: "PENDING",
      label: "Pending",
      children: <Table dataSource={datasourcePending} columns={columns} />,
      icon: <SyncOutlined />,
    },
    {
      key: "APPROVED",
      label: "Approved",
      children: <Table dataSource={datasourceApproved} columns={columns} />,
      icon: <CheckCircleOutlined />,
    },
    {
      key: "REJECTED",
      label: "Rejected",
      children: <Table dataSource={datasourceRejectd} columns={columns} />,
      icon: <ClockCircleOutlined />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="pending"
      items={tabs}
      onChange={onTabChange}
    />
  );
};

export default OnboardingTables;
