import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-native-paper";

export default function FilePickButton({ onPress }) {
  return (
    <Button mode="contained" style={{ marginRight: 20 }} onPress={onPress}>
      Select File
    </Button>
  );
}

FilePickButton.propTypes = {
  onPress: PropTypes.func.isRequired
};
