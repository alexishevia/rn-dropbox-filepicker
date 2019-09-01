import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-native-paper";

export default function LogoutButton({ onPress }) {
  return <Button onPress={onPress}>Disconnect</Button>;
}

LogoutButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
