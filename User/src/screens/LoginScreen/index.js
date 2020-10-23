import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLogIn } from "../../../AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "react-apollo-hooks";
import { LOGIN_QUERY, TOKENUPDATE_QUERY } from "../Queries";
import { Block, theme } from "galio-framework";

export default ({ navigation }) => {
  const { register, setValue, handleSubmit, errors } = useForm();

  const signIn = useLogIn();
  const [loginMutation] = useMutation(LOGIN_QUERY);
  const [tokenUpdateMutation] = useMutation(TOKENUPDATE_QUERY);

  const [token, setToken] = useState(null);

  const onSubmit = async (data) => {
    try {
      const {
        data: { UserSignIn },
      } = await loginMutation({
        variables: {
          userId: data.userId,
          password: data.password,
        },
      });

      if (UserSignIn) {
        // await tokenUpdateMutation({
        //   variables: {
        //     userId: data.userId,
        //     password: data.password,
        //     deviceToken: token,
        //   },
        // });

        signIn(UserSignIn);
      } else {
        Alert.alert("등록된 아이디가 없습니다. 회원가입 후 이용해주세요.");
        navigation.navigate("LoginScreen");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("아이디 또는 비빌번호가 일치하지 않습니다.");
    }
  };

  // useEffect(() => {
  //   const tokenLoad = async () => {
  //     await messaging()
  //       .getToken()
  //       .then((token) => {
  //         setToken(token);
  //       });
  //   };
  //   tokenLoad();
  // }, []);

  useEffect(() => {
    register({ name: "userId" }, { required: "아이디를 입력해주세요." });
    register({ name: "password" }, { required: "비밀번호를 입력해주세요." });
  }, [register]);

  return (
    <View style={{ ...styles.container, marginTop: -50 }}>
      <View style={styles.titleArea}>
        <Image
          style={styles.loginLogo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <View style={styles.formArea}>
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
      <View style={styles.formArea}>
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
            <Text style={styles.errorTxt}>{errors.password.message}</Text>
          </Block>
        )}
      </View>
      <View style={{ ...styles.buttonArea }}>
        <TouchableHighlight
          underlayColor={"#333FDA"}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonTitle}>로그인</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={"#333FDA"}
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text style={styles.buttonTitle}>회원가입</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: wp("7%"),
    paddingRight: wp("7%"),
    justifyContent: "center",
  },
  titleArea: {
    width: "100%",
    paddingBottom: wp("8%"),
    alignItems: "center",
  },
  loginLogo: {
    width: 180,
    resizeMode: "contain",
  },
  formArea: {
    width: "100%",
    paddingBottom: wp("3%"),
  },
  textForm: {
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    width: "100%",
    height: hp("5%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 8,
    fontSize: 15,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4B56F1",
    width: "100%",
    height: hp("7.6%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonTitle: {
    color: "white",
    // fontSize: wp("3.9%"),
    fontSize: 16,
  },
  errorTxt: {
    color: "#FF3B3B",
    fontSize: 13,
  },
});
