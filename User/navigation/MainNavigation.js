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
import ReservationStack from "./ReservationStack";

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeStack"
        cardStyle={{ backgroundColor: "transparent" }}
      >
        <Stack.Screen name="내 주변 버스정류장" component={HomeStack} />
        <Stack.Screen name="예약하기" component={ReservationStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
