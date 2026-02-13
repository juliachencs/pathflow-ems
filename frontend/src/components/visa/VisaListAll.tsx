import { Table } from "antd";
import SearchInput from "../forms/SearchInput";
import type { VisaListProps } from "../../pages/visa/VisaManage";
import type { UploadedDoc } from "../profile/components/UploadedDocs";
import UploadedDocs from "../profile/components/UploadedDocs";

type VisaListAllProps = VisaListProps & {
  onSearchChange: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
};

const VisaListAll: React.FC<VisaListAllProps> = ({
  datasource,
  columns,
  onSearchChange,
}) => {
  return (
    <>
      <SearchInput
        placeholder="Search by employee name"
        onChange={onSearchChange}
      />
      {/* rowKey is required!!! */}
      {/* TODO? maybe styling the file extend action */}
      <Table
        rowKey="employeeId"
        columns={columns}
        dataSource={datasource ?? []}
        expandable={{
          expandedRowRender: (record) => {
            const entries = Object.entries(record.files);
            const docPack: UploadedDoc[] = [];
            entries.forEach(([label, url]) => docPack.push({
                label: label,
                url: url,
            }));
            return (<UploadedDocs docPack={docPack} title="Visa Documents"/>);
          },
          rowExpandable: (record) =>
            record.files && Object.values(record.files).some(Boolean),
        }}
      ></Table>
    </>
  );
};

export default VisaListAll;
