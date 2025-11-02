import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function BatchesLayout() {
  const colors = useThemeColor();
  const { colorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: colorScheme === "dark" ? "dark" : "light",
        headerStyle: { backgroundColor: colors["--color-primary-500"] },
        headerTitleStyle: { color: colors["--color-typography-50"] },
        headerTintColor: colors["--color-typography-50"],
      }}
    >
      <Stack.Screen name="index" options={{ title: "Batches" }} />
      <Stack.Screen
        name="[batchId]"
        options={{
          headerShown: true,
          title: "Batch Details",
        }}
      />
    </Stack>
  );
}
