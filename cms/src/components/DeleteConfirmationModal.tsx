import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận xoá",
  message = "Bạn có chắc chắn muốn xoá mục này?",
  confirmText = "Xoá",
  cancelText = "Huỷ"
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={true}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              {cancelText}
            </Button>
            <Button color="danger" onPress={onConfirm}>
              {confirmText}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
} 