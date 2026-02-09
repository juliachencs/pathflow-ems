import { Card, Descriptions } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";
import DocItems from "./DocItems";

const uploadedDocsConfig: UploadedDocConfig<ProfileLayoutProps["values"]>[] = [
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

const UploadedDocs: React.FC<ProfileLayoutProps> = ({ values }) => {
  return (
    <Card title="Uploaded Documents">
      <Descriptions column={1} size="small" bordered>
        {uploadedDocsConfig.map((doc, index) => {
          return (
            (doc.getUrl(values)) && (
              <DocItems
                key={index}
                label={doc.label}
                url={doc.getUrl(values)}
              />
            )
          );
        })}
      </Descriptions>
    </Card>
  );
};

export default UploadedDocs;
