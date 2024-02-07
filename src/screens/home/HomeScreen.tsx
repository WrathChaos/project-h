import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./HomeScreen.style";
import useHealthKit from "@services/hooks/useHealthKit";
import Text from "@shared-components/text-wrapper/TextWrapper";
import HealthItem from "@screens/home/components/health-item/HealthItem";
import { IconType } from "react-native-dynamic-vector-icons";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { steps, flightsClimbed, distanceWalkingRunning } = useHealthKit();

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text bold color={colors.white} style={styles.header}>
          Today
        </Text>
      </View>
      <View style={styles.content}>
        <HealthItem
          title="Steps"
          value={steps}
          iconName="footsteps"
          iconType={IconType.Ionicons}
        />
        <HealthItem
          title="Flights Climbed"
          value={flightsClimbed}
          iconName="stairs"
          iconType={IconType.MaterialCommunityIcons}
        />
        <HealthItem
          title="Distance Walking/Running"
          value={distanceWalkingRunning}
          iconName="running"
          iconType={IconType.FontAwesome5}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
