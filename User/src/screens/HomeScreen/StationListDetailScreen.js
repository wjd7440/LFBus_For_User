import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_INFO_QUERY } from "../Queries";

export default ({
  busExist,
  setBusExist,
  CAR_REG_NO,
  ROUTE_NO,
  STATUS_POS,
  EXTIME_MIN,
  DESTINATION,
  ROUTE_TP,
}) => {
  const { data, loading } = useQuery(BUS_INFO_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  if (loading) {
    return null;
  } else {
    if (!busExist && data.UserBusInfo) {
      setBusExist(true);
    }

    if (data.UserBusInfo) {
      return (
        <>
          <Text style={styles.busNum}>{ROUTE_NO}</Text>
        </>
      );
    } else {
      return null;
    }
  }
};

const styles = StyleSheet.create({
  mainMapWrap: {
    flex: 3,
  },
  busWrap: {
    backgroundColor: "#f5f5f5",
    flex: 2,
  },
  busItem: {
    backgroundColor: "#ffffff",
    borderRadius: 7,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,

    paddingTop: 15,
    paddingBottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 0.6,
    flexDirection: "row",
  },
  busLeft: {
    width: 90,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  busRight: {},
  away: {
    justifyContent: "center",
    alignItems: "center",
  },
  markerImg: {
    marginTop: 2,
    width: 12,
    height: 18,
  },
  busTit: {
    fontSize: 20,
    color: "#4B56F1",
    fontWeight: "bold",
  },
  busDirection: {
    fontSize: 14,
    color: "#a1a1a1",
    paddingBottom: 6,
  },
  busListBox: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  busList: {
    flexDirection: "row",
  },
  busNum: {
    fontSize: 16,
    marginRight: 8,
  },
  busLabel: {
    fontSize: 12,
    color: "white",
    backgroundColor: "#4B56F1",
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 4,
    marginRight: 5,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  viewStyle: {
    width: 200,
    height: 250,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    position: "relative",
  },
  modalContainerViewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  modalViewStyle: {
    width: 300,
    height: 380,
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});
