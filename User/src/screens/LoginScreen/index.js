import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
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
      Alert.alert("로그인 할 수 없습니다. 다시 시도해주새요.");
    }
  };

  useEffect(() => {
    const tokenLoad = async () => {
      await messaging()
        .getToken()
        .then((token) => {
          setToken(token);
        });
    };
    tokenLoad();
  }, []);

  useEffect(() => {
    register({ name: "userId" }, { required: "아이디를 입력해주세요." });
    register({ name: "password" }, { required: "비밀번호를 입력해주세요." });
  }, [register]);

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>LFBus_For_User</Text>
      </View>
      <View style={styles.formArea}>
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
        <TextInput
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
      </View>
      <View style={styles.buttonArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonTitle}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text style={styles.buttonTitle}>회원가입</Text>
        </TouchableOpacity>
      </View>
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
