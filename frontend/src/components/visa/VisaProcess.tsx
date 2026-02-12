import {
  Alert,
  Button,
  Divider,
  Result,
  Space,
  Steps,
  Typography,
} from "antd";
import type { DocType, FileStatus } from "../../app/types";
import RHFInput from "../forms/RHF-Input";

type StepStatus = "finish" | "process" | "error" | "wait" | undefined;
type ResultStatus = "success" | "error" | "info";
type StepProp = {
  title: string;
  description: string;
  status: StepStatus;
};

interface processTexts {
  stepDescription: string;
  resultTitle: string;
  resultSubTitle: string;
}
export interface VisaProcessProps {
  docKey: DocType;
  docStatus: FileStatus;
  feedback?: string;
  onSubmit: () => void;
}

const processRecord: Record<FileStatus, processTexts> = {
  PENDING: {
    stepDescription: "Waiting for HR to approve your",
    resultTitle: "Waiting for HR to approve your document",
    resultSubTitle: "Please be patient and check back later",
  },
  REJECTED: {
    stepDescription: "Your submission was rejected",
    resultTitle: "Your submission was rejected",
    resultSubTitle: "Check the feedback below and resubmit document(s)",
  },
  APPROVED: {
    stepDescription: "Please upload a copy of your",
    resultTitle: "Congrats, your submission was accepted",
    resultSubTitle: "Follow the instruction below to continue",
  },
  UNSUBMIT: {
    stepDescription: "Locked until previous step approved",
    resultTitle: "",
    resultSubTitle: "",
  },
};

const docConfigRecord: Record<DocType, { title: string; next: string }> = {
  OPT: { title: "OPT Receipt", next: "OPT EAD" },
  EAD: { title: "OPT EAD", next: "I-983" },
  I983: { title: "I-983", next: "I-20" },
  I20: { title: "I-20", next: "" },
};

// TODO truly download file (from frontend?)
const emptyTemplateURL = "";
const sampleTemplateURL = "";

const VisaProcess: React.FC<VisaProcessProps> = ({
  docKey,
  docStatus,
  feedback,
  onSubmit
}) => {
  const currIndex = Object.keys(docConfigRecord).findIndex(
    (key) => key === docKey,
  );
  const steps = Object.values(docConfigRecord);
  // TODO maybe extract this too
  const currResultStatus: ResultStatus =
    docStatus === "APPROVED"
      ? "success"
      : docStatus === "REJECTED"
        ? "error"
        : "info";

  const items: StepProp[] = steps.map((step, index) => {
    let description = `${processRecord["UNSUBMIT"].stepDescription}`;
    let status: StepStatus = "wait";
    if (currIndex > index) {
      description = `${processRecord["APPROVED"].stepDescription} ${step.next}`;
      status = "finish";
    } else if (currIndex === index) {
      if (docStatus === "PENDING") {
        description = `${processRecord["PENDING"].stepDescription} ${step.title}`;
        status = "process";
      } else if (docStatus === "REJECTED") {
        description = `${processRecord["REJECTED"].stepDescription}`;
        status = "error";
      } else {
        description = `${processRecord["APPROVED"].stepDescription} ${step.next}`;
        status = "finish";
      }
    }
    return {
      title: step.title,
      description,
      status,
    };
  });

  return (
    <>
      <div>
        <Steps orientation="vertical" current={currIndex} items={items} />
        <Divider></Divider>
        <Result
          status={currResultStatus}
          title={processRecord[docStatus].resultTitle}
          subTitle={processRecord[docStatus].resultSubTitle}
        >
          {(docStatus !== "PENDING" || docKey === "I20") && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* TODO handle long feedback & further dismantle */}
              {docStatus === "REJECTED" ? (
                <>
                  <Alert
                    type="error"
                    showIcon
                    description={
                      <>
                        <Typography.Text strong>
                          Resubmit your {docConfigRecord[docKey].title} below
                        </Typography.Text>
                        {feedback && (
                          <>
                            <br />
                            <Typography.Text type="secondary">
                              HR Feedback:
                            </Typography.Text>
                            <br />
                            <Typography.Text>{feedback}</Typography.Text>
                          </>
                        )}
                      </>
                    }
                  />
                </>
              ) : (
                <Alert
                  type="info"
                  showIcon
                  description={items[currIndex].description}
                />
              )}

              {(docKey === 'EAD' && docStatus === 'APPROVED') && (
                <Space>
                  <Button href={emptyTemplateURL} target="_blank" type="link">
                    Download Empty I-983 Form
                  </Button>
                  <Button href={sampleTemplateURL} target="_blank" type="link">
                    Download Sample I-983 Form
                  </Button>
                </Space>
              )}

              <Space.Compact>
                {/* <Input placeholder="Document Url" /> */}
                <RHFInput name='url'/>
                <Button type="primary" onClick={onSubmit}>
                  {docStatus === "REJECTED" ? "Resubmit" : "Upload"}
                </Button>
              </Space.Compact>
            </div>
          )}
        </Result>
      </div>
    </>
  );
};

export default VisaProcess;
