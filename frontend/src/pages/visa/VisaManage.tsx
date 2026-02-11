import {
  Button,
  Card,
  Divider,
  Form,
  message,
  Modal,
  Space,
  Tabs,
  Tag,
  Typography,
  type TabsProps,
} from "antd";
import VisaListIP from "./components/VisaListIP";
import VisaListAll from "./components/VisaListAll";
import type {
  DocType,
  IManagedVisaStatus,
  IVisaAction,
  IVisaWorkAuth,
  NamePacked,
} from "../../app/types";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { updateEmployeeVisa } from "../../features/empVisa/empVisaSlice";
import { Controller, useForm } from "react-hook-form";

const managedVisaStatusMock: IManagedVisaStatus[] = [
  {
    employeeId: "emp_001",
    name: {
      firstName: "David",
      lastName: "Chen",
      preferredName: "Dave",
    },
    workAuthorization: {
      title: "F1 - OPT",
      startDate: "2025-01-15",
      endDate: "2025-01-16",
    },
    nextStep: "Review OPT document",
    action: {
      actionType: "REVIEW",
      payload: {
        documentType: "OPT",
        url: "https://example.com/docs/emp_001_opt.pdf",
      },
    },
    files: {
      OPT: "https://example.com/docs/emp_001_opt.pdf",
    },
  },
  {
    employeeId: "emp_002",
    name: {
      firstName: "Maria",
      lastName: "Garcia",
      middleName: "Elena",
    },
    workAuthorization: {
      title: "F1 - STEM OPT",
      startDate: "2024-12-21",
      endDate: "2025-01-31",
    },
    nextStep: "Submit I-983 training plan",
    action: {
      actionType: "SEND_NOTIFICATION",
      payload: {
        documentType: "I983",
      },
    },
    files: {
      OPT: "https://example.com/docs/emp_002_opt.pdf",
    },
  },
  {
    employeeId: "emp_003",
    name: {
      firstName: "Ravi",
      lastName: "Patel",
    },
    workAuthorization: {
      title: "H1-B",
      startDate: "2023-10-01",
      endDate: "2026-09-30",
    },
    nextStep: "Wait for HR approval of EAD",
    action: {
      actionType: "REVIEW",
      payload: {
        documentType: "EAD",
        url: "https://example.com/docs/emp_003_ead.pdf",
      },
    },
    files: {
      EAD: "https://example.com/docs/emp_003_ead.pdf",
      I20: "https://example.com/docs/emp_003_i20.pdf",
    },
  },
  {
    employeeId: "emp_004",
    name: {
      firstName: "Sophia",
      lastName: "Kim",
    },
    workAuthorization: {
      title: "F1 - OPT",
      startDate: "2025-03-01",
      endDate: "2026-02-28",
    },
    nextStep: "Upload EAD document",
    action: {
      actionType: "SEND_NOTIFICATION",
      payload: {
        documentType: "EAD",
      },
    },
    files: {
      OPT: "https://example.com/docs/emp_004_opt.pdf",
      I20: "https://example.com/docs/emp_004_i20.pdf",
    },
  },
  {
    employeeId: "emp_005",
    name: {
      firstName: "Liam",
      lastName: "Johnson",
      preferredName: "Lee",
    },
    workAuthorization: {
      title: "F1 - STEM OPT",
      startDate: "2024-09-15",
      endDate: "2026-09-14",
    },
    nextStep: "Review I-20 document",
    action: {
      actionType: "REVIEW",
      payload: {
        documentType: "I20",
        url: "https://example.com/docs/emp_005_i20.pdf",
      },
    },
    files: {
      OPT: "https://example.com/docs/emp_005_opt.pdf",
      EAD: "https://example.com/docs/emp_005_ead.pdf",
      I20: "https://example.com/docs/emp_005_i20.pdf",
    },
  },
];

export type VisaListProps = {
  datasource: IManagedVisaStatus[] | null;
  columns: ColumnsType<IManagedVisaStatus>;
};

interface CurrentFile {
  documentType: DocType | undefined;
  url?: string;
  employeeId?: string;
}

