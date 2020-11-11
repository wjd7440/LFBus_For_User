import React, { useEffect, useState, Component } from "react";
import { Text } from "react-native-paper";
import RadioGroup from "../../../components/RadioGroup";
import CheckBox from "react-native-check-box";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Picker,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-apollo-hooks";
import { Block, theme } from "galio-framework";
import { useQuery } from "react-apollo-hooks";
import { ACCOUNT_INFO_QUERY, ACCOUNT_EDIT_QUERY } from "../Queries";
import style from "../../../constants/style";
const sexArray = [
  {
    label: "남성",
    value: "남성",
    selected: false,
  },
  {
    label: "여성",
    value: "여성",
    selected: false,
  },
];
const equipmentArray = [
  {
    backgroundBtnColor: "#FFF6E3",
    backgroundIconColor: "#FDB62B",
    label: "수동휠체어",
    value: "0",
    selected: false,
  },
  {
    backgroundBtnColor: "#FFF6E3",
    backgroundIconColor: "#FDB62B",
    label: "전동휠체어",
    value: "1",
    selected: false,
  },
  {
    backgroundBtnColor: "#FFF6E3",
    backgroundIconColor: "#FDB62B",
    label: "전동스쿠터",
    value: "2",
    selected: false,
  },
  {
    backgroundBtnColor: "#FFF6E3",
    backgroundIconColor: "#FDB62B",
    label: "유모차",
    value: "3",
    selected: false,
  },
  {
    backgroundBtnColor: "#FFF6E3",
    backgroundIconColor: "#FDB62B",
    label: "없음",
    value: "4",
    selected: false,
  },
];

export default ({ navigation, route }) => {
  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      userId: route.params.userId,
      needHelp: route.params.needHelp,
      equipment: route.params.equipment,
      equipmentName: route.params.equipmentName,
    },
  });
  const [equipmentName, setEquipmentName] = useState();
  const { data, loading } = useQuery(ACCOUNT_INFO_QUERY, {
    fetchPolicy: "network-only",
  });
  const [accountEditMutation] = useMutation(ACCOUNT_EDIT_QUERY, {
    refetchQueries: () => [{ query: ACCOUNT_INFO_QUERY }],
  });
  const onSubmit = async (data) => {
    try {
      const {
        data: { UserAccountEdit },
      } = await accountEditMutation({
        variables: {
          equipment: data.equipment,
          equipmentName: equipmentName,
          needHelp: data.needHelp,
        },
      });
      if (UserAccountEdit) {
        Alert.alert("회원정보 변경이 완료되었습니다. 감사합니다.");
        navigation.navigate("AccountInfoScreen");
      } else {
        Alert.alert("회원정보 변경에 실패했습니다. 다시 시도해주세요.");
        navigation.navigate("AccountEditScreen");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("회원정보 변경에 실패했습니다. 다시 시도해주세요.");
      navigation.navigate("AccountEditScreen");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        // behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header
          back
          title={"내 정보 수정"}
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />

        <ScrollView>
          <View style={{ ...styles.container }}>
            <View style={[styles.formArea]}>
              <View style={styles.sectionTitBox}>
                <Text style={styles.sectionTit}>등록된 내 정보</Text>
              </View>
            </View>
            <View style={styles.formArea}>
              <View style={styles.formControl}>
                <Text style={styles.question}>사용하는 보조기구</Text>
                <RadioGroup
                  radioButtons={equipmentArray}
                  onPress={(data) => {
                    const item = data.find((equipment) => {
                      if (equipment.selected === true) {
                        return equipment;
                      }
                    });
                    setValue("equipment", item.value, true);
                    setEquipmentName(item.label);
                  }}
                  flexDirection="column"
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.question}>
                  어떤 도움이 필요하신가요? (선택)
                </Text>
                <View>
                  <TextInput
                    style={styles.textForm}
                    placeholder={
                      "ex) 교통카드를 대신 찍어주세요. / 괜찮습니다."
                    }
                    name="needHelp"
                    value={watch("needHelp")}
                    onChangeText={(text) => {
                      setValue("needHelp", text, true);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View>
          <TouchableHighlight
            underlayColor={"#333FDA"}
            style={{ ...styles.onButton }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonTxt}>회원 정보 수정</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ...style,

  formArea: {
    width: "100%",
  },
  signTit: {
    fontSize: hp("4%"),
    color: "#4B56F1",
    marginTop: hp("5%"),
    marginBottom: hp("3%"),
  },

  question: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 7,
  },
  textForm: {
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 0,
    paddingRight: 5,
    marginBottom: 8,
    fontSize: 16,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#46c3ad",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "white",
  },
  onButton: {
    backgroundColor: "#4B56F1",
    width: "100%",
    height: hp("7.6%"),
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 4,
  },
  offButton: {
    backgroundColor: "#fff",
    width: "100%",
    height: hp("7.6%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonTxt: {
    fontSize: 16,
    color: "white",
  },
  errorTxt: {
    color: "#FF3B3B",
    fontSize: 13,
  },
});
