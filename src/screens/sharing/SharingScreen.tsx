import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./SharingScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

const SharingScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default SharingScreen;
