import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-native-paper";
import loginRequest from "./api/login";

async function loginToDropbox({ appKey, onLogin, onError }) {
  try {
    const accessToken = await loginRequest(appKey);
    onLogin(accessToken);
  } catch (err) {
    onError(err);
  }
}

export default function DropboxLoginButton({ appKey, onLogin, onError }) {
  const onPress = () => loginToDropbox({ appKey, onLogin, onError });
  return (
    <Button mode="contained" onPress={onPress}>
      Connect to Dropbox
    </Button>
  );
}

DropboxLoginButton.defaultProps = {
  onError: () => false
};

DropboxLoginButton.propTypes = {
  appKey: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onError: PropTypes.func
};
