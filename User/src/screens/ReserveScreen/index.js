import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import ResultDetailScreen from "./ResultDetailScreen";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

export default ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const BUS_NODE_ID = navigation.getParam("BUS_NODE_ID");
  const BUSSTOP_NM = navigation.getParam("BUSSTOP_NM");
  const [time, setTime] = useState({});

  const API_KEY =
    "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
  const parseString = require("react-native-xml2js").parseString;

  const dataLoader = () => {
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${BUS_NODE_ID}`,
      method: "get",
    }).then((response) => {
      parseString(response.data, function (err, result) {
        // console.log(result);
        const busArriveInfoArray = result.ServiceResult.msgBody;
        setData(busArriveInfoArray);
        setLoaded(true);
      });
    });
  };

  useEffect(() => {
    // let timer = setInterval(() => {
    dataLoader();
    // }, 15000);
  }, [BUS_NODE_ID]);

  useEffect(() => {
    // let timer = setInterval(() => {

    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    setTime(year + "/" + month + "/" + date + " " + hours + ":" + min);

    // }, 15000);
  }, []);

  return (
    <View>
      {!loaded || !data[0] ? (
        <View>
          <Text>저상버스 도착정보가 없습니다.</Text>
        </View>
      ) : (
        <ScrollView>
          {/* <LinearGradient colors={["#00427E", "#002548"]}> */}
          {/* <View>
            <View>
              <Text>{BUSSTOP_NM}</Text>
            </View>
            <View>
              <Text>저상버스안내시스템</Text>
            </View>
            <View>
              <Text>{time}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>노선번호</Text>
              <Text>Route</Text>
            </View>
            <View>
              <Text>종착지</Text>
              <Text>Destination</Text>
            </View>
            <View>
              <Text>예정시간</Text>
              <Text>Minute</Text>
            </View>
            <View>
              <Text>버스위치</Text>
              <Text>Location</Text>
            </View>
          </View> */}
          {/* </LinearGradient> */}
          {data[0].itemList.map((rowData, index) => {
            return (
              <>
                {rowData.CAR_REG_NO && (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ReservationScreen", {
                        CAR_REG_NO: rowData.CAR_REG_NO,
                        ROUTE_NO: rowData.ROUTE_NO,
                        STATUS_POS: rowData.STATUS_POS,
                        EXTIME_MIN: rowData.EXTIME_MIN,
                        DESTINATION: rowData.DESTINATION,
                        ROUTE_TP: rowData.ROUTE_TP,
                        ROUTE_CD: rowData.ROUTE_CD,
                        BUSSTOP_NM: BUSSTOP_NM,
                      });
                    }}
                  >
                    <ResultDetailScreen
                      CAR_REG_NO={rowData.CAR_REG_NO}
                      ROUTE_NO={rowData.ROUTE_NO}
                      STATUS_POS={rowData.STATUS_POS}
                      EXTIME_MIN={rowData.EXTIME_MIN}
                      DESTINATION={rowData.DESTINATION}
                      ROUTE_TP={rowData.ROUTE_TP}
                      ROUTE_CD={rowData.ROUTE_CD}
                      BUSSTOP_NM={BUSSTOP_NM}
                    />
                  </TouchableOpacity>
                )}
              </>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
