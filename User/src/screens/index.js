import React from "react";
import { Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import SomethingScreen from "./SomethingScreen";
import ReserveScreen from "./ReserveScreen";
import ReservationScreen from "./ReserveScreen/ReservationScreen";
import SignUpScreen from "./SignUpScreen";

const HomeStack = createStackNavigator(
  {
    HomeScreen,
    ReserveScreen,
    ReservationScreen,
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "내 주변 버스정류장",
    }),
  }
);
const SettingStack = createStackNavigator(
  {
    SettingScreen,
    SomethingScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: "메뉴",
    }),
    initialRouteName: "SettingScreen",
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    홈: HomeStack,
    메뉴: SettingStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon = "▲";

        if (routeName === "홈") {
          icon = "🌈";
        } else if (routeName === "메뉴") {
          icon = "🌙";
        }

        // can use react-native-vector-icons
        // <Icon name={iconName} size={iconSize} color={iconColor} />
        return (
          <Text style={{ color: (focused && "#46c3ad") || "#888" }}>
            {icon}
          </Text>
        );
      },
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
    },
  }
);

const AppStack = createStackNavigator({
  LoginScreen: LoginScreen,
  SignUpScreen: SignUpScreen,
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});

export default createAppContainer(AppStack);
