import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import StationListDetailScreen from "./StationListDetailScreen";
import axios from "axios";

export default ({ serviceKey, BusStopID }) => {
  const parseString = require("react-native-xml2js").parseString;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [busExist, setBusExist] = useState(false);

  const dataLoader = () => {
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${serviceKey}&BusStopID=${BusStopID}`,
      method: "get",
    })
      .then((response) => {
        parseString(response.data, (err, result) => {
          const busArriveInfoArray = result.ServiceResult.msgBody;
          setData(busArriveInfoArray);
          setLoaded(true);
        });
      })
      .catch(function (err) {
        // console.log(err);
      });
  };

  useEffect(() => {
    dataLoader();
    // let timer = setInterval(() => {
    //   dataLoader();
    // }, 10000);

    // return () => clearInterval(timer);
  }, []);

  if (!loaded || !data[0]) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <Fragment key={BusStopID}>
        {data[0].itemList.map((rowData, index) => {
          return (
            <>
              {rowData.CAR_REG_NO && (
                <StationListDetailScreen
                  key={index}
                  busExist={busExist}
                  setBusExist={setBusExist}
                  CAR_REG_NO={rowData.CAR_REG_NO}
                  ROUTE_NO={rowData.ROUTE_NO}
                  STATUS_POS={rowData.STATUS_POS}
                  EXTIME_MIN={rowData.EXTIME_MIN}
                  DESTINATION={rowData.DESTINATION}
                  ROUTE_TP={rowData.ROUTE_TP}
                />
              )}
            </>
          );
        })}
        {!busExist && (
          <Text style={{ fontSize: 13, color: "#8D8E93" }}>
            저상버스 도착정보가 없습니다.
          </Text>
        )}
      </Fragment>
    );
  }
};
