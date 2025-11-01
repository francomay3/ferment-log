import { Batch } from "@/lib/db-context";
import BatchCard from "./BatchCard";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";
import { VStack } from "./ui/vstack";

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
