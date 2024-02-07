import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";

export default (theme: Theme) => {
  const { colors } = theme;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
};
