import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useForm } from "react-hook-form";
import { Block } from "galio-framework";
import { Button, Input } from "../../../components";
import { wezonTheme } from "../../../constants";

import Icon from "react-native-fontawesome-pro";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("screen");

export default ({ isVisible, toggleModal, keyword, setKeyword }) => {
  const { register, setValue, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      keyword: keyword,
    },
  });

  const onSubmit = async (data) => {
    setKeyword(data.keyword);
    toggleModal();
  };
  // console.log(errors);

  useEffect(() => {
    register({ name: "keyword" }, { required: "검색어를 입력해주세요." });
  }, [register]);

  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={() => {
        toggleModal();
      }}
      style={styles.modal}
    >
      {Platform.OS === "android" ? (
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Block style={styles.modalContent}>
          <Block row>
            <Block flex>
              <Input
                style={styles.FormControl}
                type="default"
                value={watch("keyword")}
                onChangeText={(text) => setValue("keyword", text, true)}
                placeholder="검색어(가맹점명) 입력"
                maxLength={20}
                fontSize={16}
                iconContent={<Block />}
                autoFocus={true}
                onBlur={() => {
                  toggleModal();
                }}
              />
            </Block>
            <Block
              style={{
                width: 100,
                alignItems: "center",
              }}
            >
              <Button style={styles.searchBtn} onPress={handleSubmit(onSubmit)}>
                <Icon
                  name="search"
                  type="regular"
                  size={20}
                  color={wezonTheme.COLORS.PRIMARY}
                />
              </Button>
            </Block>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /* modal */
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  FormControl: {
    height: 50,
    backgroundColor: "transparent",
    borderTopLeftRadius: 16,
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  searchBtn: {
    backgroundColor: "#EDF6FD",
    width: 80,
    height: 40,
    borderRadius: 25,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
