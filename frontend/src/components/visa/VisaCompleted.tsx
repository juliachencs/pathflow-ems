import { SmileOutlined } from "@ant-design/icons";
import { Divider, Result } from "antd";
import UploadedDocs, {
  type UploadedDoc,
} from "../profile/components/UploadedDocs";
import type { VisaDocuments } from "../../app/types";

interface VisaCompletedProps {
  documents?: VisaDocuments;
}

const VisaCompleted: React.FC<VisaCompletedProps> = ({ documents }) => {
  let docPack: UploadedDoc[] = [];
  if (documents) {
    docPack = [
      {
        label: "OPT Receipt",
        url: documents.OPT,
      },
      {
        label: "EAD Card",
        url: documents.EAD,
      },
      {
        label: "I-983 Form",
        url: documents.I983,
      },
      {
        label: "I-20 Form",
        url: documents.I20,
      },
    ];
  }

  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Great, you have completed all the operations!"
        subTitle="Please contact HR if you have any question about your visa status or update"
      ></Result>

      {docPack && (
        <>
          <Divider></Divider>
          <UploadedDocs docPack={docPack} title="Uploaded Visa Documents" />
        </>
      )}
    </>
  );
};

export default VisaCompleted;
