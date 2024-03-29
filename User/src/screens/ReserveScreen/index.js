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
import { ACCOUNT_INFO_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { Header } from "../../../components";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-fontawesome-pro";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ({ navigation, route }) => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [busExist, setBusExist] = useState(false);
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

  const { data: user, loading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });

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
    setTimeout(() => {
      setDisplay(true);
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!loaded || !data[0] ? (
        <View style={{ flex: 1 }}>
          <View style={styles.loadingWrap}>
            <Text style={{ fontSize: 16, marginBottom: 15 }}>
              실시간 저상버스 정보를 검색중입니다.
            </Text>
            <ActivityIndicator size="large" color="#4B56F1" />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Header
            title="버스 도착 정보"
            back
            // close
            // closeNavigate={"HomeScreen"}
            navigation={navigation}
            style={{
              height: Platform.OS === "android" ? 55 : 50,
              marginTop: Platform.OS === "android" ? 55 : 5,
              alignItems: "center",
              textAlign: "justify",
              borderBottomWidth: 1,
              borderColor: "#f5f5f5",
              zIndex: 5,
            }}
          />
          <ScrollView>
            {data[0].itemList.map((rowData, index) => {
              return (
                <Fragment key={index}>
                  {rowData.CAR_REG_NO && (
                    <TouchableRipple
                      rippleColor="rgba(0, 0, 0, .06)"
                      underlayColor={"#f6f6f6"}
                      onPress={() => {
                        // navigation.navigate("ReservationScreen", {
                        navigation.replace("BusInfoScreen", {
                          DISTANCE: DISTANCE,
                          CAR_REG_NO: rowData.CAR_REG_NO,
                          ROUTE_NO: rowData.ROUTE_NO,
                          STATUS_POS: rowData.STATUS_POS,
                          EXTIME_MIN: rowData.EXTIME_MIN,
                          DESTINATION: rowData.DESTINATION,
                          ROUTE_TP: rowData.ROUTE_TP,
                          ROUTE_CD: rowData.ROUTE_CD,
                          BUS_STOP_ID: rowData.BUS_STOP_ID,
                          BUSSTOP_NM: BUSSTOP_NM,
                          BUS_NODE_ID: BUS_NODE_ID,
                          GPS_LATI: GPS_LATI,
                          GPS_LONG: GPS_LONG,
                          equipment: !loading && user.UserInfo.equipment,
                          memo: !loading && user.UserInfo.memo,
                        });
                      }}
                    >
                      <ResultDetailScreen
                        busExist={busExist}
                        setBusExist={setBusExist}
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
                    </TouchableRipple>
                  )}
                </Fragment>
              );
            })}
          </ScrollView>
          {!busExist && display && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <Icon name="bus" type="solid" size={64} color={"#979797"} />
              <Text style={{ fontSize: 16, color: "#676767", marginTop: 20 }}>
                현재 저상버스 도착정보가 없습니다.
              </Text>
            </View>
          )}
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
