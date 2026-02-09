import { Button, Card, Descriptions, Space } from "antd";
import type { ProfileLayoutProps } from "../ProfileLayout";

const UploadedDocs: React.FC<ProfileLayoutProps> = ({ values }) => {
  //TODO Make it fully reusable
  return (
    <Card title="Uploaded Documents">
      <Descriptions column={1} size="small" bordered>
        {values.profileImage && (
          <Descriptions.Item label="Profile Picture">
            <Space size="middle">
              <Button
                type="link"
                onClick={() => window.open(values.profileImage, "_blank")}
              >
                Preview
              </Button>
              <Button type="link" href={values.profileImage}>
                Download
              </Button>
            </Space>
          </Descriptions.Item>
        )}

        {values.visaDocuments?.OPT && (
          <Descriptions.Item label="OPT Receipt">
            <Space>
              <Button
                type="link"
                onClick={() => window.open(values.visaDocuments?.OPT, "_blank")}
              >
                Preview
              </Button>
              <Button type="link" href={values.visaDocuments?.OPT}>
                Download
              </Button>
            </Space>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  );
};

export default UploadedDocs;
