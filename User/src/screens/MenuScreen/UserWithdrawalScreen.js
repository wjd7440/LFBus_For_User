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
            <View style={styles.center}>
              <Image
                style={styles.trash}
                source={require("../../../assets/trash_icon.png")}
              />
              <Text
                style={{ textAlign: "center", fontSize: 15, lineHeight: 21 }}
              >
                탈퇴하시면 모든 정보와 구매내역이{"\n"}
                <Text style={{ color: "#FF4444" }}>
                  삭제되고 복구되지 않습니다.
                </Text>
                {"\n"}
                신중히 결정해 주세요.
              </Text>
            </View>
          </View>

          {/* //보유중인 포인트 내역 */}
          <View style={[styles.point]}>
            <Text
              style={{
                ...styles.pointTxt,
                opacity: 0.97,
              }}
            >
              보유포인트
            </Text>

            <NumberFormat
              value={maileage}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(maileage) => (
                <Text style={{ ...styles.pointTxt, fontSize: 18 }}>
                  1454{maileage}P
                </Text>
              )}
            />
          </View>
          {/* 보유중인 포인트 내역 끝 // */}
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
});
