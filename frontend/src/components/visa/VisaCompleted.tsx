import { SmileOutlined } from "@ant-design/icons";
import { Divider, Result } from "antd";
import UploadedDocs from "../profile/components/UploadedDocs";
import type { VisaDocuments } from "../../app/types";

interface VisaCompletedProps {
  docPack?: VisaDocuments;
}

const VisaCompleted: React.FC<VisaCompletedProps> = ({ docPack }) => {
  return (
    <>
      <Result
        icon={<SmileOutlined />}
        title="Great, you have completed all the operations!"
        subTitle='Please contact HR if you have any question about your visa status or update'
      ></Result>

      {docPack && (
        <>
          <Divider></Divider>
          <UploadedDocs
            docPack={{ visaDocuments: docPack }}
            title="Uploaded Visa Documents"
          />
        </>
      )}
    </>
  );
};

export default VisaCompleted;
