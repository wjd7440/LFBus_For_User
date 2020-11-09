import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Image,
  TouchableHighlight,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { BUS_STATION_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import ResultDetailItemScreen from "./ResultDetailItemScreen";
import StationListDetailItemScreen from "./StationListDetailItemScreen";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default ({ navigation }) => {
  const [latitude, setLatitude] = useState(36.35069);
  const [longitude, setLongitude] = useState(127.384787);
  const [loaded, setLoaded] = useState(false);
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
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [busData, setBusData] = useState([]);
  const API_KEY =
    "VdRcdTnGThY8JlO8dlKwYiGDChsfzFgGBkkqw%2FTjJzaoVaDEPobGUUhI4uUStpL9MD2p5cCrr5eSKV8JOw4W3g%3D%3D";

  const { data, loading, refetch } = useQuery(BUS_STATION_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setLocation({
      latitude: String(latitude),
      longitude: String(longitude),
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  const renderMap = () => {
    if (!loading) {
      return (
        <>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={styles.mainMapWrap}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                region={region}
                minZoomLevel={16}
                maxZoomLevel={18}
              >
                {data.UserBusStationList &&
                  data.UserBusStationList.busStations.map((rowData, index) => (
                    <MapView.Marker
                      key={index}
                      image={require("../../../assets/busmarker.png")}
                      coordinate={{
                        latitude: rowData.GPS_LATI,
                        longitude: rowData.GPS_LONG,
                      }}
                    >
                      <MapView.Callout
                        key={`Callout-${index}`}
                        tooltip={true}
                        onPress={() => {
                          navigation.navigate("ReserveScreen", {
                            BUS_NODE_ID: rowData.BUS_NODE_ID,
                            BUSSTOP_NM: rowData.BUSSTOP_NM,
                            DISTANCE: rowData.DISTANCE * 1000,
                            GPS_LATI: rowData.GPS_LATI,
                            GPS_LONG: rowData.GPS_LONG,
                          });
                        }}
                      >
                        <View style={styles.busModalStyle}>
                          <Text style={{ fontSize: 15 }}>
                            {rowData.BUSSTOP_NM}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#8D8E93",
                              marginBottom: 5,
                            }}
                          >
                            {rowData.BUS_NODE_ID}
                          </Text>
                          <Text style={{ fontSize: 13, color: "#FF4444" }}>
                            {rowData.DISTANCE * 1000}미터
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <ResultDetailItemScreen
                              serviceKey={API_KEY}
                              BusStopID={rowData.BUS_NODE_ID}
                            />
                          </View>
                        </View>
                      </MapView.Callout>
                    </MapView.Marker>
                  ))}
              </MapView>
            </View>
            <View style={styles.busWrap}>
              <Text
                style={{
                  fontSize: 12,
                  paddingTop: 5,
                  paddingBottom: 5,
                  marginRight: 20,
                  marginLeft: 20,
                  color: "#454545",
                }}
              >
                내 주변정류장 - 500m 이내
              </Text>
              <ScrollView>
                <View style={styles.busListTitBox}>
                  {data.UserBusStationList &&
                    data.UserBusStationList.busStations.map(
                      (rowData, index) => (
                        <TouchableOpacity
                          activeOpacity={0.92}
                          style={styles.busItem}
                          onPress={() => {
                            navigation.navigate("ReserveScreen", {
                              BUS_NODE_ID: rowData.BUS_NODE_ID,
                              BUSSTOP_NM: rowData.BUSSTOP_NM,
                              DISTANCE: rowData.DISTANCE * 1000,
                              GPS_LATI: rowData.GPS_LATI,
                              GPS_LONG: rowData.GPS_LONG,
                            });
                          }}
                        >
                          <View style={styles.busLeft}>
                            <View style={styles.away}>
                              <Image
                                style={styles.markerImg}
                                source={require("../../../assets/marker01.png")}
                              />
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: "#4B56F1",
                                  fontWeight: "bold",
                                }}
                              >
                                {rowData.DISTANCE * 1000}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: "#4B56F1",
                                  marginTop: -3,
                                }}
                              >
                                미터
                              </Text>
                            </View>
                          </View>
                          <View style={styles.busRight}>
                            <Text style={styles.busTit}>
                              {rowData.BUSSTOP_NM}
                            </Text>
                            <Text style={styles.busDirection}>
                              {rowData.BUS_STOP_ID}
                            </Text>
                            <View style={styles.busListBox}>
                              <View style={styles.busLabel}>
                                <Text style={styles.busLabelTxt}>저상</Text>
                              </View>

                              <View style={styles.busList}>
                                <StationListDetailItemScreen
                                  serviceKey={API_KEY}
                                  BusStopID={rowData.BUS_NODE_ID}
                                  DISTANCE={rowData.DISTANCE}
                                />
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    )}
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      );
    } else {
      return <Loader />;
    }
  };

  return <View style={{ flex: 1 }}>{renderMap()}</View>;
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
    width: 74,
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
