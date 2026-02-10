import { Button, Card, Descriptions, Space } from "antd";
import type { VisaDocuments } from "../../../app/types";

const uploadedDocsConfig: UploadedDocConfig<UploadedDocsProps["docPack"]>[] = [
  {
    label: "Profile Picture",
    getUrl: (v) => v.profileImage,
  },
  {
    label: "OPT Receipt",
    getUrl: (v) => v.visaDocuments?.OPT,
  },
  {
    label: "EAD Card",
    getUrl: (v) => v.visaDocuments?.EAD,
  },
  {
    label: "I-983 Form",
    getUrl: (v) => v.visaDocuments?.I983,
  },
  {
    label: "I-20 Form",
    getUrl: (v) => v.visaDocuments?.I20,
  },
];

type UploadedDocConfig<T> = {
  label: string;
  getUrl: (values: T) => string | undefined;
};

interface UploadedDocsProps {
  docPack: {
    profileImage?: string;
    visaDocuments?: VisaDocuments;
  };
  bordered?: boolean;
  title?: string;
}

const UploadedDocs: React.FC<UploadedDocsProps> = ({
  docPack,
  title = "Uploaded Documents",
}) => {
  return (
    <Card title={title}>
      <Descriptions column={1} size="small" bordered>
        {uploadedDocsConfig.map((doc, index) => {
          const url = doc.getUrl(docPack);
          if (url) {
            // for some reason this reusable component just continiously not rendering
            // return (<DocItem itemKey={index} label={doc.label} url={url} />);
            return (
              <Descriptions.Item key={index} label={doc.label}>
                <Space size="middle">
                  <Button
                    type="link"
                    onClick={() => window.open(url, "_blank")}
                  >
                    Preview
                  </Button>
                  {/* TODO Make this downloadable */}
                  <Button type="link" href={url}>
                    Download
                  </Button>
                </Space>
              </Descriptions.Item>
            );
          }
        })}
      </Descriptions>
    </Card>
  );
};

export default UploadedDocs;
