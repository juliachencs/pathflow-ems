import { Button, Card, Descriptions, Space } from "antd";
// import DocItem from "./DocItem";

export type UploadedDoc = {
  label: string;
  url?: string;
};

interface UploadedDocsProps {
  docPack: UploadedDoc[];
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
        {docPack.map((doc, index) => {
          const url = doc.url;
          if (url) {
            // for some reason this reusable component just not rendering, fix it later
            // TODO fix
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
