import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "./ui/box";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const hasHeader = headerHeight > 0;
  const marginTop = hasHeader ? 0 : insets.top;

  return (
    <Box className="flex-1">
      <Box style={{ height: marginTop }} className="bg-primary-500 shadow-lg" />
      <ScrollView>
        <Box className="px-4 py-4">{children}</Box>
      </ScrollView>
    </Box>
  );
};

export default PageContainer;
