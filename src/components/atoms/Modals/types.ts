export interface ConfirmModalProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
  onOk: () => void;
  onCancel: () => void;
  isOpen: boolean;
  onClose: () => void;
}
