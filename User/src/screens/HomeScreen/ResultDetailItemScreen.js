import React, { useState, useEffect, Fragment } from "react";
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
    let timer = setInterval(() => {
      dataLoader();
    }, 15000);

    return clearInterval(timer);
  }, []);

  if (!loaded || !data[0]) {
    return <Text style={{ fontSize: 13, color: '#8D8E93', }}>실시간 저상버스 정보를 검색중입니다.</Text>;
  } else {
    return (
      <Fragment key={BusStopID}>
        {data[0].itemList.map((rowData, index) => {
          return (
            <>
              {rowData.CAR_REG_NO && (
                <ResultDetailScreen
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
        {!busExist && <Text style={{ fontSize: 13, color: '#8D8E93' }}>현재 저상버스 도착정보가 없습니다.</Text>}
      </Fragment>
    );
  }
};
