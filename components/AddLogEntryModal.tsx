import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Batch, useInsertLogEntry } from "@/lib/db-context";
import { faker } from "@faker-js/faker";

const AddLogEntryModal = ({
  isOpen,
  onClose,
  batch,
}: {
  isOpen: boolean;
  onClose: () => void;
  batch: Batch;
}) => {
  const insertLogEntry = useInsertLogEntry();

  const handleAddLogEntry = async () => {
    insertLogEntry({
      entry: {
        batchId: batch.id,
        notes: faker.lorem.sentence(),
      },
      // ingredients and measurements can be added here when form fields are implemented
      // ingredients: [...],
      // measurements: [...],
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add Log Entry</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>this is where the fields for the log entry will go.</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            className="mr-3"
            onPress={onClose}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={handleAddLogEntry}>
            <ButtonText>Add Log Entry</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddLogEntryModal;
