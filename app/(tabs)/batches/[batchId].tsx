import AddLogEntryModal from "@/components/AddLogEntryModal";
import BatchImage from "@/components/BatchImage";
import BatchInfoTable from "@/components/BatchInfoTable";
import BatchLogEntries from "@/components/BatchLogEntries";
import PageContainer from "@/components/PageContainer";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AddIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useDisclosure from "@/hooks/useDisclosure";
import { useBatch } from "@/lib/db-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

const BatchDetails = () => {
  const { batchId } = useLocalSearchParams<{ batchId: string }>();
  const batch = useBatch(batchId ? parseInt(batchId, 10) : null);
  const navigation = useNavigation();
  const [
    isAddLogEntryModalOpen,
    { open: openAddLogEntryModal, close: closeAddLogEntryModal },
  ] = useDisclosure(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: batch?.name || "Batch Details",
    });
  }, [navigation, batch?.name]);

  if (!batch) {
    return (
      <PageContainer>
        <Center>
          <Text>Batch not found</Text>
        </Center>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer>
        <VStack space="lg" className="pb-20">
          <Heading size="2xl">{batch?.name}</Heading>
          <HStack className="items-center gap-4">
            <BatchImage batch={batch} />
            <Text className="flex-1">{batch?.description}</Text>
          </HStack>
          <BatchInfoTable batch={batch} />
          <Divider className="my-4" />
          <BatchLogEntries batch={batch} />
        </VStack>
      </PageContainer>
      <Fab onPress={openAddLogEntryModal}>
        <FabIcon as={AddIcon} />
        <FabLabel>Add Log Entry</FabLabel>
      </Fab>
      <AddLogEntryModal
        isOpen={isAddLogEntryModalOpen}
        onClose={closeAddLogEntryModal}
        batch={batch}
      />
    </>
  );
};

export default BatchDetails;
