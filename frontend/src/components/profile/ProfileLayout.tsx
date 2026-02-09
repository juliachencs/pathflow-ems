import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import PersonalDetails from "./components/PersonalDetails";
import ReferencePerson from "./components/ReferencePerson";
import EmergencyContact from "./components/EmergencyContact";
import UploadedDocs from "./components/UploadedDocs";
import type { IProfileFull } from "../../app/types";

export interface ProfileLayoutProps {
  values: IProfileFull;
  bordered?: boolean;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  values,
  bordered = false,
}) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <PersonalInfo values={values} bordered={bordered} />
        <ContactInfo values={values} bordered={bordered} />
        <PersonalDetails values={values} bordered={bordered} />
        {values.reference && (
          <ReferencePerson values={values} bordered={bordered} />
        )}
        {values.emergencyContacts && values.emergencyContacts.length > 0 && (
          <EmergencyContact values={values} bordered={bordered} />
        )}

        <UploadedDocs values={values} bordered={bordered} />
      </div>
    </>
  );
};

export default ProfileLayout;
