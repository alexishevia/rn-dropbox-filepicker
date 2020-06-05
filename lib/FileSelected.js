import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import ChangeFileButton from "./ChangeFileButton";
import LogoutButton from "./LogoutButton";

export default function FileSelected({ filepath, openFilePicker, onLogout, fileSelectedMsg }) {
  return (
    <View>
      <Text>{fileSelectedMsg}</Text>
      <Text>{filepath}</Text>
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <ChangeFileButton onPress={openFilePicker} />
        <LogoutButton onPress={onLogout} />
      </View>
    </View>
  );
}

FileSelected.propTypes = {
  filepath: PropTypes.string.isRequired,
  openFilePicker: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  fileSelectedMsg: PropTypes.string.isRequired
};
