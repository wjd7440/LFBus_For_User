import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import ResultDetailScreen from "./ResultDetailScreen";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const BUS_NODE_ID = route.params ? route.params.BUS_NODE_ID : null;
  const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
  const GPS_LATI = route.params ? route.params.GPS_LATI : null;
  const GPS_LONG = route.params ? route.params.GPS_LONG : null;
  const DISTANCE = route.params ? route.params.DISTANCE : null;
  const [time, setTime] = useState({});
  const API_KEY =
    "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
  const parseString = require("react-native-xml2js").parseString;

  const dataLoader = () => {
    console.log("3");
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${BUS_NODE_ID}`,
      method: "get",
    }).then((response) => {
      parseString(response.data, function (err, result) {
        const busArriveInfoArray = result.ServiceResult.msgBody;
        setData(busArriveInfoArray);
        setLoaded(true);
      });
    });
  };

  // useEffect(() => {
  //   dataLoader();
  //   let timer = setInterval(() => {
  //     dataLoader();
  //   }, 15000);
  //   return () => clearInterval(timer);
  // }, [BUS_NODE_ID]);

  useEffect(() => {
    dataLoader();
    // let timer = setInterval(() => {
    //   dataLoader();
    // }, 15000);
    // return () => clearInterval(timer);
  }, []);

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
    <View style={styles.container}>
      {!loaded || !data[0] ? (
        <View style={{ flex: 1 }}>
          <Header title="버스 도착 정보" back />
          <View style={styles.loadingWrap}>
            <Text style={{ fontSize: 16, marginBottom: 15 }}>
              실시간 저상버스 정보를 검색중입니다.
            </Text>
            <ActivityIndicator size="large" color="#4B56F1" />
          </View>
        </View>
      ) : (
        <View>
          <Header title="버스 도착 정보" back />
          <ScrollView>
            {data[0].itemList.map((rowData, index) => {
              return (
                <Fragment key={index}>
                  {rowData.CAR_REG_NO && (
                    <ResultDetailScreen
                      DISTANCE={DISTANCE}
                      CAR_REG_NO={rowData.CAR_REG_NO}
                      ROUTE_NO={rowData.ROUTE_NO}
                      STATUS_POS={rowData.STATUS_POS}
                      EXTIME_MIN={rowData.EXTIME_MIN}
                      DESTINATION={rowData.DESTINATION}
                      ROUTE_TP={rowData.ROUTE_TP}
                      ROUTE_CD={rowData.ROUTE_CD}
                      BUSSTOP_NM={BUSSTOP_NM}
                    />
                  )}
                </Fragment>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingWrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
