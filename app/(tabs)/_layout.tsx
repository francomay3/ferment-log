import { useThemeColor } from "@/hooks/useThemeColor";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { Box } from "../../components/ui/box";
import { Center } from "../../components/ui/center";
import { HStack } from "../../components/ui/hstack";
import { Text } from "../../components/ui/text";

function BatchesIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 640 640"
      style={{ marginBottom: -3 }}
    >
      <Path
        d="M192.6 89.7C195.6 74.8 208.7 64 224 64L416 64C431.3 64 444.4 74.8 447.4 89.7L476.8 237C478.9 247.5 480 258.2 480 269L480 272C480 349.4 425 414 352 428.8L352 544L416 544C433.7 544 448 558.3 448 576C448 593.7 433.7 608 416 608L224 608C206.3 608 192 593.7 192 576C192 558.3 206.3 544 224 544L288 544L288 428.8C215 414 160 349.4 160 272L160 269C160 258.3 161.1 247.6 163.2 237L192.6 89.7zM237.4 192L402.5 192L389.7 128L250.2 128L237.4 192z"
        fill={color}
      />
    </Svg>
  );
}

function SettingsIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 640 640"
      style={{ marginBottom: -3 }}
    >
      <Path
        d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"
        fill={color}
      />
    </Svg>
  );
}

function ToolsIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 640 640"
      style={{ marginBottom: -3 }}
    >
      <Path
        d="M246.9 82.3L271 67.8C292.6 54.8 317.3 48 342.5 48C379.3 48 414.7 62.6 440.7 88.7L504.6 152.6C519.6 167.6 528 188 528 209.2L528 240.1L547.7 259.8L547.7 259.8C563.3 244.2 588.6 244.2 604.3 259.8C620 275.4 619.9 300.7 604.3 316.4L540.3 380.4C524.7 396 499.4 396 483.7 380.4C468 364.8 468.1 339.5 483.7 323.8L464 304L433.1 304C411.9 304 391.5 295.6 376.5 280.6L327.4 231.5C312.4 216.5 304 196.1 304 174.9L304 162.2C304 151 298.1 140.5 288.5 134.8L246.9 109.8C236.5 103.6 236.5 88.6 246.9 82.4zM50.7 466.7L272.8 244.6L363.3 335.1L141.2 557.2C116.2 582.2 75.7 582.2 50.7 557.2C25.7 532.2 25.7 491.7 50.7 466.7z"
        fill={color}
      />
    </Svg>
  );
}

function TabButton({ title, Icon, isFocused, ...props }: any) {
  const themeColors = useThemeColor();

  return (
    <Pressable {...props} style={{ flex: 1 }}>
      <Center className="py-3">
        <Box className="mb-1 mb-2">
          <Icon
            color={
              isFocused
                ? themeColors["--color-typography-50"]
                : themeColors["--color-typography-400"]
            }
            size={18}
          />
        </Box>
        <Text
          className={isFocused ? "text-typography-50" : "text-typography-400"}
        >
          {title}
        </Text>
      </Center>
    </Pressable>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs>
      <TabSlot />
      <Box
        className="bg-primary-500 shadow-lg"
        style={{ paddingBottom: insets.bottom }}
      >
        <HStack className="flex-row items-center">
          <TabTrigger name="batches" href="/(tabs)/batches" asChild>
            <TabButton title="Batches" Icon={BatchesIcon} />
          </TabTrigger>
          <TabTrigger name="tools" href="/(tabs)/tools" asChild>
            <TabButton title="Tools" Icon={ToolsIcon} />
          </TabTrigger>
          <TabTrigger name="settings" href="/(tabs)/settings" asChild>
            <TabButton title="Settings" Icon={SettingsIcon} />
          </TabTrigger>
        </HStack>
      </Box>

      {/* Hidden TabList to declare routes */}
      <TabList style={{ display: "none" }}>
        <TabTrigger name="batches" href="/(tabs)/batches" />
        <TabTrigger name="tools" href="/(tabs)/tools" />
        <TabTrigger name="settings" href="/(tabs)/settings" />
      </TabList>
    </Tabs>
  );
}
