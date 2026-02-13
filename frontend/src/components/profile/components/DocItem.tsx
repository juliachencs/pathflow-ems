import { Button, Descriptions, Space } from "antd";
import type React from "react";

type DocItemProps = {
  itemKey: React.Key;
  label: string;
  url?: string;
};

const DocItem: React.FC<DocItemProps> = ({ itemKey, label, url }) => {
  return (
    <Descriptions.Item key={itemKey} label={label}>
      <Space size="middle">
        <Button type="link" onClick={() => window.open(url, "_blank")}>
          Preview
        </Button>
        {/* TODO& Make this downloadable */}
        <Button type="link" href={url} target="_blank">
          Download
        </Button>
      </Space>
    </Descriptions.Item>
  );
};

export default DocItem;
