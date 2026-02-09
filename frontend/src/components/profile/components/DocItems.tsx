import { Button, Descriptions, Space } from "antd";

type DocItemPros = {
  label: string;
  url?: string;
};

const DocItems: React.FC<DocItemPros> = ({ label, url }) => {
  return (
    <Descriptions.Item label={label}>
      <Space size="middle">
        <Button type="link" onClick={() => window.open(url, "_blank")}>
          Preview
        </Button>
        {/* TODO Make this downloadable */}
        <Button type="link" href={url}>
          Download
        </Button>
      </Space>
    </Descriptions.Item>
  );
};

export default DocItems;
