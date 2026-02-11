import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import PersonalDetails from "./components/PersonalDetails";
import ReferencePerson from "./components/ReferencePerson";
import EmergencyContact from "./components/EmergencyContact";
import UploadedDocs, { type UploadedDoc } from "./components/UploadedDocs";
import type { IProfileFull } from "../../app/types";

export interface ProfileLayoutProps {
  values: IProfileFull;
  bordered?: boolean;
  editMode?: boolean;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
  editMode = false,
}) => {
  const docPack: UploadedDoc[] = [];

  if (values.profileImage) {
    docPack.push({
      label: "Profile Picture",
      url: values.profileImage,
    });
  }

  if (values.visaDocuments) {
    const visaDocPack = [
      {
        label: "OPT Receipt",
        url: values.visaDocuments?.OPT,
      },
      {
        label: "EAD Card",
        url: values.visaDocuments?.EAD,
      },
      {
        label: "I-983 Form",
        url: values.visaDocuments?.I983,
      },
      {
        label: "I-20 Form",
        url: values.visaDocuments?.I20,
      },
    ];
    docPack.push(...visaDocPack);
  }

  console.log(docPack.length);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <PersonalInfo values={values} bordered={bordered} editMode={editMode} />
        <ContactInfo values={values} bordered={bordered} editMode={editMode} />
        <PersonalDetails
          values={values}
          bordered={bordered}
          editMode={editMode}
        />
        {values.reference && (
          <ReferencePerson values={values} bordered={bordered} />
        )}

        <EmergencyContact
          values={values}
          bordered={bordered}
          editMode={editMode}
        />

        {docPack.length !== 0 && (
          <UploadedDocs docPack={docPack} bordered={bordered} />
        )}
      </div>
    </>
  );
};

export default ProfileLayout;
