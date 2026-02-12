import {
  Button,
  Card,
  Divider,
  message,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  fetchVisaListAll,
  fetchVisaListProgress,
  setSearchKey,
  updateEmployeeVisa,
} from "../../features/empVisa/empVisaSlice";
import ReviewModal from "../../components/ReviewModal";

// const managedVisaStatusMock: IManagedVisaStatus[] = [
//   {
//     employeeId: "emp_001",
//     name: {
//       firstName: "David",
//       lastName: "Chen",
//       preferredName: "Dave",
//     },
//     workAuthorization: {
//       title: "F1 - OPT",
//       startDate: "2025-01-15",
//       endDate: "2025-01-16",
//     },
//     nextStep: "Review OPT document",
//     action: {
//       actionType: "REVIEW",
//       payload: {
//         documentType: "OPT",
//         url: "https://example.com/docs/emp_001_opt.pdf",
//       },
//     },
//     files: {
//       OPT: "https://example.com/docs/emp_001_opt.pdf",
//     },
//   },
//   {
//     employeeId: "emp_002",
//     name: {
//       firstName: "Maria",
//       lastName: "Garcia",
//       middleName: "Elena",
//     },
//     workAuthorization: {
//       title: "F1 - STEM OPT",
//       startDate: "2024-12-21",
//       endDate: "2025-01-31",
//     },
//     nextStep: "Submit I-983 training plan",
//     action: {
//       actionType: "SEND_NOTIFICATION",
//       payload: {
//         documentType: "I983",
//       },
//     },
//     files: {
//       OPT: "https://example.com/docs/emp_002_opt.pdf",
//     },
//   },
//   {
//     employeeId: "emp_003",
//     name: {
//       firstName: "Ravi",
//       lastName: "Patel",
//     },
//     workAuthorization: {
//       title: "H1-B",
//       startDate: "2023-10-01",
//       endDate: "2026-09-30",
//     },
//     nextStep: "Wait for HR approval of EAD",
//     action: {
//       actionType: "REVIEW",
//       payload: {
//         documentType: "EAD",
//         url: "https://example.com/docs/emp_003_ead.pdf",
//       },
//     },
//     files: {
//       EAD: "https://example.com/docs/emp_003_ead.pdf",
//       I20: "https://example.com/docs/emp_003_i20.pdf",
//     },
//   },
//   {
//     employeeId: "emp_004",
//     name: {
//       firstName: "Sophia",
//       lastName: "Kim",
//     },
//     workAuthorization: {
//       title: "F1 - OPT",
//       startDate: "2025-03-01",
//       endDate: "2026-02-28",
//     },
//     nextStep: "Upload EAD document",
//     action: {
//       actionType: "SEND_NOTIFICATION",
//       payload: {
//         documentType: "EAD",
//       },
//     },
//     files: {
//       OPT: "https://example.com/docs/emp_004_opt.pdf",
//       I20: "https://example.com/docs/emp_004_i20.pdf",
//     },
//   },
//   {
//     employeeId: "emp_005",
//     name: {
//       firstName: "Liam",
//       lastName: "Johnson",
//       preferredName: "Lee",
//     },
//     workAuthorization: {
//       title: "F1 - STEM OPT",
//       startDate: "2024-09-15",
//       endDate: "2026-09-14",
//     },
//     nextStep: "Review I-20 document",
//     action: {
//       actionType: "REVIEW",
//       payload: {
//         documentType: "I20",
//         url: "https://example.com/docs/emp_005_i20.pdf",
//       },
//     },
//     files: {
//       OPT: "https://example.com/docs/emp_005_opt.pdf",
//       EAD: "https://example.com/docs/emp_005_ead.pdf",
//       I20: "https://example.com/docs/emp_005_i20.pdf",
//     },
//   },
// ];

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
  const dispatch = useDispatch<AppDispatch>();
  const { visaListAllFiltered, visaListProgress } = useSelector(
    (state: RootState) => state.employeeVisa,
  );
  useEffect(() => {
    dispatch(fetchVisaListAll())
      .unwrap()
      .catch((err) => console.log(err));
    dispatch(fetchVisaListProgress())
      .unwrap()
      .catch((err) => console.log(err));
    // // TODO remove test file
    // dispatch(setDummyVisaList(managedVisaStatusMock));
  }, [dispatch]);

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
      message.error(`Submit failure: please check console for more info`);
    }
  };

  const handleReject = async (feedback: string) => {
    try {
      await dispatch(
        updateEmployeeVisa({
          id: currentFile.employeeId ?? "",
          actionType: "REJECT",
          payload: {
            documentType: currentFile.documentType ?? "I20",
            feedback,
          },
        }),
      ).unwrap();
      handleCancel();
    } catch (err) {
      // TODO handle
      console.log(err);
      message.error(`Submit failure: please check console for more info`);
    }
  };

  const tabs: TabsProps["items"] = [
    {
      key: "IP",
      label: (
        <div style={{ width: "30vw", textAlign: "center" }}>In Progress</div>
      ),
      children: (
        <VisaListIP datasource={visaListProgress} columns={columnsIP} />
      ),
    },
    {
      key: "All",
      label: <div style={{ width: "30vw", textAlign: "center" }}>All</div>,
      children: (
        <VisaListAll
          datasource={visaListAllFiltered}
          columns={baseColumns}
          onSearchChange={(e) => dispatch(setSearchKey(e.target.value))}
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
      <ReviewModal
        open={isModalOpen}
        child={
          <iframe
            style={{ width: "100%", height: "60vh" }}
            src={currentFile.url}
          />
        }
        onCancel={handleCancel}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </>
  );
};

export default VisaManage;
