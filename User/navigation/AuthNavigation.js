import React from "react";
import { Button, Block, NavBar, Text, theme } from "galio-framework";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

// login
import LoginScreen from "../src/screens/LoginScreen";

// SignUp
import SignUpScreen from "../src/screens/SignUpScreen";

// header for screens
import Header from "../components/Header";

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: true,
          gestureEnabled: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            header: () => {},
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            header: () => <Header title="회원가입" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
