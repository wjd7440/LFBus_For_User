import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import ReserveScreen from "../src/screens/ReserveScreen";
import ResultDetailScreen from "../src/screens/ReserveScreen/ResultDetailScreen";
import ReservationScreen from "../src/screens/ReserveScreen/ReservationScreen";
import BusInfoScreen from "../src/screens/ReserveScreen/BusInfoScreen";

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="ReserveScreen"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="BusInfoScreen" component={BusInfoScreen} />
      <Stack.Screen name="ReserveScreen" component={ReserveScreen} />
      <Stack.Screen name="ResultDetailScreen" component={ResultDetailScreen} />
      <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
    </Stack.Navigator>
  );
};
