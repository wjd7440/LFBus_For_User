import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import ResultDetailScreen from "./ResultDetailScreen";
import axios from "axios";

export default ({ serviceKey, BusStopID }) => {
  const parseString = require("react-native-xml2js").parseString;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

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
    const loader = dataLoader();
    return dataLoader;
  }, []);

  if (!loaded || !data[0]) {
    return <Text>저상버스 도착정보가 없습니다.</Text>;
  } else {
    return data[0].itemList.map((rowData, index) => {
      return (
        <>
          {rowData.CAR_REG_NO && (
            <ResultDetailScreen
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
    });
  }
};
