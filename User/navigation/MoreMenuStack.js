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
import PasswordChangeScreen from "../src/screens/MenuScreen/PasswordChangeScreen";
import UserWithdrawalScreen from "../src/screens/MenuScreen/UserWithdrawalScreen";
import NoticeScreen from "../src/screens/MenuScreen/NoticeScreen";
import NoticeViewScreen from "../src/screens/MenuScreen/NoticeViewScreen";
import ServiceGuideScreen from "../src/screens/MenuScreen/ServiceGuideScreen";
import CustomerCenterScreen from "../src/screens/MenuScreen/CustomerCenterScreen";
import UserQna from "../src/screens/MenuScreen/UserQna";
import QuestionView from "../src/screens/MenuScreen/QuestionView";

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
      <Stack.Screen
        name="PasswordChangeScreen"
        component={PasswordChangeScreen}
      />
      <Stack.Screen
        name="UserWithdrawalScreen"
        component={UserWithdrawalScreen}
      />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="NoticeViewScreen" component={NoticeViewScreen} />
      <Stack.Screen name="ServiceGuideScreen" component={ServiceGuideScreen} />
      <Stack.Screen
        name="CustomerCenterScreen"
        component={CustomerCenterScreen}
      />
      <Stack.Screen name="UserQna" component={UserQna} />
      <Stack.Screen name="QuestionView" component={QuestionView} />
    </Stack.Navigator>
  );
};
