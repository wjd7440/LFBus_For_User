import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Pressable,
} from "react-native";
import Icon from "react-native-fontawesome-pro";

export default class RadioColumnGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtons: this.validate(this.props.radioButtons),
    };
  }

  validate(data) {
    let selected = false; // Variable to check if "selected: true" for more than one button.
    data.map((e) => {
      e.color = e.color ? e.color : "#444";
      e.disabled = e.disabled ? e.disabled : false;
      e.label = e.label ? e.label : "You forgot to give label";
      e.layout = e.layout ? e.layout : "row";
      e.selected = e.selected ? e.selected : false;
      if (e.selected) {
        if (selected) {
          e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
          console.log('Found "selected: true" for more than one button');
        } else {
          selected = true;
        }
      }
      e.size = e.size ? e.size : 24;
      e.value = e.value ? e.value : e.label;
    });
    if (!selected) {
      data[0].selected = true;
    }
    return data;
  }

  onPress = (label) => {
    const radioButtons = this.state.radioButtons;
    const selectedIndex = radioButtons.findIndex((e) => e.selected == true);
    const selectIndex = radioButtons.findIndex((e) => e.label == label);
    if (selectedIndex != selectIndex) {
      radioButtons[selectedIndex].selected = false;
      radioButtons[selectIndex].selected = true;
      this.setState({ radioButtons });
      this.props.onPress(this.state.radioButtons);
    }
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: -4,
        }}
      >
        {this.state.radioButtons.map((data) => (
          <RadioButton key={data.label} data={data} onPress={this.onPress} />
        ))}
      </View>
    );
  }
}

class RadioButton extends Component {
  render() {
    const data = this.props.data;
    const opacity = data.disabled ? 0.2 : 1;
    let layout = {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 4,
      width: "100%",
      flex: 1,
    };

    if (data.layout === "column") {
      layout = { alignItems: "center" };
      margin = { marginTop: 10 };
    }
    return (
      <View
        style={{
          flexWrap: "wrap",
          width: "33.33333333333%",
          paddingHorizontal: 4,
          paddingVertical: 4,
          // flexBasis: "33.333333%",
        }}
      >
        {data.selected ? (
          <TouchableHighlight
            underlayColor="#DFE1FF"
            style={[
              layout,
              styles.onBtn,
              {
                // backgroundColor: data.backgroundBtnColor,
                width: "100%",
                marginTop: data.marginTop ? 10 : 0,
              },
            ]}
            onPress={() => {
              data.disabled ? null : this.props.onPress(data.label);
            }}
          >
            <Text
              style={
                ([
                  {
                    alignSelf: "center",
                    fontSize: 16,
                  },
                ],
                styles.onText)
              }
            >
              {data.label}
            </Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="#ffffff"
            style={[
              layout,
              styles.offBtn,
              {
                // backgroundColor: data.backgroundBtnColor,
                width: "100%",
                marginTop: data.marginTop ? 10 : 0,
              },
            ]}
            onPress={() => {
              data.disabled ? null : this.props.onPress(data.label);
            }}
          >
            <Text style={[{ alignSelf: "center", fontSize: 16 }]}>
              {data.label}
            </Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  onBtn: {
    backgroundColor: "#DFE1FF",
    borderWidth: 1,
    borderColor: "#4B56F1",
    justifyContent: "center",
    alignItems: "center",
  },
  offBtn: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  onText: {
    fontSize: 16,
    color: "#1F2AC5",
  },
});
