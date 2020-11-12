import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import style from "../../../constants/style";
import { theme } from "galio-framework";
import { BUS_ROTATION_LIST_QUERY } from "../Queries";
import { Header } from "../../../components";

export default ({ navigation, route }) => {
  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (parseInt(arr[i][prop][0]) === parseInt(value)) {
        return true;
      }
    }
    return false;
  };
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const parseString = require("react-native-xml2js").parseString;
  const [liveData, setLiveData] = useState([]);
  const [loaded, setLoaded] = useState(false);
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
  };
  useEffect(() => {
    dataLoader();
  }, []);
  const { data, loading } = useQuery(BUS_ROTATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      ROUTE_CD: ROUTE_CD,
    },
  });

  if (loading || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          back
          title={ROUTE_NO + "번"}
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <ScrollView>
          {data.UserBusRotationList.busRotations.map((rowData, index) => {
            return (
              <TouchableHighlight
                underlayColor={"#f5f5f5"}
                style={styles.list}
                onPress={() => {
                  navigation.navigate("BusStationSearchResultScreen", {
                    BUS_NODE_ID: rowData.BUS_NODE_ID,
                  });
                }}
              >
                <View style={{ flex: 1, width: "100%", flexDirection: "row" }}>
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
                    </Text>
                    <Text style={styles.busStationNumber}>
                      {rowData.BUS_STOP_ID}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
          <View style={[styles.bottomCont, styles.container]}>
            <Text style={{ fontSize: 12, color: "#8D8E93", paddingBottom: 30 }}>
              버스 도착정보는 대전시 공공데이터포털에서 제공받고있습니다.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
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
