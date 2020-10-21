import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import HomeScreen from "../src/screens/HomeScreen";
import ReserveScreen from "../src/screens/ReserveScreen";
import ResultDetailScreen from "../src/screens/ReserveScreen/ResultDetailScreen";
import ReservationScreen from "../src/screens/ReserveScreen/ReservationScreen";
import BusInfoScreen from "../src/screens/ReserveScreen/BusInfoScreen";
import BusServiceInfoScreen from "../src/screens/ReserveScreen/BusServiceInfoScreen";

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ReserveScreen" component={ReserveScreen} />
      <Stack.Screen name="ResultDetailScreen" component={ResultDetailScreen} />
      <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
      <Stack.Screen name="BusInfoScreen" component={BusInfoScreen} />
      <Stack.Screen name="BusServiceInfoScreen" component={BusServiceInfoScreen} />
    </Stack.Navigator>
  );
};
