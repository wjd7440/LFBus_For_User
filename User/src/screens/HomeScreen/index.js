import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { BUS_STATION_LIST_QUERY } from "../Queries";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../../components/Loader";
import ResultDetailItemScreen from "./ResultDetailItemScreen";
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
  //정훈
  const API_KEY =
    // "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
    "VdRcdTnGThY8JlO8dlKwYiGDChsfzFgGBkkqw%2FTjJzaoVaDEPobGUUhI4uUStpL9MD2p5cCrr5eSKV8JOw4W3g%3D%3D";
  //"4ZOCm%2Fcovikxfz2DACVic7E8i0H1%2F4gAWrUril3hljISn9xBRuoVuj2IA8a9tNVwmeKWjKcJBnjN0osWnke8Ng%3D%3D";

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
            <View style={styles.container}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                region={region}
                minZoomLevel={16}
                maxZoomLevel={17}
              >
                {data.UserBusStationList &&
                  data.UserBusStationList.busStations.map((rowData, index) => (
                    <MapView.Marker
                      key={`Marker-${index}`}
                      onMarkerPress={() => {
                        console.log("hihihi");
                      }}
                      coordinate={{
                        latitude: rowData.GPS_LATI,
                        longitude: rowData.GPS_LONG,
                      }}
                    >
                      <MapView.Callout
                        key={`Callout-${index}`}
                        onMarkerPress={() => {
                          console.log("hihihi");
                        }}
                        tooltip={true}
                        onPress={() => {
                          navigation.navigate("탑승 예약", {
                            screen: "ReserveScreen",
                            params: {
                              BUS_NODE_ID: rowData.BUS_NODE_ID,
                              BUSSTOP_NM: rowData.BUSSTOP_NM,
                            },
                          });
                        }}
                      >
                        <View style={styles.viewStyle}>
                          <Text style={styles.textStyle}>
                            {rowData.BUSSTOP_NM}
                            {"\n"}({rowData.BUS_NODE_ID})
                          </Text>
                          <ResultDetailItemScreen
                            serviceKey={API_KEY}
                            BusStopID={rowData.BUS_NODE_ID}
                          />
                        </View>
                      </MapView.Callout>
                    </MapView.Marker>
                  ))}
              </MapView>
            </View>
            {/* <ScrollView>
              <View style={styles.container2}>
                <Text>버스 정류장 리스트</Text>
                {data.UserBusStationList &&
                  data.UserBusStationList.busStations.map((rowData, index) => (
                    <Text>{rowData.BUSSTOP_NM}</Text>
                  ))}
              </View>
            </ScrollView> */}
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
  textStyle: {
    fontSize: 16,
    alignSelf: "center",
    padding: 5,
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
  headerStyle: {
    fontSize: 20,
    fontWeight: "bold",
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
  container2: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
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
