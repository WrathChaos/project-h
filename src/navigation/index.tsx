import React from "react";
import { Image, useColorScheme } from "react-native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";

/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";
import { vmin } from "@freakycoder/react-native-helpers";
import SharingScreen from "@screens/sharing/SharingScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (route: any, color: string) => {
    const { name } = route;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let iconSource = require("@assets/icons/running.png");
    if (name === SCREENS.SUMMARY) {
      iconSource = require("@assets/icons/running.png");
    } else if (name === SCREENS.SHARING) {
      iconSource = require("@assets/icons/sharing.png");
    }
    return (
      <Image
        source={iconSource}
        style={{ width: vmin * 8, height: vmin * 8 }}
        tintColor={color}
      />
    );
  };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => renderTabIcon(route, color),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen name={SCREENS.SUMMARY} component={HomeScreen} />
        <Tab.Screen name={SCREENS.SHARING} component={SharingScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.SUMMARY} component={renderTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
