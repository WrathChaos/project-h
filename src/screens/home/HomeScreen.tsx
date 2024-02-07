import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
/**
 * ? Local Imports
 */
import createStyles from "./HomeScreen.style";
/**
 * ? Shared Imports
 */
import Text from "@shared-components/text-wrapper/TextWrapper";
import useHealthKit from "@services/hooks/useHealthKit";
import { vmin } from "@freakycoder/react-native-helpers";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { steps } = useHealthKit();

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderSteps = () => (
    <View>
      <Text bold h2>
        Steps
      </Text>
      <Text bold h1 color={colors.white}>
        {steps}
      </Text>
    </View>
  );

  const renderContent = () => (
    <View style={{ marginTop: vmin * 10 }}>{renderSteps()}</View>
  );

  return (
    <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
  );
};

export default HomeScreen;
