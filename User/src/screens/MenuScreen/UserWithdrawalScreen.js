import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";
import NumberFormat from "react-number-format";
import { USER_MAILEAGE_WRITE_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import { useMutation } from "react-apollo-hooks";
import { TouchableRipple } from "react-native-paper";

export default ({ navigation, route }) => {
  const maileage = route.params ? route.params.maileage : null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Header
          back
          title={"회원탈퇴"}
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={([styles.center], { marginTop: 30 })}>
              {/* <Image
                style={styles.trash}
                source={require("../../../assets/trash_icon.png")}
              /> */}
              <Text
                style={{ textAlign: "center", fontSize: 15, lineHeight: 21 }}
              >
                회원 탈퇴하시면 모든 정보와 구매내역이{"\n"}
                <Text style={{ color: "#FF4444" }}>
                  삭제되고 복구되지 않습니다.
                </Text>
                {"\n"}
                신중히 결정해 주세요.
              </Text>
            </View>
            {/* //보유중인 포인트 내역 */}
            <View style={[styles.point]}>
              <Text
                style={{
                  ...styles.pointTxt,
                  opacity: 0.5,
                }}
              >
                보유중인 포인트
              </Text>

              <NumberFormat
                value={maileage}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(maileage) => (
                  <Text style={{ ...styles.maileageTxt, fontSize: 24 }}>
                    1454{maileage}
                    <Text style={{ fontWeight: "normal" }}>P</Text>
                  </Text>
                )}
              />
            </View>
            {/* 보유중인 포인트 내역 끝 // */}
            <View style={styles.grayBox}>
              <View style={styles.li}>
                <Text style={styles.liTit}>1. 회원정보 및 잔여포인트 삭제</Text>
                <Text style={styles.liTxt}>
                  보유하신 포인트는 회원탈퇴 즉시 모두 소멸됩니다. 포인트 환급
                  신청은 반드시 회원 탈퇴 전에 요청하셔야 하며, 탈퇴 후에는
                  포인트가 소멸되어 환급이 불가합니다.{"\n"}환급 신청 :
                  고객센터에서 환급신청{"\n"}환급 절차 : 고객님의 잔여 포인트
                  확인 후 고객님의 계좌로 입금
                </Text>
              </View>

              <View style={styles.li}>
                <Text style={styles.liTit}>2. 서비스의 정보 삭제</Text>
                <Text style={styles.liTxt}>
                  회원탈퇴 시 기존의 사용내역은 모두 삭제됩니다. 회원님께서
                  구매하신 구매이력과 고객지원을 위해 필요한 정보는
                  '개인정보처리방침'에 따라 일정기간 보관 뒤 삭제됩니다.
                </Text>
              </View>

              <View style={([styles.li], { marginBottom: 0 })}>
                <Text style={styles.liTit}>
                  3. 불량이용 및 이용제한에 관한 기록 1개월 동안 보관
                </Text>
                <Text style={styles.liTxt}>
                  개인정보처리방침에 따라 불량이용 및 이용제한에 관한 기록은
                  1개월 동안 삭제되지 않고 보관됩니다.
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableRipple
                rippleColor="rgba(255, 255, 255, .1)"
                underlayColor={"#f6f6f6"}
                style={styles.exitButton}
                onPress={() => {}}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>회원탈퇴</Text>
              </TouchableRipple>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...style,
  trash: {
    marginTop: 20,
    marginBottom: 20,
    resizeMode: "contain",
    width: 120,
    height: 120,
  },
  point: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  maileageTxt: {
    marginTop: 0,
    fontWeight: "bold",
    color: "#111",
  },
  grayBox: {
    marginTop: 25,
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 4,
  },
  li: {
    marginBottom: 15,
  },
  liTit: {
    fontSize: 12,
    color: "#111",
  },
  liTxt: {
    fontSize: 12,
    color: "#767676",
    lineHeight: 18,
  },
  exitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    height: 50,
  },
});
