import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import FilePickButton from "./FilePickButton";
import LogoutButton from "./LogoutButton";

export default function LoggedIn({ openFilePicker, onLogout }) {
  return (
    <View>
      <Text>
        You are connected to Dropbox, but you still need to select a file to use
        for sync.
      </Text>
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <FilePickButton onPress={openFilePicker} />
        <LogoutButton onPress={onLogout} />
      </View>
    </View>
  );
}

LoggedIn.propTypes = {
  openFilePicker: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};
