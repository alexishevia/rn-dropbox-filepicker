import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

export default function ChangeFileButton({ onPress }) {
  const onBtnPress = () =>
    Alert.alert(
      "Data Loss Warning",
      "If you change the sync file, all local data will be discarded, and data from the new file will be loaded.\n\nAre you sure you want to change the sync file?",
      [
        { text: "Change file", onPress, style: "destructive" },
        { text: "Keep Current File", onPress: () => {}, style: "cancel" }
      ]
    );
  return (
    <Button style={{ marginRight: 20 }} onPress={onBtnPress}>
      Change File
    </Button>
  );
}

ChangeFileButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
