import { Card, Divider, message } from "antd";
import Title from "antd/es/typography/Title";
// import type { FileStatus, VisaDocuments, VisaStatus } from "../../app/types";
// import type { DocType } from "../../app/types";
import VisaProcess from "../../components/visa/VisaProcess";
import VisaCompleted from "../../components/visa/VisaCompleted";
import VisaNotRequired from "../../components/visa/VisaNotRequired";
import { FormProvider, useForm } from "react-hook-form";
import { visaSchema, type visaFormValues } from "../../app/schema/visaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import {
  fetchUserVisa,
  submitUserVisaDoc,
  type UserVisaPayload,
} from "../../features/visa/visaSlice";
import { useEffect } from "react";

// const mockData: {
//   key: DocType | null;
//   status: FileStatus | null;
//   visaStatus: VisaStatus | null;
//   feedback: string | undefined;
//   userDocuments: VisaDocuments | undefined;
// } = {
//   key: "EAD",
//   status: "APPROVED",
//   visaStatus: "PROGRESS",
//   feedback: "Document too blur",
//   userDocuments: {
//     OPT: "abc",
//     EAD: "def",
//     I983: "ghi",
//     I20: "jkl",
//   },
// };

const MyVisa: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { key, status, visaStatus, feedback, userDocuments } = useSelector(
    (state: RootState) => state.visa,
  );

  useEffect(() => {
    dispatch(fetchUserVisa())
      .unwrap()
      .catch((err) => console.log(err));
  }, [dispatch]);

  const methods = useForm<visaFormValues>({
    resolver: zodResolver(visaSchema),
  });

  const onSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    const docUrl = methods.getValues();
    console.log(docUrl);
    try {
      if (!key) throw new Error("missing key from visa state");
      const payload: UserVisaPayload = {
        payload: {
          documentType: key,
          url: docUrl.url,
        },
      };
      await dispatch(submitUserVisaDoc(payload)).unwrap();
      message.success("Success!", 3);
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  };

  return (
    <>
      {/* TODO fix styling */}
      <Card
        style={{
          padding: "0 80px 30px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Title
          level={3}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          My Visa Status
        </Title>
        <Divider></Divider>
        {visaStatus === "PROGRESS" &&
          key &&
          status && (
            <FormProvider {...methods}>
              <VisaProcess
                docKey={key}
                docStatus={status}
                feedback={feedback}
                onSubmit={onSubmit}
              />
            </FormProvider>
          )}
        {visaStatus === "FINISHED" && (
          <VisaCompleted docPack={userDocuments} />
        )}
        {(visaStatus === "NA" || visaStatus === "NR") && (
          <VisaNotRequired />
        )}
      </Card>
    </>
  );
};

export default MyVisa;
