import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import MenuScreen from "../src/screens/MenuScreen/index";
import ReservationCheckScreen from "../src/screens/MenuScreen/ReservationCheckScreen";
import RouteScreen from "../src/screens/MenuScreen/RouteScreen";
import ChargeScreen from "../src/screens/MenuScreen/ChargeScreen";
import ChargeCompleteScreen from "../src/screens/MenuScreen/ChargeCompleteScreen";
import PointTransactionScreen from "../src/screens/MenuScreen/PointTransactionScreen";

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
      <Stack.Screen name="ChargeCompleteScreen" component={ChargeCompleteScreen} />
      <Stack.Screen name="PointTransactionScreen" component={PointTransactionScreen} />
    </Stack.Navigator>
  );
};
