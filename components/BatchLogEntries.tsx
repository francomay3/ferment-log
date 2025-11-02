import {
  Batch,
  LogEntry,
  LogEntryIngredient,
  LogEntryMeasurement,
  useDeleteLogEntry,
  useLogEntries,
  useLogEntryIngredients,
  useLogEntryMeasurements,
  useRefinedIngredients,
  useRefinedMeasurements,
} from "@/lib/db-context";
import { format } from "date-fns";
import { Card } from "./ui/card";
import { Fab, FabIcon } from "./ui/fab";
import { Heading } from "./ui/heading";
import { TrashIcon } from "./ui/icon";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const IngredientList = ({
  ingredients,
}: {
  ingredients: LogEntryIngredient[];
}) => {
  const refinedIngredients = useRefinedIngredients(ingredients);

  if (refinedIngredients.length === 0) {
    return null;
  }

  return (
    <VStack space="xs">
      <Text className="font-bold">Ingredients</Text>
      {refinedIngredients.map((ingredient) => (
        <Text key={ingredient.id}>
          {ingredient.name} {ingredient.amount} {ingredient.unit}
        </Text>
      ))}
    </VStack>
  );
};

const MeasurementList = ({
  measurements,
}: {
  measurements: LogEntryMeasurement[];
}) => {
  const refinedMeasurements = useRefinedMeasurements(measurements);

  if (measurements.length === 0) {
    return null;
  }

  return (
    <VStack space="xs">
      <Text className="font-bold">Measurements</Text>
      {refinedMeasurements.map((measurement) => (
        <Text key={measurement.id}>
          {measurement.name} {measurement.value} {measurement.unit}
        </Text>
      ))}
    </VStack>
  );
};

const LogEntryCard = ({ entry }: { entry: LogEntry }) => {
  const deleteLogEntry = useDeleteLogEntry();
  const ingredients = useLogEntryIngredients(entry.id);
  const measurements = useLogEntryMeasurements(entry.id);

  const handleDelete = () => {
    deleteLogEntry(entry.id);
  };

  return (
    <Card key={entry.id} variant="outline" size="md">
      <VStack space="xs">
        <Text size="sm" className="text-typography-500">
          {format(new Date(entry.occurredAt), "MMM dd, yyyy 'at' HH:mm")}
        </Text>
        <Text>{entry.notes}</Text>
        <IngredientList ingredients={ingredients} />
        <MeasurementList measurements={measurements} />
      </VStack>
      <Fab onPress={handleDelete} size="sm">
        <FabIcon as={TrashIcon} />
      </Fab>
    </Card>
  );
};

const BatchLogEntries = ({ batch }: { batch: Batch }) => {
  const logEntries = useLogEntries(batch.id);

  return (
    <>
      <VStack space="md">
        <Heading size="lg">Log Entries</Heading>
        <VStack space="sm">
          {logEntries.map((entry) => (
            <LogEntryCard key={entry.id} entry={entry} />
          ))}
          {logEntries.length === 0 && (
            <Text className="text-typography-500">No log entries yet.</Text>
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default BatchLogEntries;
