import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import PersonalDetails from "./components/PersonalDetails";
import ReferencePerson from "./components/ReferencePerson";
import EmergencyContact from "./components/EmergencyContact";
import UploadedDocs, { type UploadedDoc } from "./components/UploadedDocs";
import type { BoardingData, IProfile } from "../../app/types";

export interface ProfileLayoutProps {
  values: IProfile | BoardingData;
  bordered?: boolean;
  editMode?: boolean;
  compactMode?: boolean;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
  editMode = false,
  compactMode = false,
}) => {
  const docPack: UploadedDoc[] = [];
  // Used for load filePack
  if (values.profileImage) {
    docPack.push({
      label: "Profile Picture",
      url: values.profileImage,
    });
  }
  if ("files" in values && values.files) {
    const visaDocPack = [
      {
        label: "OPT Receipt",
        url: values.files.OPT,
      },
      {
        label: "EAD Card",
        url: values.files.EAD,
      },
      {
        label: "I-983 Form",
        url: values.files.I983,
      },
      {
        label: "I-20 Form",
        url: values.files.I20,
      },
    ];
    docPack.push(...visaDocPack);
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <PersonalInfo
          values={values}
          bordered={bordered}
          editMode={editMode}
          compactMode={compactMode}
        />
        <ContactInfo values={values} bordered={bordered} editMode={editMode} />
        <PersonalDetails
          values={values}
          bordered={bordered}
          editMode={editMode}
        />
        {values.reference.person && (
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
