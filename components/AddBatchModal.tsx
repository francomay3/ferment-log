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
import * as db from "@/lib/db-context";
import { faker } from "@faker-js/faker";

const AddBatchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const insertBatch = db.useInsertBatch();

  const handleAddBatch = async () => {
    const initialVolume = faker.number.int({
      min: 10,
      max: 50,
    });
    insertBatch({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      initialVolume,
      finalVolume: Math.floor(initialVolume * 0.8),
      volumeUnit: "L",
      rating: faker.number.int({ min: 1, max: 5 }),
      abv: faker.number.float({ min: 5, max: 15, fractionDigits: 1 }),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add Batch</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>this is where the fields for the batch will go.</Text>
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
          <Button onPress={handleAddBatch}>
            <ButtonText>Add Batch</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBatchModal;
