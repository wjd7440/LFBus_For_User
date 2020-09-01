import React, { useEffect, useState, Component } from "react";
import { RadioButton, Text } from "react-native-paper";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useForm } from "react-hook-form";
import { useMutation } from "react-apollo-hooks";
import { SIGNUP_QUERY, USERID_CHECK_QUERY } from "../Queries";
import { Block, theme } from "galio-framework";

export default ({ navigation }) => {
  const [help, setHelp] = React.useState("true");
  const [signupMutation] = useMutation(SIGNUP_QUERY);
  const [loaded, setLoaded] = useState(false);
  const { register, setValue, handleSubmit, errors } = useForm();

  const [UserIdCheckMutation] = useMutation(USERID_CHECK_QUERY);

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
            needHelp: data.needHelp,
            equipment: data.equipment,
            memo: data.memo,
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
        Alert.alert("이미 등록된 아이디 입니다.");
      }
    } catch (e) {
      console.log(e);
      setLoaded(false);
      Alert.alert("이미 등록된 아이디입니다.");
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
      { name: "equipment" },
      {
        required: "보조기구를 입력해주세요.",
      }
    );
  }, [register]);

  return (
    <View>
      <View style={styles.formArea}>
        <Text style={styles.question}>아이디 : </Text>
        <TextInput
          style={styles.textForm}
          placeholder={"ID"}
          name="userId"
          onChangeText={(text) => {
            var lowerCase = text.toLowerCase();
            setValue("userId", lowerCase, true);
          }}
        />
        {errors.userId && (
          <Block>
            <Text color={"#F5365C"}>{errors.userId.message}</Text>
          </Block>
        )}
        <Text style={styles.question}>비밀번호 : </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textForm}
          placeholder={"Password"}
          name="password"
          onChangeText={(text) => {
            setValue("password", text, true);
          }}
        />
        {errors.password && (
          <Block>
            <Text color={"#F5365C"}>{errors.password.message}</Text>
          </Block>
        )}
        <Text style={styles.question}>어떤 도움이 필요하신가요? : </Text>
        <View>
          <TextInput
            style={styles.textForm}
            placeholder={"ex) 교통카드를 대신 찍어주세요. / 괜찮습니다."}
            name="needHelp"
            onChangeText={(text) => {
              setValue("needHelp", text, true);
            }}
          />
        </View>
        <Text style={styles.question}>보조기구 종류 : </Text>
        <TextInput
          style={styles.textForm}
          placeholder={"보조기구 종류"}
          name="equipment"
          onChangeText={(text) => {
            setValue("equipment", text, true);
          }}
        />
        {errors.equipment && (
          <Block>
            <Text color={"#F5365C"}>{errors.equipment.message}</Text>
          </Block>
        )}
        <Text style={styles.question}>메모</Text>
        <TextInput
          style={styles.textForm}
          placeholder={"메모"}
          name="memo"
          onChangeText={(text) => {
            setValue("memo", text, true);
          }}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text size={25}>가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("10%"),
    paddingRight: wp("10%"),
    justifyContent: "center",
  },
  titleArea: {
    width: "100%",
    padding: wp("10%"),
    alignItems: "center",
  },
  title: {
    fontSize: wp("8%"),
  },
  question: {
    fontSize: wp("6%"),
  },
  formArea: {
    width: "100%",
    paddingBottom: wp("10%"),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: "#888",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
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
});
