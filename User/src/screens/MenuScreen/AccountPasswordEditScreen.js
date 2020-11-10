import React, { Component } from "react";
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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-apollo-hooks";
import { Block, theme } from "galio-framework";
import style from "../../../constants/style";

export default ({ navigation, route }) => {
  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      userId: route.params.userId,
      needHelp: route.params.needHelp,
      equipment: route.params.equipment,
    },
  });
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Header
          back
          title={"비밀번호 변경"}
          closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <View style={{ ...styles.container }}>
          <View style={styles.formArea}>
            <Text style={styles.signTit}>평등한 사회로{"\n"}한걸음</Text>
            <View style={styles.formControl}>
              <Text style={styles.question}>새 비밀번호</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textForm}
                placeholder={"새 비밀번호를 입력해주세요."}
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
            <View style={styles.formControl}>
              <Text style={styles.question}>새 비밀번호 확인</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textForm}
                placeholder={"새 비밀번호를 확인해주세요."}
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
          </View>
        </View>
        <View>
          <TouchableHighlight
            underlayColor={"#333FDA"}
            style={{ ...styles.onButton }}
          >
            <Text style={styles.buttonTxt}>비밀번호 변경</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...style,
});
