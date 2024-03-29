import { StyleSheet } from "react-native";
import { vmin } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: vmin * 5,
      backgroundColor: colors.background,
    },
    content: {
      marginTop: vmin * 6,
    },
    header: {
      fontSize: vmin * 12,
    },
  });
};
