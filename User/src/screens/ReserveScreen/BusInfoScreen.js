import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    Image
} from "react-native";
import axios from "axios";
import { useQuery } from "react-apollo-hooks";
import { ACCOUNT_INFO_QUERY, BUS_INFO_QUERY } from "../Queries";
import { Header } from "../../../components";
import { ScrollView } from "react-native-gesture-handler";

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

    const { data: user, loading } = useQuery(ACCOUNT_INFO_QUERY, {
        fetchPolicy: "network-only",
    });

    const { data: busInfo, loading2 } = useQuery(BUS_INFO_QUERY, {
        fetchPolicy: "network-only",
        variables: {
            CAR_REG_NO: CAR_REG_NO[0],
        },
    });
    console.log(ROUTE_CD)
    useEffect(() => {
        dataLoader();
    }, []);

    if (!loaded || !data[0]) {
        return <Text style={{ fontSize: 13, color: '#8D8E93' }}>저상버스 정보를 불러오는중입니다.</Text>;
    } else {
        return (
            <>
                <Header
                    back
                    title={ROUTE_NO[0] + "번"}
                    close
                    closeNavigate={"HomeScreen"}
                    navigation={navigation}
                />
                <ScrollView>
                    {/* 좌석1 */}
                    {!loading2 && busInfo.UserBusInfo.SEAT1 ?
                        <View style={styles.seatImgBox}>
                            <Image
                                style={styles.seatImg}
                                source={require("../../../assets/off_seat.png")}
                            />
                            <Text style={styles.offSeatTxt}>탑승가능</Text>
                        </View> :
                        <View style={styles.seatImgBox}>
                            <Image
                                source={require("../../../assets/on_seat.png")}
                            />
                            <Text style={styles.onSeatTxt}>탑승중</Text>
                        </View>
                    }
                    {/* 좌석2 */}
                    {!loading2 && busInfo.UserBusInfo.SEAT2 ?
                        <View style={styles.seatImgBox}>
                            <Image
                                style={styles.seatImg}
                                source={require("../../../assets/off_seat.png")}
                            />
                            <Text style={styles.offSeatTxt}>탑승가능</Text>
                        </View> :
                        <View style={styles.seatImgBox}>
                            <Image
                                source={require("../../../assets/on_seat.png")}
                            />
                            <Text style={styles.onSeatTxt}>탑승중</Text>
                        </View>
                    }
                    <Text>정류장 : {BUSSTOP_NM}</Text>
                    <Text>{DESTINATION} 방면</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                    >
                        <Text>버스경로</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("HomeScreen");
                        }}
                    >
                        <Text>버스 운행정보</Text>
                    </TouchableOpacity>
                    <Text>거리 : {DISTANCE}m</Text>
                    {DISTANCE < 500 ? <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ReservationScreen", {
                                DISTANCE: DISTANCE,
                                CAR_REG_NO: CAR_REG_NO,
                                ROUTE_NO: ROUTE_NO,
                                ROUTE_CD: ROUTE_CD,
                                DESTINATION: DESTINATION,
                                BUSSTOP_NM: BUSSTOP_NM,
                                BUS_NODE_ID: BUS_NODE_ID,
                                equipment: !loading && user.UserInfo.equipment,
                                memo: !loading && user.UserInfo.memo,
                            });
                        }}
                    >
                        <Text>탑승 요청</Text>
                    </TouchableOpacity> : <Text>내 위치로부터 500m 내의 버스만 탑승요청을 하실 수 있습니다.</Text>}
                    {data[0].itemList.map((rowData, index) => {
                        return (
                            <>
                                <Text key={index}>{rowData.BUSSTOP_NM}</Text>
                            </>
                        );
                    })}
                </ScrollView>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    busList: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 18,
        paddingBottom: 18,
        justifyContent: 'space-between',
    },
    left: {
        maxWidth: '65%',
    },
    right: {
        maxWidth: '35%',
        flexDirection: "row",
    },
    seatImgBox: {
        paddingRight: 5,
        paddingLeft: 5,
    },
    seatImg: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    offSeatTxt: {
        marginTop: 5,
        fontSize: 12,
        color: "#9a9a9a",
    },
    onSeatTxt: {
        marginTop: 5,
        fontSize: 12,
        color: "#4B56F1",
    },
});