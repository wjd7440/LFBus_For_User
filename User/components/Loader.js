import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import styles from "../styles";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator size="large" color="#4B56F1" />
  </Container>
);
