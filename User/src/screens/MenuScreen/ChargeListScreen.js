import React, { Component } from "react";
import Moment from "react-moment";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Header } from "../../../components";
import { ScrollView } from "react-native-gesture-handler";
import { USER_MAILEAGE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import NumberFormat from "react-number-format";
import style from "../../../constants/style";
import Icon from "react-native-fontawesome-pro";

export default ({ navigation }) => {
  const { data, loading } = useQuery(USER_MAILEAGE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  console.log(!loading && data);

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View>
        <Header title="사용 및 충전 내역" back />
        <ScrollView>
          <View style={[styles.container, styles.marginTopPull]}>
            {data.UserMaileageList.maileages.map((rowData, index) => {
              const maileages = rowData.account;
              return (
                <View
                  style={[styles.list, styles.containerH, styles.marginPull]}
                >
                  <View style={styles.left}>
                    <View style={{ justifyContent: "center", marginRight: 10 }}>
                      {rowData.account > 0 ? (
                        <Icon
                          name="arrow-square-right"
                          type="light"
                          size={28}
                          color={"#4B56F1"}
                        />
                      ) : (
                        <Icon
                          name="arrow-square-left"
                          type="light"
                          size={28}
                          color={"#F14B4B"}
                        />
                      )}
                    </View>

                    <View>
                      {rowData.account > 0 ? (
                        <Text style={styles.mailTxt}>충전</Text>
                      ) : (
                        <Text style={styles.mailTxt}>사용</Text>
                      )}
                      <Moment
                        element={Text}
                        format="YYYY.MM.DD"
                        style={styles.date}
                      >
                        {rowData.createdAt}
                      </Moment>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <NumberFormat
                      value={maileages}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(maileages) => (
                        <Text style={styles.mailNum}>{maileages}P</Text>
                      )}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  ...style,
  list: {
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
  },
  mailTxt: {
    fontSize: 18,
  },
  mailNum: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    color: "#767676",
    // marginTop:-5,
  },
});
