import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import ChargeScreen from "../src/screens/MenuScreen/ChargeScreen";
import ChargeListScreen from "../src/screens/MenuScreen/ChargeListScreen";

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="ChargeScreen"
      headerMode="none"
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="ChargeScreen" component={ChargeScreen} />
      <Stack.Screen name="ChargeListScreen" component={ChargeListScreen}/>      
    </Stack.Navigator>
  );
};
