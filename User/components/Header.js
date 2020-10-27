import React from "react";
import { withNavigation } from "@react-navigation/compat";

import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Button, Block, NavBar, Text, theme } from "galio-framework";

import Icon from "react-native-fontawesome-pro";
import wezonTheme from "../constants/Theme";
import style from "../constants/style";

const { height, width } = Dimensions.get("window");
const iPhoneX = () =>
  Platform.OS === "ios" &&
  (height === 812 || width === 812 || height === 896 || width === 896);

const BackButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[styles.button, style, styles.buttonLeft]}
    onPress={() => navigation.goBack(null)}
  >
    <Icon
      name="angle-left"
      type="light"
      size={36}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const CloseButton = ({ isWhite, style, navigation, closeNavigate }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[styles.button, style, styles.buttonRight]}
    onPress={() => {
      closeNavigate
        ? navigation.navigate(closeNavigate)
        : navigation.goBack(null);
    }}
  >
    <Icon
      name="times"
      type="light"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const FilterButton = ({ isWhite, style, toggleModal }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {
      toggleModal();
    }}
  >
    <Icon
      name="sliders-h"
      type="light"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, toggleModal }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => {
      toggleModal();
    }}
  >
    <Icon
      name="search"
      type="regular"
      size={24}
      color={wezonTheme.COLORS[isWhite ? "WHITE" : "ICON"]}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  renderLeft = () => {
    const { white, back, navigation } = this.props;

    if (back) {
      return (
        <BackButton key="back-title" navigation={navigation} isWhite={white} />
      );
    } else {
      return <Block />;
    }
  };
  renderRight = () => {
    const {
      white,
      close,
      filter,
      search,
      navigation,
      closeNavigate,
      toggleModal,
    } = this.props;

    if (close) {
      return (
        <CloseButton
          key="close-title"
          navigation={navigation}
          isWhite={white}
          closeNavigate={closeNavigate}
        />
      );
    } else if (filter) {
      return (
        <FilterButton
          key="filter-title"
          isWhite={white}
          toggleModal={toggleModal}
        />
      );
    } else if (search) {
      return (
        <SearchButton
          key="filter-title"
          isWhite={white}
          toggleModal={toggleModal}
        />
      );
    } else {
      return <Block />;
    }
  };
  render() {
    const {
      back,
      close,
      filter,
      search,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      closeNavigate,
      toggleModal,
      ...props
    } = this.props;
    const headerStyles = [
      transparent
        ? {
            backgroundColor: "transparent",
          }
        : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor },
    ];

    return (
      <SafeAreaView style={headerStyles}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <NavBar
          title={title}
          titleStyle={[
            styles.title,
            {
              textAlign: "center",
              color: wezonTheme.COLORS[white ? "HEADER" : "HEADER"],
            },
            titleColor && { color: titleColor },
          ]}
          style={navbarStyles}
          back={back}
          left={this.renderLeft()}
          leftStyle={{
            marginLeft: 0,
            justifyContent: "center",
            alignItems: "flex-start",
            // backgroundColor: "blue",
          }}
          right={this.renderRight()}
          rightStyle={{
            marginRight: 0,
            justifyContent: "center",
            alignItems: "flex-end",
            // backgroundColor: "blue",
          }}
          transparent={transparent}
          {...props}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ...style,
  button: {
    position: "relative",
    textAlign: "center",
    // backgroundColor: "red",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRight: {
    paddingRight: theme.SIZES.BASE * 1.2,
  },
  buttonLeft: {
    paddingLeft: theme.SIZES.BASE * 1.2,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
  },
  navbar: {
    height: Platform.OS === "android" ? 55 : 50,
    marginTop: Platform.OS === "android" ? 25 : 5,
    alignItems: "center",
    textAlign: "justify",
    borderBottomWidth: 1,
    borderColor: "#f5f5f5",
    zIndex: 5,
    // marginHorizontal: -10,
  },
  header: {
    backgroundColor: "transparent",
  },
});

export default withNavigation(Header);
