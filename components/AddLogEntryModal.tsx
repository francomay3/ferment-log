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
import {
  Batch,
  useIngredients,
  useInsertLogEntry,
  useMeasurementTypes,
} from "@/lib/db-context";
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
  const ingredients = useIngredients();
  const measurementTypes = useMeasurementTypes();

  const handleAddLogEntry = async () => {
    const newIngredients = [
      {
        ingredientId: faker.helpers.arrayElement(ingredients).id,
        amount: faker.number.int({ min: 1, max: 100 }),
      },
      {
        ingredientId: faker.helpers.arrayElement(ingredients).id,
        amount: faker.number.int({ min: 1, max: 100 }),
      },
    ];

    insertLogEntry({
      entry: {
        batchId: batch.id,
        notes: faker.lorem.sentence(),
      },
      ingredients: newIngredients,
      measurements: [
        {
          measurementTypeId: faker.helpers.arrayElement(measurementTypes).id,
          value: faker.number.int({ min: 1, max: 100 }),
        },
      ],
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
