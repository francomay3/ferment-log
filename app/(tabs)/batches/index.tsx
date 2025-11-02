import AddBatchModal from "@/components/AddBatchModal";
import BatchCard from "@/components/BatchCard";
import PageContainer from "@/components/PageContainer";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { AddIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import useDisclosure from "@/hooks/useDisclosure";
import type { Batch } from "@/lib/db-context";
import { useBatches } from "@/lib/db-context";

const BatchesList = ({
  title,
  batches,
}: {
  title: string;
  batches: Batch[];
}) => {
  if (batches.length === 0) {
    return null;
  }
  return (
    // <Box className="p-4 pb-20">
    <Box>
      <Heading>{title}</Heading>
      <VStack space="md">
        {batches.map((batch) => (
          <BatchCard key={batch.id} batch={batch} />
        ))}
      </VStack>
    </Box>
  );
};

export default function Batches() {
  const batches = useBatches();

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
      <PageContainer>
        <BatchesList title="Archived Batches" batches={archivedBatches} />
        <BatchesList title="Active Batches" batches={activeBatches} />
      </PageContainer>
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
