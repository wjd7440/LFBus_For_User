import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from "react-native-nmap";

export default ({ navigation }) => {
  const API_KEY = "kR/kajFelU6l37SAtmCVkkRqNunWcQN709OX3ZEkMnc";
  const searchPubTransPathAJAX = () => {
    const xhr = new XMLHttpRequest();
    const url =
      "https://api.odsay.com/v1/api/searchPubTransPath?SX=126.9027279&SY=37.5349277&EX=126.9145430&EY=37.5499421&apiKey=kR/kajFelU6l37SAtmCVkkRqNunWcQN709OX3ZEkMnc";
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText); // <- xhr.responseText 로 결과를 가져올 수 있음
      }
    };
  };

  const MyMap = () => {
    const P0 = { latitude: 37.564362, longitude: 126.977011 };
    const P1 = { latitude: 37.565051, longitude: 126.978567 };
    const P2 = { latitude: 37.565383, longitude: 126.976292 };

    return (
      <NaverMapView
        style={{ width: "100%", height: "100%" }}
        showsMyLocationButton={true}
        center={{ ...P0, zoom: 16 }}
        onTouch={(e) => console.warn("onTouch", JSON.stringify(e.nativeEvent))}
        onCameraChange={(e) =>
          console.warn("onCameraChange", JSON.stringify(e))
        }
        onMapClick={(e) => console.warn("onMapClick", JSON.stringify(e))}
      >
        <Marker coordinate={P0} onClick={() => console.warn("onClick! p0")} />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn("onClick! p1")}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          onClick={() => console.warn("onClick! p2")}
        />
        <Path
          coordinates={[P0, P1]}
          onClick={() => console.warn("onClick! path")}
          width={10}
        />
        <Polyline
          coordinates={[P1, P2]}
          onClick={() => console.warn("onClick! polyline")}
        />
        <Circle
          coordinate={P0}
          color={"rgba(255,0,0,0.3)"}
          radius={200}
          onClick={() => console.warn("onClick! circle")}
        />
        <Polygon
          coordinates={[P0, P1, P2]}
          color={`rgba(0, 0, 0, 0.5)`}
          onClick={() => console.warn("onClick! polygon")}
        />
      </NaverMapView>
    );
  };

  return (
    <View>
      <View>{MyMap()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
