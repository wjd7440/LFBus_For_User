import React, { Component } from "react";
import { useFonts } from "@use-expo/font";
import style from "../../../constants/style";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
export default ({ navigation }) => {
  const fonts = useFonts({
    "NotoSansKR-Thin": require("../../../assets/fonts/NotoSansKR-Thin.otf"),
    "NotoSansKR-Light": require("../../../assets/fonts/NotoSansKR-Light.otf"),
    "NotoSansKR-Regular": require("../../../assets/fonts/NotoSansKR-Regular.otf"),
    "NotoSansKR-Medium": require("../../../assets/fonts/NotoSansKR-Medium.otf"),
    "NotoSansKR-Bold": require("../../../assets/fonts/NotoSansKR-Bold.otf"),
    "NotoSansKR-Black": require("../../../assets/fonts/NotoSansKR-Black.otf"),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={{ ...styles.container }}>
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
            <Text style={styles.myPointTxt}>내 포인트</Text>
            <Text style={styles.myPointNumber}>8,850 P</Text>
          </View>
          <TouchableHighlight
            underlayColor={"#f5f5f5"}
            style={{ justifyContent: "center", padding: 20, width: "30%" }}
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
          </TouchableHighlight>
        </View>

        {/* [예약 했을 시] 버스예약확인 */}
        <View style={[styles.shadow, styles.contBox, styles.marginTop15]}>
          <Text style={{ fontSize: 13, color: "#8D8E93", marginBottom: 5 }}>
            탑승할 버스를 확인해주세요.
          </Text>
          <View style={styles.busList}>
            <Text style={styles.busTit}>탑승버스</Text>
            {/* 사용자가 선택한 버스를 넣어주세요. */}
            <Text style={styles.busInfo}>101번</Text>
          </View>
          <View style={styles.busList}>
            <Text style={styles.busTit}>승차정류장</Text>
            {/* 승차정류장을 넣어주세요. */}
            <Text style={styles.busInfo}>중앙로역6번출구</Text>
          </View>
          <View style={styles.busList}>
            <Text style={styles.busTit}>하차정류장</Text>
            {/* 하차정류장을 넣어주세요. */}
            <Text style={styles.busInfo}>유성온천역7번출구</Text>
          </View>
          <View style={{ ...styles.busList, borderBottomWidth: 0 }}>
            <Text style={styles.busTit}>버스위치</Text>
            {/* 버스위치와 몇분 후 도착하는지를 넣어주세요. */}
            <Text style={styles.busInfo}>목척교{"\n"}(2분후 도착)</Text>
          </View>
          {/* 탑승 취소 버튼 */}
          <TouchableHighlight
            style={{ ...styles.onButton, marginTop: 10 }}
            underlayColor={"#333FDA"}
          >
            <Text style={{ fontSize: 16, color: "#fff" }}>탑승 취소</Text>
          </TouchableHighlight>
        </View>

        {/* [예약 없을 시] 버스예약확인 */}
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

        <View style={styles.menuListWrap}>
          <TouchableHighlight style={styles.menuBtn} underlayColor={"#f5f5f5"}>
            <View style={styles.menuBox}>
              <Image
                style={styles.menuIcon}
                source={require("../../../assets/menu_icon01.png")}
              />
              <Text style={styles.menuText}>사용 및 충전 내역</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.menuBtn} underlayColor={"#f5f5f5"}>
            <View style={styles.menuBox}>
              <Image
                style={styles.menuIcon}
                source={require("../../../assets/menu_icon02.png")}
              />
              <Text style={styles.menuText}>공지사항</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.menuBtn} underlayColor={"#f5f5f5"}>
            <View style={styles.menuBox}>
              <Image
                style={styles.menuIcon}
                source={require("../../../assets/menu_icon03.png")}
              />
              <Text style={styles.menuText}>계정관리</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.menuBtn} underlayColor={"#f5f5f5"}>
            <View style={styles.menuBox}>
              <Image
                style={styles.menuIcon}
                source={require("../../../assets/menu_icon04.png")}
              />
              <Text style={styles.menuText}>고객센터</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight style={styles.menuBtn} underlayColor={"#f5f5f5"}>
            <View style={styles.menuBox}>
              <Image
                style={styles.menuIcon}
                source={require("../../../assets/menu_icon05.png")}
              />
              <Text style={styles.menuText}>이용안내</Text>
            </View>
          </TouchableHighlight>

          {/* <TouchableHighlight
        underlayColor={"#f5f5f5"}
        onPress={() => {
          navigation.navigate("ReservationCheckScreen");
        }}
      >
        <Text>버스 예약 확인</Text>
      </TouchableHighlight> */}

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("RouteScreen");
            }}
          >
            <Text>경로 검색</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
<<<<<<< Updated upstream
  ...style,
=======
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
  },
  shadow: {
    backgroundColor: "#fff",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
    }),
  },
>>>>>>> Stashed changes
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
  contBox: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  noneBus: {
    justifyContent: "center",
    alignItems: "center",
  },
  myPointTxt: {
    borderRadius: 8,
    borderTopLeftRadius: 0,
    backgroundColor: "#4B56F1",
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 76,
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
    marginTop: 30,
  },
  menuBtn: {
    height: 50,
  },
<<<<<<< Updated upstream
=======
  menuBtn: {
    height: 50,
  },
>>>>>>> Stashed changes
  menuBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 17,
<<<<<<< Updated upstream
    marginLeft: 12,
    color: "#333",
=======
    marginLeft: 8,
>>>>>>> Stashed changes
  },
  menuIcon: {
    resizeMode: "contain",
    width: 22,
    height: 22,
  },
});
