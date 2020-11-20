import React, { useEffect, useState, Component } from "react";
import { Text } from "react-native-paper";
import RadioGroup from "../../../components/RadioGroup";
import CheckBox from "react-native-check-box";
import RNPickerSelect from "react-native-picker-select";
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
import { useForm } from "react-hook-form";
import { Header } from "../../../components";
import { useMutation } from "react-apollo-hooks";
import { SIGNUP_QUERY, USERID_CHECK_QUERY } from "../Queries";
import { Block, theme } from "galio-framework";
import Provision1Modal from "./Provision1Modal";
import { ScrollView } from "react-native-gesture-handler";
import style from "../../../constants/style";

const localGuArray = [
  {
    label: "동구",
    value: 0,
  },
  {
    label: "중구",
    value: 1,
  },
  {
    label: "서구",
    value: 2,
  },
  {
    label: "유성구",
    value: 3,
  },
  {
    label: "대덕구",
    value: 4,
  },
];

const localArray = [
  {
    0: {
      displayText: "동구",
      localDongCode: {
        1: "가양1동",
        2: "가양2동",
        3: "가양동",
        4: "가오동",
        5: "구도동",
        6: "낭월동",
        7: "내탑동",
        8: "대동",
        9: "대별동",
        10: "대성동",
        11: "대청동",
        12: "마산동",
        13: "비룡동",
        14: "사성동",
        15: "산내동",
        16: "삼괴동",
        17: "삼성동",
        18: "삼정동",
        19: "상소동",
        20: "성남동",
        21: "세천동",
        22: "소제동",
        23: "소호동",
        24: "신상동",
        25: "신안동",
        26: "신인동",
        27: "신촌동",
        28: "신하동",
        29: "신흥동",
        30: "오동",
        31: "용계동",
        32: "용운동",
        33: "용전동",
        34: "원동",
        35: "이사동",
        36: "인동",
        37: "자양동",
        38: "장척동",
        39: "정동",
        40: "주산동",
        41: "주촌동",
        42: "중동",
        43: "중앙동",
        44: "직동",
        45: "천동",
        46: "추동",
        47: "판암1동",
        48: "판암2동",
        49: "판암동",
        50: "하소동",
        51: "홍도동",
        52: "효동",
        53: "효평동",
      },
    },
    1: {
      displayText: "중구",
      local_dong_code: {
        60: "구완동",
        61: "금동",
        62: "대사동",
        63: "대흥동",
        64: "목달동",
        65: "목동",
        66: "무수동",
        67: "문창동",
        68: "문화1동",
        69: "문화2동",
        70: "문화동",
        71: "부사동",
        72: "사정동",
        73: "산성동",
        74: "석교동",
        75: "선화동",
        76: "안영동",
        77: "어남동",
        78: "오류동",
        79: "옥계동",
        80: "용두동",
        81: "유천1동",
        82: "유천2동",
        83: "유천동",
        84: "은행동",
        85: "은행선화동",
        86: "정생동",
        87: "중촌동",
        88: "침산동",
        89: "태평1동",
        90: "태평2동",
        91: "태평동",
        92: "호동",
      },
    },
    2: {
      displayText: "서구",
      local_dong_code: {
        100: "가수원동",
        101: "가장동",
        102: "갈마1동",
        103: "갈마2동",
        104: "갈마동",
        105: "관저1동",
        106: "관저동",
        107: "관저2동",
        108: "괴곡동",
        109: "괴정동",
        110: "기성동",
        111: "내동",
        112: "도마1동",
        113: "도마2동",
        114: "도마동",
        115: "도안동",
        116: "둔산1동",
        117: "둔산2동",
        118: "둔산3동",
        119: "둔산동",
        120: "만년동",
        121: "매노동",
        122: "변동",
        123: "복수동",
        124: "봉곡동",
        125: "산직동",
        126: "오동",
        127: "용문동",
        128: "용촌동",
        129: "우명동",
        130: "원정동",
        131: "월평1동",
        132: "월평2동",
        133: "월평3동",
        134: "월평동",
        135: "장안동",
        136: "정림동",
        137: "탄방동",
        138: "평촌동",
        139: "흑성동",
      },
    },
    3: {
      displayText: "유성구",
      local_dong_code: {
        145: "가정동",
        146: "갑동",
        147: "계산동",
        148: "관평동",
        149: "교촌동",
        150: "구룡동",
        151: "구성동",
        152: "구암동",
        153: "구즉동",
        154: "궁동",
        155: "금고동",
        156: "금탄동",
        157: "노은1동",
        158: "노은2동",
        159: "노은3동",
        160: "노은동",
        161: "대동",
        162: "대정동",
        163: "덕명동",
        164: "덕진동",
        165: "도룡동",
        166: "둔곡동",
        167: "문지동",
        168: "반석동",
        169: "방동",
        170: "방현동",
        171: "복용동",
        172: "봉명동",
        173: "봉산동",
        174: "상대동",
        175: "성북동",
        176: "세동",
        177: "송강동",
        178: "송정동",
        179: "수남동",
        180: "신동",
        181: "신봉동",
        182: "신성동",
        183: "안산동",
        184: "어은동",
        185: "온천1동",
        186: "온천2동",
        187: "외삼동",
        188: "용계동",
        189: "용산동",
        190: "원내동",
        191: "원신흥동",
        192: "원촌동",
        193: "자운동",
        194: "장대동",
        195: "장동",
        196: "전민동",
        197: "죽동",
        198: "지족동",
        199: "진잠동",
        200: "추목동",
        201: "탑립동",
        202: "하기동",
        203: "학하동",
        204: "화암동",
      },
    },
    4: {
      displayText: "대덕구",
      local_dong_code: {
        230: "갈전동",
        231: "대화동",
        232: "덕암동",
        233: "목상동",
        234: "문평동",
        235: "미호동",
        236: "법1동",
        237: "법2동",
        238: "법동",
        239: "부수동",
        240: "비래동",
        241: "삼정동",
        242: "상서동",
        243: "석봉동",
        244: "송촌동",
        245: "신대동",
        246: "신일동",
        247: "신탄진동",
        248: "연축동",
        249: "오정동",
        250: "와동",
        251: "용호동",
        252: "읍내동",
        253: "이현동",
        254: "장동",
        255: "중리동",
        256: "평촌동",
        257: "환호동",
        258: "회덕동",
      },
    },
  },
];

