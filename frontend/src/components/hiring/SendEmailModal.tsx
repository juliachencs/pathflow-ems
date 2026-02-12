import { Button, Modal, Space } from "antd";
import RHFInput from "../forms/RHF-Input";
import { useFormContext } from "react-hook-form";

type SendEmailModalProps = {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const { control } = useFormContext();
  // TODO styling later
  return (
    <Modal
      title={`Generate Registration Token`}
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <div style={{marginTop: '30px'}}>
        <RHFInput
          name="name"
          control={control}
          label="Name"
          required
          placeholder="e.g. John Smith"
        />
        <RHFInput
          name="email"
          control={control}
          label="Email"
          required
          placeholder="e.g. example@gmail.com"
        />
        <Space>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </div>
    </Modal>
  );
};

export default SendEmailModal;
