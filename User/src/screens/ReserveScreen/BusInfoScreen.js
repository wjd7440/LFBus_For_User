import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  Image,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import axios from "axios";
import { useQuery } from "react-apollo-hooks";
import {
  ACCOUNT_INFO_QUERY,
  BUS_INFO_QUERY,
  BUS_ROTATION_LIST_QUERY,
} from "../Queries";
import { theme } from "galio-framework";
import style from "../../../constants/style";
import { Header } from "../../../components";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-fontawesome-pro";

export default ({ navigation, route }) => {
  const scrollViewToScroll = React.createRef();

  const [dynamicHeight, setDynamicHeight] = useState(0);
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const BUSSTOP_NM = route.params ? route.params.BUSSTOP_NM : null;
  const BUS_STOP_ID = route.params ? route.params.BUS_STOP_ID : null;
  const BUS_NODE_ID = route.params ? route.params.BUS_NODE_ID : null;
  const DESTINATION = route.params ? route.params.DESTINATION : null;
  const DISTANCE = route.params ? route.params.DISTANCE : null;
  const CAR_REG_NO = route.params ? route.params.CAR_REG_NO : null;
  const GPS_LATI = route.params ? route.params.GPS_LATI : null;
  const GPS_LONG = route.params ? route.params.GPS_LONG : null;
  const parseString = require("react-native-xml2js").parseString;
  const [loaded, setLoaded] = useState(false);
  const [DIR, setDIR] = useState();
  const [liveData, setLiveData] = useState([]);
  const dataLoader = () => {
    axios({
      url:
        "http://openapitraffic.daejeon.go.kr/api/rest/busposinfo/getBusPosByRtid?serviceKey=8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D&busRouteId=" +
        ROUTE_CD,
      method: "get",
    })
      .then((response) => {
        parseString(response.data, (err, result) => {
          const busRouteInfoArray = result.ServiceResult.msgBody;
          setLiveData(busRouteInfoArray);
          setLoaded(true);
        });
      })
      .catch(function (err) {
        // console.log(err);
      });

    {
      liveData &&
        liveData[0] &&
        getDir(CAR_REG_NO, liveData[0].itemList, "PLATE_NO");
    }
  };

  const { data, loading } = useQuery(BUS_ROTATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      ROUTE_CD: ROUTE_CD[0],
    },
  });
  console.log(ROUTE_CD[0]);
  const { data: user, userLoading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });

  const { data: busInfo, busInfoLoading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  useEffect(() => {
    if (scrollViewToScroll.current) {
      scrollViewToScroll.current.scrollTo({
        x: 0,
        y: dynamicHeight,
        animated: true,
      });
    }
  }, [scrollViewToScroll]);

  useEffect(() => {
    dataLoader();
  }, []);

  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      // console.log(arr[i][prop][0]);
      // console.log(value);
      if (parseInt(arr[i][prop][0]) === parseInt(value)) {
        // console.log("잇다");
        return true;
      }
    }
    // console.log("버스지나감");
    return false;
  };
  const getDir = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop][0] === value[0]) {
        return arr[i]["DIR"][0];
      }
    }
    return false;
  };
  if (loading || userLoading || busInfoLoading || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={ROUTE_NO[0] + "번"}
          titleStyle={{ fontSize: 21, fontWeight: "500", color: "#111" }}
          back
          // close
          // closeNavigate={"HomeScreen"}
          navigation={navigation}
          style={{
            height: Platform.OS === "android" ? 55 : 50,
            marginTop: Platform.OS === "android" ? 25 : 5,
            alignItems: "center",
            textAlign: "justify",
            borderBottomWidth: 0,
            borderColor: "#f5f5f5",
            zIndex: 5,
          }}
          right={
            <View style={[styles.seatImgCont, styles.rightAb]}>
              {busInfo.UserBusInfo.SEAT1 ? (
                <View style={styles.seatImgBox}>
                  <Image
                    style={styles.seatImg}
                    source={require("../../../assets/off_seat.png")}
                  />
                </View>
              ) : (
                <View style={styles.seatImgBox}>
                  <Image
                    style={styles.seatImg}
                    source={require("../../../assets/on_seat.png")}
                  />
                </View>
              )}
              {busInfo.UserBusInfo.SEAT2 ? (
                <View style={styles.seatImgBox}>
                  <Image
                    style={styles.seatImg}
                    source={require("../../../assets/off_seat.png")}
                  />
                </View>
              ) : (
                <View style={styles.seatImgBox}>
                  <Image
                    style={styles.seatImg}
                    source={require("../../../assets/on_seat.png")}
                  />
                </View>
              )}
            </View>
          }
        />
        {/* //상단 버스 정보 */}
        <View
          style={{
            ...styles.containerH,
            paddingTop: 0,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#4B56F1",
              marginBottom: 4,
            }}
          >
            {BUSSTOP_NM}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              marginBottom: 10,
              color: "#676767",
            }}
          >
            {DESTINATION} 방면
          </Text>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.infoBtn}
              onPress={() => {
                navigation.navigate("BusRouteMapScreen", {
                  ROUTE_NO: ROUTE_NO,
                  ROUTE_CD: ROUTE_CD,
                  GPS_LATI: GPS_LATI,
                  GPS_LONG: GPS_LONG,
                });
              }}
            >
              <Icon
                name="directions"
                type="light"
                size={16}
                color={"#565656"}
              />
              <Text style={styles.infoBtnTxt}>버스경로</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.infoBtn}
              onPress={() => {
                navigation.navigate("BusServiceInfoScreen", {
                  ROUTE_NO: ROUTE_NO,
                  ROUTE_CD: ROUTE_CD,
                  GPS_LATI: GPS_LATI,
                  GPS_LONG: GPS_LONG,
                });
              }}
            >
              <Icon
                name="info-circle"
                type="light"
                size={16}
                color={"#565656"}
              />
              <Text style={styles.infoBtnTxt}>운행정보</Text>
            </TouchableOpacity>
          </View>

          {/* <Text>거리 : {DISTANCE}m</Text> */}
          {DISTANCE < 501 ? (
            <TouchableRipple
              underlayColor={"#333FDA"}
              rippleColor="rgba(51,63, 218, .8)"
              style={styles.resultButton}
              onPress={() => {
                navigation.replace("ReservationScreen", {
                  DISTANCE: DISTANCE,
                  CAR_REG_NO: CAR_REG_NO,
                  ROUTE_NO: ROUTE_NO,
                  ROUTE_CD: ROUTE_CD,
                  DESTINATION: DESTINATION,
                  BUSSTOP_NM: BUSSTOP_NM,
                  BUS_NODE_ID: BUS_NODE_ID,
                  maileage: !loading && user.UserInfo.maileage,
                  equipment: !loading && user.UserInfo.equipment,
                  equipmentNa: !loading && user.UserInfo.equipmentName,
                  needHelp: !loading && user.UserInfo.needHelp,
                  DIR: getDir(CAR_REG_NO, liveData[0].itemList, "PLATE_NO"),
                });
              }}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>탑승요청</Text>
            </TouchableRipple>
          ) : (
            <Text>
              내 위치로부터 500m 내의 버스만 탑승요청을 하실 수 있습니다.
            </Text>
          )}
        </View>
        {/* 상단 버스 정보// */}
        <ScrollView ref={scrollViewToScroll}>
          <View>
            {data.UserBusRotationList.busRotations.map((rowData, index) => {
              return (
                <View
                  style={[
                    rowData.BUS_NODE_ID === BUS_NODE_ID
                      ? styles.onList
                      : styles.list,
                  ]}
                  onLayout={(event) => {
                    rowData.BUS_NODE_ID == BUS_NODE_ID &&
                      setDynamicHeight(event.nativeEvent.layout.y);
                  }}
                >
                  <View style={styles.busState}>
                    {getIndex(
                      rowData.BUS_NODE_ID,
                      liveData[0].itemList,
                      "BUS_NODE_ID"
                    ) ? (
                      <Image
                        style={[
                          styles.busIcon,
                          index % 5 !== 1 && { display: "none" },
                        ]}
                        source={require("../../../assets/busmarker.png")}
                      />
                    ) : (
                      <Text></Text>
                    )}
                    <View
                      style={[
                        styles.line,
                        index ===
                          data.UserBusRotationList.busRotations.length - 1 && {
                          height: "50%",
                        },
                      ]}
                    />
                    <Image
                      style={styles.busArrow}
                      source={require("../../../assets/busflow_icon.png")}
                    />
                  </View>
                  <View style={styles.busStationInfo}>
                    <Text style={styles.busStationName}>
                      {rowData.BUSSTOP_NM}
                      {rowData.BUSSTOP_TP === 1 ? <Text>(기점)</Text> : null}
                      {rowData.BUSSTOP_TP === 2 ? <Text>(반환점)</Text> : null}
                      {rowData.BUSSTOP_TP === 3 ? <Text>(종점)</Text> : null}
                    </Text>
                    {/* {rowData.BUS_NODE_ID === BUS_NODE_ID ? (
                      <Text>내 위치</Text>
                    ) : (
                      <Text></Text>
                    )} */}
                    <Text style={styles.busStationNumber}>
                      {rowData.BUS_STOP_ID}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={[styles.bottomCont, styles.container]}>
            <Text style={{ fontSize: 12, color: "#8D8E93", paddingBottom: 30 }}>
              버스 도착정보는 대전시 공공데이터포털에서 제공받고있습니다.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  ...style,
  list: {
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  onList: {
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: theme.SIZES.BASE * 1.2,
    flexDirection: "row",
    backgroundColor: "#EAE7F2",
  },
  busState: {
    position: "relative",
    width: 64,
    justifyContent: "center",
  },
  line: {
    height: 64,
    width: 3,
    backgroundColor: "#4B56F1",
    position: "absolute",
    top: -1,
    right: 10,
  },
  busIcon: {
    resizeMode: "contain",
    width: 28,
    height: 28,
  },
  busArrow: {
    resizeMode: "contain",
    width: 15,
    height: 15,
    position: "absolute",
    right: 4,
    top: "50%",
    marginTop: -7,
  },
  busStationInfo: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  busStationName: {
    fontSize: 16,
  },
  busStationNumber: {
    fontSize: 14,
    color: "#8D8E93",
  },
  infoBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 99,
    marginHorizontal: 4,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        paddingVertical: 8,
        paddingHorizontal: 14,
      },
      andriod: {
        paddingVertical: 6,
        paddingHorizontal: 12,
      },
      default: {
        paddingVertical: 6,
        paddingHorizontal: 12,
      },
    }),
  },
  infoBtnTxt: {
    marginLeft: 3,
    color: "#565656",
    fontSize: 14,
  },
  resultButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#4B56F1",
    height: 50,
  },
  seatImgCont: {
    flexDirection: "row",
  },
  seatImgBox: {
    marginHorizontal: 2,
  },
  seatImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  bottomCont: {
    backgroundColor: "#F2F4F8",
  },
});
