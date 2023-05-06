// ConfirmModal.tsx
import React from 'react';
import { Modal, Text, Button, HStack } from 'native-base';
import { ConfirmModalProps } from './types';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  content,
  icon,
  onOk,
  onCancel,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          {icon}
          <Text bold fontSize="lg">{title}</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>{content}</Text>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={3}>
            <Button onPress={onOk}>Confirmar</Button>
            <Button onPress={onCancel} variant="ghost">
              Cancelar
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmModal;
