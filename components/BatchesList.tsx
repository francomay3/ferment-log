import { Batch, useDeleteBatch } from "@/lib/db-context";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const BatchCard = ({ batch }: { batch: Batch }) => {
  const deleteBatch = useDeleteBatch();

  return (
    <Card variant="elevated" className="flex-row p-0 h-40">
      {batch.image && (
        <Box className="w-32 border border-transparent rounded-l-md overflow-hidden">
          <Image
            source={{ uri: batch.image }}
            className="w-full h-full object-contain"
          />
        </Box>
      )}
      <VStack className="p-4 flex-1">
        <Heading>{batch.name}</Heading>
        <Text numberOfLines={3} className="line-clamp-3">
          {batch.description}
        </Text>
        <HStack className="justify-between items-end flex-1">
          <VStack>
            <Text size="sm" className="text-typography-500">
              Initial Volume: {batch.initialVolume} {batch.volumeUnit}
            </Text>
            <Text size="sm" className="text-typography-500">
              ABV: {batch.abv.toFixed(1)} %
            </Text>
          </VStack>
          <Box>
            <Text>rating component here</Text>
          </Box>
        </HStack>
      </VStack>
      {/* <Button
          onPress={() => {
            deleteBatch(batch.id);
          }}
        >
          <ButtonIcon as={TrashIcon} />
        </Button> */}
    </Card>
  );
};

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
    <Box className="p-4 pb-20">
      <Heading>{title}</Heading>
      <VStack space="md">
        {batches.map((batch) => (
          <BatchCard key={batch.id} batch={batch} />
        ))}
      </VStack>
    </Box>
  );
};

export default BatchesList;
