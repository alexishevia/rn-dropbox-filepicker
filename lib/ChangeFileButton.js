import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

export default function ChangeFileButton({ onPress, fileChangeWarningMsg }) {
  const onBtnPress = () => {
    Alert.alert(
      "Data Loss Warning",
      fileChangeWarningMsg,
      [
        { text: "Change file", onPress, style: "destructive" },
        { text: "Keep Current File", onPress: () => {}, style: "cancel" }
      ]
    );
  }
  return (
    <Button style={{ marginRight: 20 }} onPress={onBtnPress}>
      Change File
    </Button>
  );
}

ChangeFileButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  fileChangeWarningMsg: PropTypes.string.isRequired
};
