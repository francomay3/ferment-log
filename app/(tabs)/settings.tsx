import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useColorModeStore } from "@/lib/global-store";

export default function Settings() {
  const toggleColorMode = useColorModeStore((s) => s.toggleColorMode);
  const colorMode = useColorModeStore((s) => s.colorMode);

  return (
    <Center className="flex-1 p-4">
      <HStack className="justify-between w-full items-center">
        <Text className="text-lg font-bold">Dark Mode</Text>
        <Switch value={colorMode === "dark"} onValueChange={toggleColorMode} />
      </HStack>
    </Center>
  );
}