// TODO decouple (further!)
const VisaManage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<CurrentFile>({
    documentType: undefined,
  });
  const [isRejectProcess, setIsRejectProcess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { reset, trigger, getValues, control } = useForm<{ feedback: string }>({
    defaultValues: { feedback: "" },
  });

  const baseColumns: ColumnsType<IManagedVisaStatus> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: NamePacked) =>
        `${name.firstName} ${name.middleName ?? ""} ${name.lastName}`,
    },

    {
      title: "Work Authorization",
      dataIndex: "workAuthorization",
      key: "title",
      render: (workAuthorization: {
        title: string;
        startDate: string;
        endDate: string;
      }) =>
        `${workAuthorization.title} | ${dayjs(workAuthorization.startDate).format("MM/DD/YY")} - ${dayjs(workAuthorization.endDate).format("MM/DD/YY")}`,
    },

    {
      title: "Days Remain",
      dataIndex: "workAuthorization",
      key: "daysRemain",
      render: (workAuthorization: IVisaWorkAuth) => {
        const start = dayjs(workAuthorization.startDate);
        const end = dayjs(workAuthorization.endDate);
        const diff = end.diff(start, "day");
        let color: "error" | "warning" | "default" = "default";
        if (diff <= 30) {
          color = "error";
        } else if (diff <= 90) {
          color = "warning";
        }
        return (
          <Tag color={color} variant="outlined">
            {diff} days
          </Tag>
        );
      },
    },

    {
      title: "Next Step",
      dataIndex: "nextStep",
      key: "nextStep",
    },
  ];

  const handleSendNotif = async (id: string, docType: DocType) => {
    try {
      await dispatch(
        updateEmployeeVisa({
          id,
          actionType: "SEND_NOTIFICATION",
          payload: {
            documentType: docType,
          },
        }),
      ).unwrap();
    } catch (err) {
      // TODO handle
      console.log(err);
    }
  };

  const columnsIP: ColumnsType<IManagedVisaStatus> = [
    ...baseColumns,
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: IVisaAction, record) => {
        const { actionType, payload } = action;
        if (actionType === "SEND_NOTIFICATION") {
          return (
            <Button
              onClick={() => {
                handleSendNotif(record.employeeId, payload.documentType);
              }}
            >
              Send Notification
            </Button>
          );
        }
        return (
          <Button
            onClick={() => {
              setCurrentFile({
                documentType: payload.documentType,
                url: payload.url,
                employeeId: record.employeeId,
              });
              setIsModalOpen(true);
            }}
          >
            Review Documents
          </Button>
        );
      },
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsRejectProcess(false);
  };

  const handleAccept = async () => {
    try {
      await dispatch(
        updateEmployeeVisa({
          id: currentFile.employeeId ?? "",
          actionType: "APPROVE",
          payload: {
            documentType: currentFile.documentType ?? "I20",
          },
        }),
      ).unwrap();
      handleCancel();
    } catch (err) {
      // TODO handle
      console.log(err);
    }
  };

  const handleReject = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    const feedback = getValues().feedback;
    try {
      await dispatch(
        updateEmployeeVisa({
          id: currentFile.employeeId ?? "",
          actionType: "REJECT",
          payload: {
            documentType: currentFile.documentType ?? "I20",
            feedback
          },
        }),
      ).unwrap();
      reset();
      handleCancel();
    } catch (err) {
      // TODO handle
      console.log(err);
      message.error(`Submit failure: please check console log for more info`)
    }
  };

  const tabs: TabsProps["items"] = [
    {
      key: "IP",
      label: (
        <div style={{ width: "30vw", textAlign: "center" }}>In Progress</div>
      ),
      children: (
        <VisaListIP datasource={managedVisaStatusMock} columns={columnsIP} />
      ),
    },
    {
      key: "All",
      label: <div style={{ width: "30vw", textAlign: "center" }}>All</div>,
      children: (
        <VisaListAll
          datasource={managedVisaStatusMock}
          columns={baseColumns}
          onSearchChange={(e) => console.log(e.target.value)}
        />
      ),
    },
  ];

  return (
    <>
      <Card>
        <Typography.Title
          level={3}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          Employee Visa Status Managment
        </Typography.Title>
        <Divider style={{ margin: "30px 0" }}></Divider>
        <Tabs defaultActiveKey="1" items={tabs}></Tabs>
      </Card>
      <Modal
        title={`Now viewing ${currentFile.documentType}`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <iframe
          src={currentFile.url}
          style={{ width: "100%", height: "55vh" }}
        />
        <Divider></Divider>
        {isRejectProcess && (
          <>
            <Controller
              name="feedback"
              control={control}
              rules={{ required: "Feedback is required" }}
              render={({ field, fieldState }) => (
                <Form.Item
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error?.message}
                >
                  <TextArea
                    {...field}
                    rows={3}
                    placeholder="Provide feedback..."
                    disabled={!isRejectProcess}
                  />
                </Form.Item>
              )}
            />
            <Divider />
            <Space>
              <Button type="primary" onClick={handleReject}>
                Submit
              </Button>
              <Button onClick={() => setIsRejectProcess(false)}>Cancel</Button>
            </Space>
          </>
        )}
        {!isRejectProcess && (
          <Space>
            <Button type="primary" onClick={handleAccept}>
              Approve
            </Button>
            <Button danger onClick={() => setIsRejectProcess(true)}>
              Reject
            </Button>
          </Space>
        )}
      </Modal>
    </>
  );
};

export default VisaManage;
