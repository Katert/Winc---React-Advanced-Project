// Components
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export const EventModal = ({
  children,
  modalTitle,
  isOpen,
  onOpen,
  onClose,
  hideButtons,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {hideButtons ? null : (
            <>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Proceed
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
