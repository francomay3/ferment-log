import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import * as db from "@/lib/db-context";

export default function Temp() {
  const batches = db.useBatches();
  const insertBatch = db.useInsertBatch();
  const deleteBatch = db.useDeleteBatch();
  
  const BatchesList = batches.map((batch) => (
    <HStack key={batch.id}>
      <Text>{batch.name}</Text>
      <Text>{batch.initialVolume}</Text>
      <Button onPress={() => deleteBatch(batch.id)}>
        <ButtonText>Delete</ButtonText>
      </Button>
    </HStack>
  ));

  return (
    <Center className="flex-1 gap-4 p-6">
      <Button
        onPress={() =>
          insertBatch({
            name: "New Batch",
            initialVolume: Math.floor(Math.random() * 100),
          })
        }
      >
        <ButtonText>Add Batch</ButtonText>
      </Button>
      {BatchesList}
    </Center>
  );
}
