import { Batch, useLogEntries } from "@/lib/db-context";
import { format } from "date-fns";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const BatchLogEntries = ({ batch }: { batch: Batch }) => {
  const logEntries = useLogEntries(batch.id);

  if (logEntries.length === 0) {
    return (
      <VStack space="sm">
        <Heading size="lg">Log Entries</Heading>
        <Text className="text-typography-500">No log entries yet.</Text>
      </VStack>
    );
  }

  return (
    <VStack space="md">
      <Heading size="lg">Log Entries</Heading>
      <VStack space="sm">
        {logEntries.map((entry) => (
          <Card key={entry.id} variant="outline" size="md">
            <VStack space="xs">
              <Text size="sm" className="text-typography-500">
                {format(new Date(entry.occurredAt), "MMM dd, yyyy 'at' HH:mm")}
              </Text>
              {<Text>{JSON.stringify(entry, null, 2)}</Text>}
            </VStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
};

export default BatchLogEntries;
