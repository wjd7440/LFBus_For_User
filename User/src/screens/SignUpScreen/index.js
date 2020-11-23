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
    value: 1,
  },
  {
    label: "중구",
    value: 2,
  },
  {
    label: "서구",
    value: 3,
  },
  {
    label: "유성구",
    value: 4,
  },
  {
    label: "대덕구",
    value: 5,
  },
];

const localDongArray = {
    1: {      
      local_dong_code: [
        {
          label: "가양1동",
          value: 0,
        },
        {
          label: "가양2동",
          value: 1,
        },
        {
          label: "가양동",
          value: 2,
        },
        {
          label: "가오동",
          value: 3,
        },
        {
          label: "구도동",
          value: 4,
        },
        {
          label: "낭월동",
          value: 5,
        },
        {
          label: "내탑동",
          value: 6,
        },
        {
          label: "대동",
          value: 7,
        },
        {
          label: "대별동",
          value: 8,
        },
        {
          label: "대성동",
          value: 9,
        },
        {
          label: "대청동",
          value: 10,
        },
        {
          label: "마산동",
          value: 11,
        },
        {
          label: "비룡동",
          value: 12,
        },
        {
          label: "사성동",
          value: 13,
        },
        {
          label: "산내동",
          value: 14,
        },
        {
          label: "삼괴동",
          value: 15,
        },
        {
          label: "삼성동",
          value: 16,
        },
        {
          label: "상소동",
          value: 17,
        },
        {
          label: "성남동",
          value: 18,
        },
        {
          label: "세천동",
          value: 19,
        },
        {
          label: "소제동",
          value: 20,
        },
        {
          label: "소호동",
          value: 21,
        },
        {
          label: "신상동",
          value: 22,
        },
        {
          label: "신안동",
          value: 23,
        },
        {
          label: "신인동",
          value: 24,
        },
        {
          label: "신촌동",
          value: 25,
        },
        {
          label: "신하동",
          value: 26,
        },
        {
          label: "신흥동",
          value: 27,
        },
        {
          label: "오동",
          value: 28,
        },
        {
          label: "용계동",
          value: 29,
        },
        {
          label: "용운동",
          value: 30,
        },
        {
          label: "용전동",
          value: 31,
        },
        {
          label: "원동",
          value: 32,
        },
        {
          label: "이사동",
          value: 33,
        },
        {
          label: "인동",
          value: 34,
        },
        {
          label: "자양동",
          value: 35,
        },
        {
          label: "자양동",
          value: 36,
        },
        {
          label: "장척동",
          value: 37,
        },
        {
          label: "정동",
          value: 38,
        },
        {
          label: "주산동",
          value: 39,
        },
        {
          label: "주촌동",
          value: 40,
        },
        {
          label: "중동",
          value: 41,
        },
        {
          label: "중앙동",
          value: 42,
        },
        {
          label: "직동",
          value: 43,
        },
        {
          label: "천동",
          value: 44,
        },
        {
          label: "추동",
          value: 45,
        },
        {
          label: "판암1동",
          value: 46,
        },
        {
          label: "판암2동",
          value: 47,
        },
        {
          label: "판암동",
          value: 48,
        },
        {
          label: "하소동",
          value: 49,
        },
        {
          label: "홍도동",
          value: 50,
        },
        {
          label: "효동",
          value: 51,
        },
        {
          label: "효평동",
          value: 52,
        },
      ]      
    },
    2: {      
      local_dong_code: [
        {
          label: "구완동",
          value: 0,
        },
        {
          label: "금동",
          value: 1,
        },
        {
          label: "대사동",
          value: 2,
        },
        {
          label: "대흥동",
          value: 3,
        },
        {
          label: "목달동",
          value: 4,
        },
        {
          label: "목동",
          value: 5,
        },
        {
          label: "무수동",
          value: 6,
        },
        {
          label: "문창동",
          value: 7,
        },
        {
          label: "문화1동",
          value: 8,
        },
        {
          label: "문화2동",
          value: 9,
        },
        {
          label: "문화동",
          value: 10,
        },
        {
          label: "부사동",
          value: 11,
        },
        {
          label: "사정동",
          value: 12,
        },
        {
          label: "산성동",
          value: 13,
        },
        {
          label: "석교동",
          value: 14,
        },
        {
          label: "선화동",
          value: 15,
        },
        {
          label: "안영동",
          value: 16,
        },
        {
          label: "어남동",
          value: 17,
        },
        {
          label: "오류동",
          value: 18,
        },
        {
          label: "옥계동",
          value: 19,
        },
        {
          label: "용두동",
          value: 20,
        },
        {
          label: "유천1동",
          value: 21,
        },
        {
          label: "유천2동",
          value: 22,
        },
        {
          label: "유천동",
          value: 23,
        },
        {
          label: "은행동",
          value: 24,
        },
        {
          label: "은행선화동",
          value: 25,
        },
        {
          label: "은행선화동",
          value: 26,
        },
        {
          label: "정생동",
          value: 27,
        },
        {
          label: "중촌동",
          value: 28,
        },
        {
          label: "침산동",
          value: 29,
        },
        {
          label: "태평1동",
          value: 30,
        },
        {
          label: "태평2동",
          value: 31,
        },
        {
          label: "태평동",
          value: 32,
        },
        {
          label: "호동",
          value: 33,
        },
      ]
    },
    3: {      
      local_dong_code: [
        {
          label: "가수원동",
          value: 0,
        },
        {
          label: "가장동",
          value: 1,
        },
        {
          label: "갈마1동",
          value: 2,
        },
        {
          label: "갈마2동",
          value: 3,
        },
        {
          label: "갈마동",
          value: 4,
        },
        {
          label: "관저1동",
          value: 5,
        },
        {
          label: "관저동",
          value: 6,
        },
        {
          label: "관저2동",
          value: 7,
        },
        {
          label: "괴곡동",
          value: 8,
        },
        {
          label: "괴정동",
          value: 9,
        },
        {
          label: "기성동",
          value: 10,
        },
        {
          label: "내동",
          value: 11,
        },
        {
          label: "도마1동",
          value: 12,
        },
        {
          label: "도마2동",
          value: 13,
        },
        {
          label: "도마동",
          value: 14,
        },
        {
          label: "도안동",
          value: 15,
        },
        {
          label: "둔산1동",
          value: 16,
        },
        {
          label: "둔산2동",
          value: 17,
        },
        {
          label: "둔산3동",
          value: 18,
        },
        {
          label: "둔산동",
          value: 19,
        },
        {
          label: "만년동",
          value: 20,
        },
        {
          label: "매노동",
          value: 21,
        },
        {
          label: "변동",
          value: 22,
        },
        {
          label: "복수동",
          value: 23,
        },
        {
          label: "봉곡동",
          value: 24,
        },
        {
          label: "산직동",
          value: 25,
        },
        {
          label: "오동",
          value: 26,
        },
        {
          label: "용문동",
          value: 27,
        },
        {
          label: "용촌동",
          value: 28,
        },
        {
          label: "우명동",
          value: 29,
        },
        {
          label: "원정동",
          value: 30,
        },
        {
          label: "월평1동",
          value: 31,
        },
        {
          label: "월평2동",
          value: 32,
        },
        {
          label: "월평3동",
          value: 33,
        },
        {
          label: "월평동",
          value: 34,
        },
        {
          label: "장안동",
          value: 35,
        },
        {
          label: "정림동",
          value: 36,
        },
        {
          label: "탄방동",
          value: 37,
        },
        {
          label: "평촌동",
          value: 38,
        },
        {
          label: "흑성동",
          value: 39,
        },
      ]
    },
    4: {      
      local_dong_code: [
        {
          label: "가정동",
          value: 0,
        },
        {
          label: "갑동",
          value: 1,
        },
        {
          label: "계산동",
          value: 2,
        },
        {
          label: "관평동",
          value: 3,
        },
        {
          label: "교촌동",
          value: 4,
        },
        {
          label: "구룡동",
          value: 5,
        },
        {
          label: "구성동",
          value: 6,
        },
        {
          label: "구암동",
          value: 7,
        },
        {
          label: "구즉동",
          value: 8,
        },
        {
          label: "궁동",
          value: 9,
        },
        {
          label: "금고동",
          value: 10,
        },
        {
          label: "금탄동",
          value: 11,
        },
        {
          label: "노은1동",
          value: 12,
        },
        {
          label: "노은2동",
          value: 13,
        },
        {
          label: "노은3동",
          value: 14,
        },
        {
          label: "노은동",
          value: 15,
        },
        {
          label: "대동",
          value: 16,
        },
        {
          label: "대정동",
          value: 17,
        },
        {
          label: "덕명동",
          value: 18,
        },
        {
          label: "덕진동",
          value: 19,
        },
        {
          label: "도룡동",
          value: 20,
        },
        {
          label: "둔곡동",
          value: 21,
        },
        {
          label: "문지동",
          value: 22,
        },
        {
          label: "반석동",
          value: 23,
        },
        {
          label: "방동",
          value: 24,
        },
        {
          label: "방현동",
          value: 25,
        },
        {
          label: "복용동",
          value: 26,
        },
        {
          label: "봉명동",
          value: 27,
        },
        {
          label: "봉산동",
          value: 28,
        },
        {
          label: "상대동",
          value: 29,
        },
        {
          label: "성북동",
          value: 30,
        },
        {
          label: "세동",
          value: 31,
        },
        {
          label: "송강동",
          value: 32,
        },
        {
          label: "송정동",
          value: 33,
        },
        {
          label: "수남동",
          value: 34,
        },
        {
          label: "신동",
          value: 35,
        },
        {
          label: "신봉동",
          value: 36,
        },
        {
          label: "신성동",
          value: 37,
        },
        {
          label: "안산동",
          value: 38,
        },
        {
          label: "어은동",
          value: 39,
        },
        {
          label: "온천1동",
          value: 40,
        },
        {
          label: "온천2동",
          value: 41,
        },
        {
          label: "외삼동",
          value: 42,
        },
        {
          label: "용계동",
          value: 43,
        },
        {
          label: "용산동",
          value: 44,
        },
        {
          label: "원내동",
          value: 45,
        },
        {
          label: "원내동",
          value: 46,
        },
        {
          label: "원신흥동",
          value: 47,
        },
        {
          label: "원촌동",
          value: 48,
        },
        {
          label: "자운동",
          value: 49,
        },
        {
          label: "장대동",
          value: 50,
        },
        {
          label: "장동",
          value: 51,
        },
        {
          label: "전민동",
          value: 52,
        },
        {
          label: "죽동",
          value: 53,
        },
        {
          label: "지족동",
          value: 54,
        },
        {
          label: "진잠동",
          value: 55,
        },
        {
          label: "추목동",
          value: 56,
        },
        {
          label: "탑립동",
          value: 57,
        },
        {
          label: "하기동",
          value: 58,
        },
        {
          label: "학하동",
          value: 59,
        },
        {
          label: "화암동",
          value: 60,
        },
      ]
    },
    5: {      
      local_dong_code: [
        {
          label: "갈전동",
          value: 0,
        },
        {
          label: "대화동",
          value: 1,
        },
        {
          label: "덕암동",
          value: 2,
        },
        {
          label: "목상동",
          value: 3,
        },
        {
          label: "문평동",
          value: 4,
        },
        {
          label: "미호동",
          value: 5,
        },
        {
          label: "법1동",
          value: 6,
        },
        {
          label: "법2동",
          value: 7,
        },
        {
          label: "법동",
          value: 8,
        },
        {
          label: "부수동",
          value: 9,
        },
        {
          label: "비래동",
          value: 10,
        },
        {
          label: "삼정동",
          value: 11,
        },
        {
          label: "상서동",
          value: 12,
        },
        {
          label: "석봉동",
          value: 13,
        },
        {
          label: "송촌동",
          value: 14,
        },
        {
          label: "신대동",
          value: 15,
        },
        {
          label: "신일동",
          value: 16,
        },
        {
          label: "신탄진동",
          value: 17,
        },
        {
          label: "연축동",
          value: 18,
        },
        {
          label: "오정동",
          value: 19,
        },
        {
          label: "와동",
          value: 20,
        },
        {
          label: "용호동",
          value: 21,
        },
        {
          label: "읍내동",
          value: 22,
        },
        {
          label: "이현동",
          value: 23,
        },
        {
          label: "장동",
          value: 24,
        },
        {
          label: "중리동",
          value: 25,
        },
        {
          label: "평촌동",
          value: 26,
        },
        {
          label: "환호동",
          value: 27,
        },
        {
          label: "회덕동",
          value: 28,
        },
      ],
    },
  };

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
    value: "10대",
  },
  {
    label: "20대",
    value: "20대",
  },
  {
    label: "30대",
    value: "30대",
  },
  {
    label: "40대",
    value: "40대",
  },
  {
    label: "50대",
    value: "50대",
  },
  {
    label: "60대",
    value: "60대",
  },
  {
    label: "70대 이상",
    value: "70대 이상",
  },
];

export default ({ navigation }) => {
  const [equipmentName, setEquipmentName] = useState();
  const [guName, setGuName] = useState();
  const [dongName, setDongName] = useState();
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
    console.log(guName,dongName);
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
            gu: data.gu,
            dong: data.dong,
            age: data.age,
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
    register({ name: "age" }, { required: "연령대를 선택해주세요." });
    register({ name: "gu" }, { required: "거주지를 선택해주세요." });
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
                  placeholder={"아이디(이메일)를 입력해주세요."}
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
                    onValueChange={(value) => setValue("age", value, true)}
                    items={ageArray}
                  />
                  {errors.age && (
                  <Block>
                    <Text style={styles.errorTxt}>{errors.age.message}</Text>
                  </Block>
                )}
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
                      onValueChange={(value) => setValue("gu",value, true)}                      
                      items={localGuArray}
                    />
                    {errors.gu && (
                    <Block>
                      <Text style={styles.errorTxt}>{errors.gu.message}</Text>
                    </Block>
                  )}
                  </View>
                  
                  {watch('gu') && (
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
                      onValueChange={(value) => setValue("dong",value, true)}
                      items={localDongArray[watch('gu')].local_dong_code}
                    />
                  </View>)}
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
