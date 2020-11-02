import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import SearchScreen from "../src/screens/SearchScreen";
import BusRouteInfoScreen from "../src/screens/SearchScreen/BusRouteInfoScreen";
import BusStationSearchScreen from "../src/screens/SearchScreen/BusStationSearchScreen";

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchScreen"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="BusRouteInfoScreen" component={BusRouteInfoScreen} />
      <Stack.Screen name="BusStationSearchScreen" component={BusStationSearchScreen} />
    </Stack.Navigator>
  );
};
