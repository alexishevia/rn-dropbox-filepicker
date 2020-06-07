import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import FilePickButton from "./FilePickButton";
import LogoutButton from "./LogoutButton";

export default function LoggedIn({ openFilePicker, onLogout, loggedInMsg }) {
  return (
    <View>
      <Text>
        {loggedInMsg}
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
  onLogout: PropTypes.func.isRequired,
  loggedInMsg: PropTypes.string.isRequired
};
