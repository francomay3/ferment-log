import {
  darkVars,
  lightVars,
  ThemeColor,
} from "@/components/ui/gluestack-ui-provider/config";
import { useColorScheme } from "nativewind";

export const useThemeColor = () => {
  const { colorScheme } = useColorScheme();
  const vars = colorScheme === "dark" ? darkVars : lightVars;

  const varsInRgb = Object.fromEntries(
    Object.entries(vars).map(([key, value]) => [key, `rgb(${value})`])
  );

  return varsInRgb as Record<ThemeColor, string>;
};
