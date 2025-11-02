import { useThemeColor } from "@/hooks/useThemeColor";
import { Batch } from "@/lib/db-context";
import { format } from "date-fns";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const BatchCard = ({ batch }: { batch: Batch }) => {
  const colors = useThemeColor();

  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/batches/[batchId]",
      params: { batchId: batch.id },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Card variant="elevated" className="flex-row p-0 h-40">
        {batch.image && (
          <Box className="w-32 border border-transparent rounded-l-md overflow-hidden">
            <Image
              source={{ uri: batch.image }}
              className="w-full h-full object-contain"
              alt={batch.name}
            />
          </Box>
        )}
        <VStack className="p-3 flex-1">
          <HStack className="justify-between items-start flex-1">
            <Heading>{batch.name}</Heading>
            <Text size="sm" className="text-typography-500">
              {format(new Date(batch.createdAt), "MM/dd/yyyy")}
            </Text>
          </HStack>
          <Text numberOfLines={3} className="line-clamp-3">
            {batch.description}
          </Text>
          <HStack className="justify-between items-end flex-1">
            <VStack>
              <Text size="sm" className="text-typography-500">
                Volume: {batch.initialVolume} {batch.volumeUnit}
              </Text>
              <Text size="sm" className="text-typography-500">
                ABV: {batch.abv.toFixed(1)} %
              </Text>
            </VStack>
            <Box>
              <Rating
                type="custom"
                ratingColor={colors["--color-tertiary-500"]}
                ratingBackgroundColor={colors["--color-background-200"]}
                ratingCount={5}
                startingValue={batch.rating ?? 0}
                imageSize={16}
                readonly
                tintColor={colors["--color-background-0"]}
              />
            </Box>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
};

export default BatchCard;
