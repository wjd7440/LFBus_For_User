import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { Text, Block } from "galio-framework";
import Icon from "react-native-fontawesome-pro";

// Common
import TabBar from "../components/TabBar";

import HomeStack from "./HomeStack";
import ReservationStack from "./ReservationStack";
import MoreMenuStack from "./MoreMenuStack";
import SearchStack from "./SearchStack";

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        animationEnabled: true,
        swipeEnabled: true,
        showLabel: false,
        barStyle: { backgroundColor: "#B0C4DE" },
        activeTintColor: "#4B56F1",
        inactiveTintColor: "rgba(0,0,0,0.6)",
        labelStyle: {
          fontFamily: "open-sans-regular",
        },
        style: {
          height: Platform.OS === "ios" ? 90 : 60,
        },
        pressColor: "black",
      }}
    >
      <Tab.Screen
        name="내 주변 정류장"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Block center>
              <Icon name="bus" type="light" color={color} size={22} />
              <Text style={{ marginTop: 4 }} center color={color} size={12}>
                내 주변 정류장
              </Text>
            </Block>
          ),
        }}
      />
      <Tab.Screen
        name="메뉴"
        component={MoreMenuStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Block center>
              <Icon name="bars" type="light" color={color} size={22} />
              <Text style={{ marginTop: 4 }} color={color} size={12}>
                메뉴
              </Text>
            </Block>
          ),
        }}
      />
      <Tab.Screen
        name="정류장 검색"
        component={SearchStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Block center>
              <Icon name="search" type="light" color={color} size={22} />
              <Text style={{ marginTop: 4 }} color={color} size={12}>
                검색
              </Text>
            </Block>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabStack"
        cardStyle={{ backgroundColor: "transparent" }}
      >
        <Stack.Screen
          name="내 주변 정류장"
          component={TabStack}
          options={{
            header: () => { },
          }}
        />
        <Stack.Screen
          name="홈"
          component={HomeStack}
          options={{
            header: () => { },
          }}
        />
        <Stack.Screen
          name="메뉴"
          component={MoreMenuStack}
          options={{
            header: () => { },
          }}
        />
        <Stack.Screen
          name="검색"
          component={SearchStack}
          options={{
            header: () => { },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
