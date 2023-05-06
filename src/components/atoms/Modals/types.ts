export interface ConfirmModalProps {
  onCancel?: () => void;
  onConfirm: () => void;
  text: string;
  okButtonText?: string;
  cancelButtonText?: string;
}
