import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import MenuScreen from "../src/screens/MenuScreen/index";
import ReservationCheckScreen from "../src/screens/MenuScreen/ReservationCheckScreen";
import RouteScreen from "../src/screens/MenuScreen/RouteScreen";
import ChargeScreen from "../src/screens/MenuScreen/ChargeScreen";
import ChargeListScreen from "../src/screens/MenuScreen/ChargeListScreen";
import AccountInfoScreen from "../src/screens/MenuScreen/AccountInfoScreen";
import AccountEditScreen from "../src/screens/MenuScreen/AccountEditScreen";

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="MenuScreen"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen
        name="ReservationCheckScreen"
        component={ReservationCheckScreen}
      />
      <Stack.Screen name="RouteScreen" component={RouteScreen} />
      <Stack.Screen name="ChargeScreen" component={ChargeScreen} />
      <Stack.Screen name="ChargeListScreen" component={ChargeListScreen} />
      <Stack.Screen name="AccountInfoScreen" component={AccountInfoScreen} />
      <Stack.Screen name="AccountEditScreen" component={AccountEditScreen} />
    </Stack.Navigator>
  );
};
