import AddBatchModal from "@/components/AddBatchModal";
import BatchesList from "@/components/BatchesList";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import useDisclosure from "@/hooks/useDisclosure";
import type { Batch } from "@/lib/db-context";
import { useBatches } from "@/lib/db-context";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Temp() {
  const batches = useBatches();
  const insets = useSafeAreaInsets();

  const { archivedBatches, activeBatches } = batches.reduce<{
    archivedBatches: Batch[];
    activeBatches: Batch[];
  }>(
    (acc, batch) => {
      if (batch.archived) {
        acc.archivedBatches.push(batch);
      } else {
        acc.activeBatches.push(batch);
      }
      return acc;
    },
    { archivedBatches: [], activeBatches: [] }
  );

  const [
    isAddBatchModalOpen,
    { open: openAddBatchModal, close: closeAddBatchModal },
  ] = useDisclosure(false);

  return (
    <>
      <Box className="flex-1" style={{ marginTop: insets.top }}>
        <ScrollView>
          <BatchesList title="Archived Batches" batches={archivedBatches} />
          <BatchesList title="Active Batches" batches={activeBatches} />
        </ScrollView>
      </Box>
      <Fab onPress={openAddBatchModal}>
        <FabIcon as={AddIcon} />
        <FabLabel>Add Batch</FabLabel>
      </Fab>
      <AddBatchModal
        isOpen={isAddBatchModalOpen}
        onClose={closeAddBatchModal}
      />
    </>
  );
}
