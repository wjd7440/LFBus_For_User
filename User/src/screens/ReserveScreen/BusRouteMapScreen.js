import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../../../components";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useQuery } from "react-apollo-hooks";
import { BUS_ROTATION_LIST_QUERY } from "../Queries";
import Loader from "../../../components/Loader";

const { width, height } = Dimensions.get("window");

export default ({ navigation, route }) => {
  const ROUTE_NO = route.params ? route.params.ROUTE_NO : null;
  const ROUTE_CD = route.params ? route.params.ROUTE_CD : null;
  const GPS_LATI = route.params ? route.params.GPS_LATI : null;
  const GPS_LONG = route.params ? route.params.GPS_LONG : null;
  console.log(GPS_LATI);
  const { data, loading } = useQuery(BUS_ROTATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      ROUTE_CD: ROUTE_CD[0],
    },
  });
  const [latitude, setLatitude] = useState(GPS_LATI);
  const [longitude, setLongitude] = useState(GPS_LONG);
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4B56F1" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Header
          back
          title={ROUTE_NO + "번 버스 경로"}
          // close
          // closeNavigate={"HomeScreen"}
          navigation={navigation}
        />
        <View style={styles.mainMapWrap}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
            region={region}
            minZoomLevel={0}
            maxZoomLevel={18}
          >
            {data.UserBusRotationList &&
              data.UserBusRotationList.busRotations.map((rowData, index) => (
                <MapView.Marker
                  key={index}
                  image={require("../../../assets/busmarker.png")}
                  coordinate={{
                    latitude: rowData.GPS_LATI,
                    longitude: rowData.GPS_LONG,
                  }}
                ></MapView.Marker>
              ))}
          </MapView>
        </View>
      </View>
    );
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
    marginRight: 20,
    marginLeft: 20,

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
    backgroundColor: "#4B56F1",
    paddingRight: 4,
    paddingLeft: 4,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 4,
    marginRight: 5,
    alignItems: "center",
  },
  busLabelTxt: {
    fontSize: 12,
    color: "white",
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
  busModalStyle: {
    width: 200,
    backgroundColor: "#fff",
    paddingTop: 13,
    paddingBottom: 14,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: "#ddd",
    borderWidth: 1,
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
