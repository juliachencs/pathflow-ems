import { Result } from "antd";

const VisaNotRequired: React.FC = () => {
  return (
    <Result
      title="Visa Status page is not avaliable for Ctizen/GreenCard Holder"
      subTitle="If you reach this page and are non-citizen, please contact Administator"
    ></Result>
  );
};

export default VisaNotRequired;
