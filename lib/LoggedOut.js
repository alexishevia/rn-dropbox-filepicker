import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import LoginButton from "./LoginButton";

export default function LoggedOut({ appKey, onLogin, onError, loggedOutMsg }) {
  return (
    <View>
      <Text>{loggedOutMsg}</Text>
      <View
        style={{ flexDirection: "row", justifyContent: "center", padding: 10 }}
      >
        <LoginButton appKey={appKey} onLogin={onLogin} onError={onError} />
      </View>
    </View>
  );
}

LoggedOut.defaultProps = {
  onError: () => false
};

LoggedOut.propTypes = {
  appKey: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onError: PropTypes.func,
  loggedOutMsg: PropTypes.string.isRequired
};
