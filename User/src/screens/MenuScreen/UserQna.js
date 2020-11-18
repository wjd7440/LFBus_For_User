import React, { Component, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import style from "../../../constants/style";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { List } from "react-native-paper";
import Icon from "react-native-fontawesome-pro";

export default ({ navigation }) => {
  const [collapsed, setCollapsed] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header back title={"자주묻는 질문"} />
      <ScrollView>
        <View>
          <Collapse
            isCollapsed={collapsed === 1}
            onToggle={(isCollapsed) => {
              setCollapsed(1);
              setIsCollapsed(isCollapsed);
            }}
          >
            <CollapseHeader style={[styles.collapseHeader, styles.containerH]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.CollapseHeaderTit}>자주묻는 질문 제목</Text>
                <View style={{ width: 18 }}>
                  {collapsed === 1 && isCollapsed ? (
                    <Icon
                      name="angle-up"
                      type="regular"
                      size={18}
                      color={"#111"}
                    />
                  ) : (
                    <Icon
                      name="angle-down"
                      type="regular"
                      size={18}
                      color={"#111"}
                    />
                  )}
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody style={[styles.collapseBody, styles.containerH]}>
              <View style={{}}>
                <Text style={styles.collapseBodyTxt}>
                  국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며,
                  국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에
                  의하여 집회된다. 국가는 농업 및 어업을 보호·육성하기 위하여
                  농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야
                  한다.
                </Text>
              </View>
            </CollapseBody>
          </Collapse>

          <Collapse
            isCollapsed={collapsed === 2}
            onToggle={(isCollapsed) => {
              setCollapsed(2);
              setIsCollapsed(isCollapsed);
            }}
          >
            <CollapseHeader style={[styles.collapseHeader, styles.containerH]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.CollapseHeaderTit}>
                  자주묻는 질문 제목1212
                </Text>
                <View style={{ width: 18 }}>
                  {collapsed === 2 && isCollapsed ? (
                    <Icon
                      name="angle-up"
                      type="regular"
                      size={18}
                      color={"#111"}
                    />
                  ) : (
                    <Icon
                      name="angle-down"
                      type="regular"
                      size={18}
                      color={"#111"}
                    />
                  )}
                </View>
              </View>
            </CollapseHeader>
            <CollapseBody style={[styles.collapseBody, styles.containerH]}>
              <View style={{}}>
                <Text style={styles.collapseBodyTxt}>
                  국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며,
                  국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에
                  의하여 집회된다. 국가는 농업 및 어업을 보호·육성하기 위하여
                  농·어촌종합개발과 그 지원등 필요한 계획을 수립·시행하여야
                  한다.
                </Text>
              </View>
            </CollapseBody>
          </Collapse>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ...style,
  collapseHeader: {
    justifyContent: "center",
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  collapseBody: {
    backgroundColor: "#f5f5f5",
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  CollapseHeaderTit: {
    width: "90%",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "bold",
  },
  collapseBodyTxt: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});
