import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import SearchScreen from "../src/screens/SearchScreen";

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
    </Stack.Navigator>
  );
};
