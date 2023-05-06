import { Modal, VStack, Text, HStack, Button } from "native-base";
import { useState } from "react";
import { ConfirmModalProps } from "./types";

const confirmation = (props: ConfirmModalProps) => {
  const render = () => {
    // const [isVisible, setIsVisible] = useState(true);

    // const handleCancelButton = () => {
    //   setIsVisible(false);
    //   props.onCancel?.();
    // };

    // const handleOkButton = () => {
    //   setIsVisible(false);
    //   props.onConfirm?.();
    // };

    return (
      <Modal isOpen={true}>
        <VStack>
          <Text>Você treinou no dia tal?</Text>
        </VStack>
        <Button.Group>
          <Button>{props.cancelButtonText || "Cancelar"}</Button>
          <Button>{props.okButtonText || "Ok"}</Button>
        </Button.Group>
      </Modal>
    );
  };

  return render();
};

export default confirmation;
