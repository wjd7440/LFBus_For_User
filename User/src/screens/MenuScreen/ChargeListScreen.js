import React, { Component } from "react";
import Moment from "react-moment";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "../../../components";
import { ScrollView } from "react-native-gesture-handler";
import { USER_MAILEAGE_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import NumberFormat from "react-number-format";
import style from "../../../constants/style";
import Icon from "react-native-fontawesome-pro";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ({ navigation }) => {
  const { data, loading } = useQuery(USER_MAILEAGE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    if(data.UserMaileageList.count > 0){
      return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Header title="사용 및 충전 내역" back />
          <ScrollView>
            <View style={{ flex: 1 }}>
              {data.UserMaileageList.maileages.map((rowData, index) => {
                const maileages = rowData.account;
                return (
                  <View style={[styles.list, styles.containerH]}>
                    <View style={styles.left}>
                      <View style={{ justifyContent: "center", marginRight: 10 }}>
                        {rowData.account > 0 ? (
                          <Icon
                            name="arrow-square-right"
                            type="light"
                            size={24}
                            color={"#4B56F1"}
                          />
                        ) : (
                          <Icon
                            name="arrow-square-left"
                            type="light"
                            size={24}
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
        </KeyboardAvoidingView>
      );
    }else{
      return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Header title="사용 및 충전 내역" back />
          
            <View style={{ flex: 1, justifyContent:"center", alignItems:"center" }}>
            
              <Text stlye={{fontSize:18,}}>사용 및 충전 내역이 없습니다.</Text>
            </View>
         
        </KeyboardAvoidingView>
      );
    }
    
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
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
  },
  mailTxt: {
    fontSize: wp("3.95%"),
  },
  mailNum: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    color: "#767676",
    // marginTop:-5,
  },
});
