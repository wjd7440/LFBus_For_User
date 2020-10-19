import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import axios from "axios";

export default ({ navigation, route }) => {
    const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
    const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
    const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
    const BUS_NODE_ID = route.params ? route.params.BUS_NODE_ID : null;
    const DESTINATION = route.params ? route.params.DESTINATION : null;
    const DISTANCE = route.params ? route.params.DISTANCE : null;
    const CAR_REG_NO = route.params ? route.params.CAR_REG_NO : null;
    const parseString = require("react-native-xml2js").parseString;
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    console.log(DISTANCE)
    const dataLoader = () => {
        axios({
            url: "http://openapitraffic.daejeon.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D&busRouteId=" + ROUTE_CD,
            method: "get",
        })
            .then((response) => {
                parseString(response.data, (err, result) => {
                    const busRouteInfoArray = result.ServiceResult.msgBody;
                    setData(busRouteInfoArray);
                    setLoaded(true);
                });
            })
            .catch(function (err) {
                // console.log(err);
            });
    };

    useEffect(() => {
        dataLoader();
    }, []);


    if (!loaded || !data[0]) {
        return <Text style={{ fontSize: 13, color: '#8D8E93' }}>저상버스 정보를 불러오는중입니다.</Text>;
    } else {
        return (
            <>
                <Text>현재 정류장 : {BUSSTOP_NM}</Text>
                <Text>{DESTINATION} 방면</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("LoginScreen");
                    }}
                >
                    <Text>버스경로</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("LoginScreen");
                    }}
                >
                    <Text>버스 운행정보</Text>
                </TouchableOpacity>
                <Text>거리 : {DISTANCE}m</Text>
                {data[0].itemList.map((rowData, index) => {
                    return (
                        <>
                            <Text>{rowData.BUSSTOP_NM}</Text>
                        </>
                    );
                })}
            </>
        );
    }
};
