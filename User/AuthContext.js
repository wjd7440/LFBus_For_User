import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Storage from "react-native-expire-storage";

export const AuthContext = createContext();

export const AuthProvider = ({
  isLoggedIn: isLoggedInProp,
  isModalVisible: isModalVisibleProp,
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [isModalVisible, setIsModalVisible] = useState(isModalVisibleProp);
  // const expire = 60 * 60 * 24 * 365;

  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.removeItem("jwt");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  const aotuLogUserIn = async () => {
    console.log(await AsyncStorage.getAllKeys());
    console.log(await AsyncStorage.getItem("jwt"));
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      try {
        await AsyncStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const logUserToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logUserIn,
        logUserOut,
        aotuLogUserIn,
        isModalVisible,
        logUserToggleModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};

export const useAutoLogIn = () => {
  const { aotuLogUserIn } = useContext(AuthContext);
  return aotuLogUserIn;
};

export const useIsModalVisible = () => {
  const { isModalVisible } = useContext(AuthContext);
  return isModalVisible;
};

export const useToggleModal = () => {
  const { logUserToggleModal } = useContext(AuthContext);
  return logUserToggleModal;
};
