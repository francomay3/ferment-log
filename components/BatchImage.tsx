import useDisclosure from "@/hooks/useDisclosure";
import { Batch } from "@/lib/db-context";
import { Pressable } from "react-native";
import AddBatchImageModal from "./AddBatchImageModal";
import { Box } from "./ui/box";
import { Fab, FabIcon } from "./ui/fab";
import { EditIcon } from "./ui/icon";
import { Image } from "./ui/image";

const BatchImage = ({ batch }: { batch: Batch }) => {
  const [
    isBatchImageModalOpen,
    { open: openBatchImageModal, close: closeBatchImageModal },
  ] = useDisclosure(false);

  return (
    <>
      <Pressable onPress={openBatchImageModal}>
        <Box>
          <Image
            source={{ uri: batch?.image ?? "" }}
            className="w-24 h-24 rounded-full"
            alt={batch?.name}
          />
          <Fab className="bottom-0 right-0" size="sm">
            <FabIcon as={EditIcon} />
          </Fab>
        </Box>
      </Pressable>
      <AddBatchImageModal
        isOpen={isBatchImageModalOpen}
        onClose={closeBatchImageModal}
        batch={batch}
      />
    </>
  );
};

export default BatchImage;
