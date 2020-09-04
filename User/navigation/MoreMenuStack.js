import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import MenuScreen from "../src/screens/MenuScreen/index";
import ReservationCheckScreen from "../src/screens/MenuScreen/ReservationCheckScreen";

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
    </Stack.Navigator>
  );
};
