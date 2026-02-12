import { Button, Table, Tabs, type TabsProps } from "antd";
import type { IProfileCore } from "../../app/types";
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

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
    render: () => <Button type="link">View Application</Button>,
  },
];



type OnboardingTablesProps = {
  datasourcePending: IProfileCore[];
  datasourceApproved: IProfileCore[];
  datasourceRejectd: IProfileCore[];
};
const OnboardingTables: React.FC<OnboardingTablesProps> = ({
  datasourcePending,
  datasourceApproved,
  datasourceRejectd,
}) => {
    const tabs: TabsProps["items"] = [
  {
    key: "pending",
    label: (
      <div >Pending</div>
    ),
    children: <Table dataSource={datasourcePending} columns={columns} />,
    icon: <SyncOutlined />

  },
  {
    key: "approved",
    label: <div >Approved</div>,
    children: <Table dataSource={datasourceApproved} columns={columns} />,
        icon: <CheckCircleOutlined />
  },
  {
    key: "rejected",
    label: <div >Rejected</div>,
    children: <Table dataSource={datasourceRejectd} columns={columns} />,
    icon: <ClockCircleOutlined />
  },
];
  return <Tabs defaultActiveKey="1" items={tabs}></Tabs>;
};

export default OnboardingTables;
