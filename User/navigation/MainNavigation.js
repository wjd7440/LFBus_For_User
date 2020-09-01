import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { Text, Block } from "galio-framework";
import Icon from "react-native-fontawesome-pro";

// Common
import TabBar from "../components/TabBar";

import HomeStack from "./HomeStack";

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeStack"
        cardStyle={{ backgroundColor: "transparent" }}
      >
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
