import { SmileOutlined } from "@ant-design/icons";
import { Divider, Result } from "antd";
import UploadedDocs, {
  type UploadedDoc,
} from "../profile/components/UploadedDocs";
import type { IVisaDoc } from "../../app/types";

interface VisaCompletedProps {
  documents?: IVisaDoc[];
}

const VisaCompleted: React.FC<VisaCompletedProps> = ({ documents }) => {
  const docPack: UploadedDoc[] = [];
  if (documents) {
    documents.map((doc) => {
      docPack.push({
        label: doc.documentType,
        url: doc.url
      })
    })
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
