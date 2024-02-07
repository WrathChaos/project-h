import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./HealthItem.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { vmin } from "@freakycoder/react-native-helpers";

interface HealthItemProps {
  title: string;
  value: string | number;
  iconName: string;
  iconType: IconType;
  style?: StyleProp<ViewStyle>;
}

const HealthItem: React.FC<HealthItemProps> = ({
  style,
  title,
  value,
  iconName,
  iconType,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon
          type={iconType}
          name={iconName}
          color={colors.highlight}
          size={vmin * 7}
        />
      </View>
      <View>
        <Text bold h2>
          {title}
        </Text>
        <Text bold color={colors.white} style={styles.valueTextStyle}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default HealthItem;
