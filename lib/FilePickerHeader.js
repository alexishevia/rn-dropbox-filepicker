import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import {
  Appbar,
  IconButton,
  Menu,
  withTheme,
  Dialog,
  Button,
  Portal,
  TextInput
} from "react-native-paper";

class FilePickerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
      dialogVisible: false,
      filename: ""
    };
  }

  onCreateFile() {
    const { filename } = this.state;
    const { onNewFile } = this.props;
    if (!filename) return;
    onNewFile(filename);
    this.hideDialog();
  }

  openMenu() {
    this.setState({ isMenuVisible: true });
  }

  closeMenu() {
    this.setState({ isMenuVisible: false });
  }

  showDialog() {
    this.setState({ dialogVisible: true });
  }

  hideDialog() {
    this.setState({ dialogVisible: false });
  }

  runAndCloseMenu(func) {
    this.setState({ isMenuVisible: false });
    func();
  }

  renderDialog() {
    const { dialogVisible, filename } = this.state;
    return (
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => this.hideDialog()}>
          <Dialog.Title>Create New File</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={{ margin: 5 }}
              label="File Name"
              value={filename}
              onChangeText={val => this.setState({ filename: val })}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={{ marginRight: 10 }}
              onPress={() => this.hideDialog()}
            >
              Cancel
            </Button>
            <Button mode="contained" onPress={() => this.onCreateFile()}>
              Create File
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  render() {
    const { theme, subtitle, onGoBack } = this.props;
    const { isMenuVisible } = this.state;
    return (
      <View>
        {this.renderDialog()}
        <Appbar.Header>
          <Appbar.BackAction onPress={onGoBack} />
          <Appbar.Content title="Select File" subtitle={subtitle} />
          <Menu
            visible={isMenuVisible}
            onDismiss={() => this.closeMenu()}
            anchor={
              <IconButton
                icon="dehaze"
                color={theme.colors.surface}
                onPress={() => this.openMenu()}
              />
            }
          >
            <Menu.Item
              key="newFile"
              title="New File"
              onPress={() => this.runAndCloseMenu(() => this.showDialog())}
            />
          </Menu>
        </Appbar.Header>
      </View>
    );
  }
}

FilePickerHeader.defaultProps = {
  subtitle: ""
};

FilePickerHeader.propTypes = {
  subtitle: PropTypes.string,
  onNewFile: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      surface: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default withTheme(FilePickerHeader);
