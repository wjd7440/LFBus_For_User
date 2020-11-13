import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFonts } from "@use-expo/font";
import style from "../../../constants/style";
import { Header } from "../../../components";
import { Appbar, TouchableRipple } from "react-native-paper";
import { theme } from "galio-framework";
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Image,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { useMutation } from "react-apollo-hooks";
import {
  RESERVATION_LIST_QUERY,
  ACCOUNT_INFO_QUERY,
  RESERVATION_DELETE_QUERY,
  USER_MAILEAGE_WRITE_QUERY,
} from "../Queries";
import NumberFormat from "react-number-format";
import axios from "axios";
import Icon from "react-native-fontawesome-pro";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default ({ navigation }) => {
  const [reservationDeleteMutation] = useMutation(RESERVATION_DELETE_QUERY, {
    refetchQueries: () => [{ query: RESERVATION_LIST_QUERY }],
  });
  const parseString = require("react-native-xml2js").parseString;
  const fonts = useFonts({
    "NotoSansKR-Thin": require("../../../assets/fonts/NotoSansKR-Thin.otf"),
    "NotoSansKR-Light": require("../../../assets/fonts/NotoSansKR-Light.otf"),
    "NotoSansKR-Regular": require("../../../assets/fonts/NotoSansKR-Regular.otf"),
    "NotoSansKR-Medium": require("../../../assets/fonts/NotoSansKR-Medium.otf"),
    "NotoSansKR-Bold": require("../../../assets/fonts/NotoSansKR-Bold.otf"),
    "NotoSansKR-Black": require("../../../assets/fonts/NotoSansKR-Black.otf"),
  });

  const { data, loading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });

  const { data: reservation, reservationloading, refetch } = useQuery(
    RESERVATION_LIST_QUERY,
    {
      fetchPolicy: "network-only",
      variables: {
        first: 1,
      },
    }
  );

  const [loaded, setLoaded] = useState(false);
  const [statusPos, setStatusPos] = useState();
  const [extimeMin, setExtimeMin] = useState();
  const [busExist, setBusExist] = useState(false);
  const maileage = !loading && data.UserInfo.maileage;
  const count =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    reservation.UserReservationList.count;
  const id =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].id;
  const ROUTE_NO =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].ROUTE_NO;
  const BUS_NODE_ID =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].BUS_NODE_ID;
  const CAR_REG_NO =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].CAR_REG_NO;
  const departureStation =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].departureStation;
  const arrivalStation =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].arrivalStation;
  const pay =
    !reservationloading &&
    reservation &&
    reservation.UserReservationList &&
    count > 0 &&
    reservation.UserReservationList.reservations[0].pay;

  const API_KEY =
    "VdRcdTnGThY8JlO8dlKwYiGDChsfzFgGBkkqw%2FTjJzaoVaDEPobGUUhI4uUStpL9MD2p5cCrr5eSKV8JOw4W3g%3D%3D";
  const { handleSubmit } = useForm();

  const [maileageWriteMutation] = useMutation(USER_MAILEAGE_WRITE_QUERY, {
    refetchQueries: () => [{ query: ACCOUNT_INFO_QUERY }],
  });
  const getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop][0] === value) {
        setStatusPos(arr[i]["STATUS_POS"]);
        setExtimeMin(arr[i]["EXTIME_MIN"]);
        return true;
      } else {
        setStatusPos(false);
        setExtimeMin(false);
      }
    }
    return false;
  };

  const dataLoader = () => {
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${BUS_NODE_ID}`,
      method: "get",
    })
      .then((response) => {
        parseString(response.data, (err, result) => {
          const busArriveInfoArray = result.ServiceResult.msgBody;
          getIndex(CAR_REG_NO, busArriveInfoArray[0].itemList, "CAR_REG_NO");
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
      refetch();
    }, 15000);

    return () => clearInterval(timer);
  }, [BUS_NODE_ID]);

  const onSubmit = async () => {
    try {
      reservationDeleteMutation({
        variables: {
          id: id,
        },
      });

      if (pay) {
        const {
          data: { UserMaileageWrite },
        } = await maileageWriteMutation({
          variables: {
            maileage: 1250,
          },
        });
      }

      Alert.alert("탑승요청이 정상적으로 취소되었습니다.");
      navigation.replace("MenuScreen");
    } catch (e) {
      console.log(e);
      Alert.alert("탑승요청 취소에 실패했습니다. 다시 시도해주세요.");
      navigation.navigate("MenuScreen");
    }
  };

  const onSubmit2 = async () => {
    try {
      reservationDeleteMutation({
        variables: {
          id: id,
        },
      });

      Alert.alert("하차처리가 완료 되었습니다.");
      navigation.replace("MenuScreen");
    } catch (e) {
      console.log(e);
      Alert.alert("탑승요청 취소에 실패했습니다. 다시 시도해주세요.");
      navigation.navigate("MenuScreen");
    }
  };

  return (
    <SafeAreaView>
      <Header title="메뉴" />
      {/* <Appbar.Header style={{ backgroundColor: "#4B56F1" }}>
        <Appbar.Content title="메뉴" titleStyle={{ fontSize: 16 }} />
      </Appbar.Header> */}
      <ScrollView>
        <View style={styles.container}>
          {/* 내 포인트 내역 */}
          <View style={[styles.shadow, styles.chargeBox]}>
            <View
              style={{
                padding: 20,
                borderRightWidth: 1,
                borderColor: "#f1f1f1",
                flex: 1,
              }}
            >
              <View style={styles.myPoint}>
                <Text style={styles.myPointTxt}>내 포인트</Text>
              </View>
              <NumberFormat
                value={maileage}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(maileage) => (
                  <Text size={26} color={"#333"} style={styles.myPointNumber}>
                    {maileage} P
                  </Text>
                )}
              />
            </View>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              style={{ justifyContent: "center", padding: 20, width: "30%" }}
              onPress={() => {
                navigation.navigate("ChargeScreen", { maileage: maileage });
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, color: "#4B56F1", fontWeight: "700" }}
                >
                  충전하기
                </Text>
                <Image
                  style={{
                    width: 36,
                    height: 36,
                    resizeMode: "contain",
                    marginTop: 3,
                  }}
                  source={require("../../../assets/charge_icon.png")}
                />
              </View>
            </TouchableRipple>
          </View>

          {count > 0 ? (
            <View style={[styles.shadow, styles.contBox, styles.marginTop15]}>
              {}
              <Text style={{ fontSize: 13, color: "#8D8E93", marginBottom: 5 }}>
                탑승요청 버스 내역
              </Text>
              <View style={styles.busList}>
                <Text style={styles.busTit}>탑승버스</Text>
                <Text style={styles.busInfo}>{ROUTE_NO}번</Text>
              </View>
              <View style={styles.busList}>
                <Text style={styles.busTit}>승차정류장</Text>
                <Text style={styles.busInfo}>{departureStation}</Text>
              </View>
              <View style={styles.busList}>
                <Text style={styles.busTit}>하차정류장</Text>
                <Text style={styles.busInfo}>{arrivalStation}</Text>
              </View>
              {statusPos !== false ? (
                <View style={{ ...styles.busList, borderBottomWidth: 0 }}>
                  <Text style={styles.busTit}>버스위치</Text>
                  <Text style={styles.busInfo}>
                    {statusPos}정류장 전 ({extimeMin}분)
                  </Text>
                </View>
              ) : (
                <View></View>
              )}

              {extimeMin !== false || statusPos !== false ? (
                <TouchableHighlight
                  style={{ ...styles.onButton, marginTop: 10 }}
                  underlayColor={"#333FDA"}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>탑승 취소</Text>
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  style={{ ...styles.onButton, marginTop: 10 }}
                  underlayColor={"#333FDA"}
                  onPress={handleSubmit(onSubmit2)}
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>하차 완료</Text>
                </TouchableHighlight>
              )}
            </View>
          ) : (
            <View
              style={[
                styles.shadow,
                styles.contBox,
                styles.marginTop15,
                styles.nonebus,
              ]}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#8D8E93",
                  textAlign: "center",
                  paddingVertical: 20,
                }}
              >
                탑승요청한 버스가 없습니다.
              </Text>
            </View>
          )}

          {/* [예약 없을 시] 버스예약확인 */}
          {/* <View
            style={{ ...styles.emptyLine2, marginTop: 30, marginBottom: 10 }}
          ></View> */}

          <View style={[styles.menuListWrap, styles.marginPull]}>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              style={{ ...styles.menuBtn, justifyContent: "center" }}
              onPress={() => {
                navigation.navigate("ChargeListScreen");
              }}
            >
              <View style={styles.menuBox}>
                <Icon name="exchange" type="light" size={18} color={"#111"} />
                {/* <Image
                  style={styles.menuIcon}
                  source={require("../../../assets/menu_icon01.png")}
                /> */}
                <Text style={styles.menuText}>사용 및 충전 내역</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate("NoticeScreen");
              }}
            >
              <View style={styles.menuBox}>
                <Icon name="bullhorn" type="light" size={20} color={"#111"} />
                <Text style={styles.menuText}>공지사항</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              style={styles.menuBtn}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {
                navigation.navigate("AccountInfoScreen", {
                  userId: data.UserInfo.userId,
                  needHelp: data.UserInfo.needHelp,
                  equipment: data.UserInfo.equipment,
                  equipmentName: data.UserInfo.equipmentName,
                });
              }}
            >
              <View style={styles.menuBox}>
                <Icon name="user" type="light" size={20} color={"#111"} />
                <Text style={styles.menuText}>계정관리</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              style={styles.menuBtn}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {
                navigation.navigate("CustomerCenterScreen");
              }}
            >
              <View style={styles.menuBox}>
                <Icon name="envelope" type="light" size={20} color={"#111"} />
                <Text style={styles.menuText}>고객센터</Text>
              </View>
            </TouchableRipple>

            <TouchableRipple
              style={styles.menuBtn}
              rippleColor="rgba(0, 0, 0, .06)"
              underlayColor={"#f5f5f5"}
              onPress={() => {
                navigation.navigate("ServiceGuideScreen");
              }}
            >
              <View style={styles.menuBox}>
                <Icon
                  name="info-circle"
                  type="light"
                  size={20}
                  color={"#111"}
                />
                <Text style={styles.menuText}>이용안내</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...style,
  chargeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cont: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  marginTop15: {
    marginTop: 15,
  },
  mT5: {
    marginTop: 5,
  },
  mT10: {
    marginTop: 10,
  },
  mT15: {
    marginTop: 15,
  },
  mT20: {
    marginTop: 20,
  },
  mT25: {
    marginTop: 25,
  },
  mT30: {
    marginTop: 30,
  },
  mB5: {
    marginBottom: 5,
  },
  mB10: {
    marginBottom: 10,
  },
  mB15: {
    marginBottom: 15,
  },
  mB20: {
    marginBottom: 20,
  },
  mB25: {
    marginBottom: 25,
  },
  mB30: {
    marginBottom: 30,
  },
  contBox: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  noneBus: {
    justifyContent: "center",
    alignItems: "center",
  },
  myPoint: {
    borderRadius: 8,
    borderTopLeftRadius: 0,
    backgroundColor: "#4B56F1",

    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 76,
  },
  myPointTxt: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  myPointNumber: {
    fontSize: 28,
    marginTop: 2,
    color: "#4B56F1",
    fontWeight: "bold",
  },
  busList: {
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
  },
  busTit: {
    fontSize: 15,
    width: 100,
    color: "#333",
    fontWeight: "bold",
  },
  busInfo: {
    fontSize: 15,
    textAlign: "right",
    color: "#4B56F1",
    fontWeight: "bold",
    flex: 1,
  },
  onButton: {
    backgroundColor: "#4B56F1",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 4,
  },
  menuListWrap: {
    marginTop: 20,
  },
  menuBtn: {
    height: 56,
    justifyContent: "center",
    paddingLeft: theme.SIZES.BASE * 1.2,
    paddingRight: theme.SIZES.BASE * 1.2,
  },
  menuBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 17,
    marginLeft: 8,
  },
  menuIcon: {
    resizeMode: "contain",
    width: 18,
    height: 18,
  },
});