const sexArray = [
  {
    label: "남성",
    value: "남성",
    selected: true,
  },
  {
    label: "여성",
    value: "여성",
    selected: false,
  },
];
const equipmentArray = [
  {
    label: "수동휠체어",
    value: "0",
    selected: true,
  },
  {
    label: "전동휠체어",
    value: "1",
    selected: false,
  },
  {
    label: "전동스쿠터",
    value: "2",
    selected: false,
  },
  {
    label: "유모차",
    value: "3",
    selected: false,
  },
  {
    label: "없음",
    value: "4",
    selected: false,
  },
];

const ageArray = [
  {
    label: "10대",
    value: "10",
  },
  {
    label: "20대",
    value: "20",
  },
  {
    label: "30대",
    value: "30",
  },
  {
    label: "40대",
    value: "40",
  },
  {
    label: "50대",
    value: "50",
  },
  {
    label: "60대",
    value: "60",
  },
  {
    label: "70대 이상",
    value: "70",
  },
];

export default ({ navigation }) => {
  const [gu, setGu] = useState(0);
  const [age, setAge] = useState(0);
  const [equipmentName, setEquipmentName] = useState();
  const [allProvision, setAllProvision] = useState(false);
  const [provision1IsVisible, setProvision1IsVisible] = useState(false);
  const [signupMutation] = useMutation(SIGNUP_QUERY);
  const [loaded, setLoaded] = useState(false);
  const { register, setValue, handleSubmit, errors, watch } = useForm();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [UserIdCheckMutation] = useMutation(USERID_CHECK_QUERY);
  const provision1ToggleModal = () => {
    setProvision1IsVisible(!provision1IsVisible);
  };
  const pickerStyle = {
    inputIOS: {
      color: "#111",
      paddingTop: 13,
      paddingHorizontal: 8,
      paddingBottom: 12,
      fontSize: 16,
    },
    inputAndroid: {
      color: "#111",
      borderBottomWidth: 1,
    },
    placeholderColor: "#111",
    underline: { borderTopWidth: 1 },
  };
  const onSubmit = async (data) => {
    console.log(data);
    setLoaded(true);
    try {
      const {
        data: { USERID_CHECK_QUERY },
      } = await UserIdCheckMutation({
        variables: {
          userId: data.userId,
        },
      });
      if (!USERID_CHECK_QUERY) {
        const {
          data: { UserSignUp },
        } = await signupMutation({
          variables: {
            userId: data.userId,
            password: data.password,
            sex: data.sex,
            // gu: gu,
            equipment: data.equipment,
            equipmentName: equipmentName,
            needHelp: data.needHelp,
          },
        });
        if (UserSignUp) {
          Alert.alert("회원가입이 완료되었습니다. 감사합니다.");
          navigation.navigate("LoginScreen");
        } else {
          setLoaded(false);
          Alert.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
          navigation.navigate("SignUpScreen");
        }
      } else {
        Alert.alert("이미 등록된 아이디 입니다1.");
      }
    } catch (e) {
      console.log(e);
      setLoaded(false);
      Alert.alert("이미 등록된 아이디입니다2.");
      navigation.navigate("SignUpScreen");
    }
  };
  useEffect(() => {
    register(
      { name: "userId" },
      {
        required: "아이디를 입력해주세요.",
        minLength: {
          value: 6,
          message: "아이디를 6자리로 입력해주세요.",
        },
        validate: (value) => {
          return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "이메일 주소를 다시 확인해주세요."
            : undefined;
        },
      }
    );
    register(
      { name: "password" },
      {
        required: "비밀번호를 입력해주세요.",
        minLength: {
          value: 6,
          message: "비밀번호를 6자이상 입력해주세요.",
        },
      }
    );
    register(
      { name: "passwordConfirm" },
      {
        required: "비밀번호를 한번 더 입력해주세요.",
        validate: (value) => {
          return value !== watch("password")
            ? "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
            : undefined;
        },
      }
    );
    register({ name: "sex" }, { required: "성별을 선택해주세요." });
    // register({ name: "gu" }, { required: "거주지를 선택해주세요." });
    register(
      { name: "equipment" },
      {
        required: "보조기구를 선택해주세요.",
      }
    );
    register(
      { name: "provision1" },
      { required: "서비스 이용약관에 동의해주세요." }
    );
  }, [register]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight =
          event.endCoordinates.height > 100
            ? Platform.OS == "ios"
              ? event.endCoordinates.height
              : 0
            : 0;

        setKeyboardHeight(keyboardHeight);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (event) => {
        setKeyboardHeight(0);
      }
    );
    setValue("sex", "남성");
    setValue("equipment", "0");
    setEquipmentName("수동휠체어");
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header
          // back
          title="회원가입"
          close
          closeNavigate={"LoginScreen"}
          navigation={navigation}
        />
        <ScrollView>
          <View style={{ ...styles.container }}>
            <View style={styles.formArea}>
              <Text style={styles.signTit}>평등한 사회로{"\n"}한걸음</Text>
              <View style={styles.formControl}>
                <Text style={styles.question}>아이디(이메일)</Text>
                <TextInput
                  style={styles.textForm}
                  placeholder={"아이디를(이메일) 입력해주세요."}
                  name="userId"
                  onChangeText={(text) => {
                    var lowerCase = text.toLowerCase();
                    setValue("userId", lowerCase, true);
                  }}
                />
                {errors.userId && (
                  <Block>
                    <Text style={styles.errorTxt}>{errors.userId.message}</Text>
                  </Block>
                )}
              </View>
              <View style={styles.formControl}>
                <Text style={styles.question}>비밀번호</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textForm}
                  placeholder={"비밀번호를 입력해주세요."}
                  name="password"
                  onChangeText={(text) => {
                    setValue("password", text, true);
                  }}
                />
                {errors.password && (
                  <Block>
                    <Text style={styles.errorTxt}>
                      {errors.password.message}
                    </Text>
                  </Block>
                )}
              </View>
              <View style={styles.formControl}>
                <Text style={styles.question}>비밀번호 확인</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textForm}
                  placeholder={"비밀번호를 확인해주세요."}
                  name="passwordConfirm"
                  onChangeText={(text) => {
                    setValue("passwordConfirm", text, true);
                  }}
                />
                {errors.passwordConfirm && (
                  <Block>
                    <Text style={styles.errorTxt}>
                      {errors.passwordConfirm.message}
                    </Text>
                  </Block>
                )}
              </View>
              <View style={styles.formControl}>
                <Text style={styles.question}>성별</Text>

                <RadioGroup
                  radioButtons={sexArray}
                  onPress={(data) => {
                    const item = data.find((sex) => {
                      if (sex.selected === true) {
                        return sex;
                      }
                    });
                    setValue("sex", item.value, true);
                  }}
                  flexDirection="row"
                />
              </View>

              <View style={styles.formControl}>
                <Text style={styles.question}>연령대</Text>
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#ddd",
                  }}
                >
                  <RNPickerSelect
                    name="age"
                    placeholder={{
                      label: "연령대 선택",
                      value: null,
                    }}
                    placeholderTextColor="blue"
                    style={pickerStyle}
                    onValueChange={(value) => setAge(value)}
                    items={ageArray}
                  />
                </View>
              </View>

              <View style={styles.formControl}>
                <Text style={styles.question}>거주지</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      marginRight: 4,
                      borderColor: "#ddd",
                    }}
                  >
                    <RNPickerSelect
                      name="gu"
                      placeholder={{
                        label: "구 선택",
                        value: null,
                      }}
                      placeholderTextColor="blue"
                      style={pickerStyle}
                      onValueChange={(value) => setGu(value)}
                      items={localGuArray}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      marginLeft: 4,
                      borderColor: "#ddd",
                    }}
                  >
                    <RNPickerSelect
                      name="dong"
                      placeholder={{
                        label: "동 선택",
                        value: null,
                      }}
                      style={pickerStyle}
                      onValueChange={(value) => setGu(value)}
                      items={localGuArray}
                    />
                  </View>
                </View>
              </View>

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
                    console.log(equipmentName);
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
                    onChangeText={(text) => {
                      setValue("needHelp", text, true);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  ...styles.formControl,
                  marginTop: 30,
                  marginBottom: 40,
                }}
              >
                <Text style={{ ...styles.question, fontSize: 24 }}>
                  약관동의
                </Text>
                <View
                  style={{
                    justifyContent: "space-between",
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity style={{ flex: 1 }}>
                    <CheckBox
                      rightTextStyle={{
                        color: "#111",
                        fontSize: 15,
                        lineHeight: 32,
                      }}
                      onClick={() => {
                        setValue("provision1", !watch("provision1"), true);
                        if (watch("provision1") === true) {
                          setAllProvision(true);
                        } else {
                          setAllProvision(false);
                        }
                      }}
                      checkBoxColor={"#A1A1A1"}
                      checkedCheckBoxColor={"#4B56F1"}
                      rightText={"서비스 이용약관 동의"}
                      isChecked={watch("provision1")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      provision1ToggleModal();
                    }}
                  >
                    <Text
                      style={{
                        color: "#979797",
                        textDecorationLine: "underline",
                      }}
                      size={14}
                    >
                      상세보기
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.provision1 && (
                  <Block>
                    <Text style={styles.errorTxt}>
                      {errors.provision1.message}
                    </Text>
                  </Block>
                )}
              </View>
            </View>
            <Provision1Modal
              isVisible={provision1IsVisible}
              toggleModal={provision1ToggleModal}
            />
          </View>
          <View>
            <TouchableHighlight
              underlayColor={"#333FDA"}
              style={{ ...styles.onButton }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonTxt}>회원가입</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
  },
  formArea: {
    width: "100%",
  },
  signTit: {
    fontSize: hp("4%"),
    color: "#4B56F1",
    marginTop: hp("5%"),
    marginBottom: hp("3%"),
  },
  formControl: {
    marginBottom: 30,
  },
  question: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  textForm: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    height: hp("6%"),
    paddingLeft: 0,
    paddingRight: 5,
    marginBottom: 8,
    fontSize: 16,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
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
  sel_placeholder: {
    color: "#111",
    borderBottomWidth: 1,
  },
  sel_inputAnd: {
    backgroundColor: "blue",
  },
  sel_inputIOS: {},
});
