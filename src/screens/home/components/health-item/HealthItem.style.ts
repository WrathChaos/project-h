import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import { vmin } from "@freakycoder/react-native-helpers";

export default (theme: Theme) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      marginTop: vmin * 5,
      backgroundColor: colors.background,
      flexDirection: "row",
    },
    iconContainer: {
      paddingRight: vmin * 3,
    },
    valueTextStyle: {
      fontSize: vmin * 10,
    },
  });
};
