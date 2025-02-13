import { Modal as AntModal } from "antd";
import React from "react";

type Props = {
  children: React.ReactNode;
  isModalOpen: boolean;
  handleCancel: () => void;
  title: string;
};

const Modal = ({ children, isModalOpen, handleCancel, title }: Props) => {
  return (
    <AntModal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
