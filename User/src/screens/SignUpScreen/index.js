import React, { Component } from "react";
import { RadioButton, Text } from "react-native-paper";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ({ navigation }) => {
  const [value, setValue] = React.useState("first");
  return (
    <View>
      <View>
        <Text style={styles.title}>회원가입</Text>
      </View>
      <View style={styles.formArea}>
        <Text style={styles.question}>아이디 : </Text>
        <TextInput style={styles.textForm} placeholder={"ID"} />
        <Text style={styles.question}>비밀번호 : </Text>
        <TextInput style={styles.textForm} placeholder={"Password"} />
        <Text style={styles.question}>도움이 필요하신가요? : </Text>
        <View>
          <RadioButton.Group
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <View>
              <RadioButton value="first" />
              <Text>필요해요.</Text>
              <RadioButton value="second" />
              <Text>괜찮아요.</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Text style={styles.question}>보조기구 종류 : </Text>
        <TextInput style={styles.textForm} placeholder={"보조기구 종류"} />
        <Text style={styles.question}>메모</Text>
        <TextInput style={styles.textForm} placeholder={"메모"} />
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
