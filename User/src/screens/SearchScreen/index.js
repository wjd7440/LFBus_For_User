import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BUS_ROUTE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(BUS_ROUTE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  if(loading){
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }else{
    return (
      <ScrollView>
        {data.UserBusRouteList.busRoutes.map((rowData, index) => {          
          return(
            <Text>버스 번호 : {rowData.ROUTE_NO}</Text>          
          )        
        })}
        <Text></Text>
      </ScrollView>
    );
  }
};