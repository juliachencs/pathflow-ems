import { Button, Divider, Form, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type SendEmailModalProps = {
  open: boolean;
  title?: string;
  viewMode?: boolean;
  onCancel: () => void;
  onAccept: () => void;
  onReject: (feedback: string) => void;
  child: React.ReactNode;
};

const ReviewModal: React.FC<SendEmailModalProps> = ({
  open,
  title,
  viewMode = false,
  onCancel,
  onAccept,
  onReject,
  child,
}) => {
  const [isRejectProcess, setIsRejectProcess] = useState(false);
  const { reset, trigger, getValues, control } = useForm<{ feedback: string }>({
    defaultValues: { feedback: "" },
  });
  const handleAccept = async () => onAccept();

  const handleReject = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    const feedback = getValues().feedback;
    reset();
    setIsRejectProcess(false);
    return onReject(feedback);
  };
  // TODO styling later
  return (
    <Modal
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onCancel={onCancel}
      footer={null}
      style={{minWidth: '60vw'}}
    >
      <Divider />
      <div style={{margin: '20px 0', padding: '20px'}}>{child}</div>

      {(!viewMode && isRejectProcess) && (
        <>
          <Controller
            name="feedback"
            control={control}
            rules={{ required: "Feedback is required" }}
            render={({ field, fieldState }) => (
              <Form.Item
                validateStatus={fieldState.error ? "error" : ""}
                help={fieldState.error?.message}
              >
                <TextArea
                  {...field}
                  rows={3}
                  placeholder="Provide feedback..."
                  disabled={!isRejectProcess}
                />
              </Form.Item>
            )}
          />
          <Divider />
          <Space>
            <Button type="primary" onClick={handleReject}>
              Submit
            </Button>
            <Button onClick={() => setIsRejectProcess(false)}>Cancel</Button>
          </Space>
        </>
      )}
      {(!viewMode && !isRejectProcess) && (
        <Space>
          <Button type="primary" onClick={handleAccept}>
            Approve
          </Button>
          <Button danger onClick={() => setIsRejectProcess(true)}>
            Reject
          </Button>
        </Space>
      )}
    </Modal>
  );
};

export default ReviewModal;
