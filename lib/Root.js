import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Portal } from "react-native-paper";
import FilePicker from "./FilePicker";
import FileSelected from "./FileSelected";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFilePicker: false
    };
  }

  render() {
    const {
      appKey,
      accessToken,
      filepath,
      onLogin,
      onLogout,
      onFilePick,
      onError,
      loggedInMsg,
      loggedOutMsg,
      fileSelectedMsg,
      fileChangeWarningMsg
    } = this.props;
    const { renderFilePicker } = this.state;

    const isLoggedIn = !!accessToken;
    const isFileSelected = !!(filepath && filepath.length);
    const openFilePicker = () => this.setState({ renderFilePicker: true });
    const closeFilePicker = () => this.setState({ renderFilePicker: false });

    if (accessToken && accessToken.length && renderFilePicker) {
      return (
        <Portal>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <FilePicker
              accessToken={accessToken}
              onFilePick={path => {
                closeFilePicker();
                onFilePick(path);
              }}
              onError={onError}
              onCancel={closeFilePicker}
            />
          </View>
        </Portal>
      );
    }
    if (isFileSelected) {
      return (
        <FileSelected
          filepath={filepath}
          openFilePicker={openFilePicker}
          onLogout={onLogout}
          fileSelectedMsg={fileSelectedMsg}
          fileChangeWarningMsg={fileChangeWarningMsg}
        />
      );
    }
    if (isLoggedIn) {
      return (
        <LoggedIn
          openFilePicker={openFilePicker}
          onLogout={onLogout}
          loggedInMsg={loggedInMsg}
        />
      );
    }
    return (
      <LoggedOut
        appKey={appKey}
        onLogin={onLogin}
        onError={onError}
        loggedOutMsg={loggedOutMsg}
      />
    );
  }
}

Root.defaultProps = {
  accessToken: null,
  filepath: null,
  onError: () => false,
  loggedOutMsg: "You can connect to Dropbox to backup/sync your transactions.",
  loggedInMsg:
    "You are connected to Dropbox, but you still need to select a file to use for sync.",
  fileSelectedMsg: "You are connected to Dropbox and syncing to file:",
  fileChangeWarningMsg:
    "If you change the sync file, all local data will be discarded, and data from the new file will be loaded.\n\nAre you sure you want to change the sync file?"
};

Root.propTypes = {
  appKey: PropTypes.string.isRequired,
  accessToken: PropTypes.string,
  filepath: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onFilePick: PropTypes.func.isRequired,
  onError: PropTypes.func,
  loggedOutMsg: PropTypes.string,
  loggedInMsg: PropTypes.string,
  fileSelectedMsg: PropTypes.string,
  fileChangeWarningMsg: PropTypes.string
};
