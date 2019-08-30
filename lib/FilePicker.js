import React from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import { ActivityIndicator, Portal, Paragraph } from "react-native-paper";
import loadDir from "../api/loadDir";
import Header from "./FilePickerHeader";
import FilePickerItem from "./FilePickerItem";

const isFile = node => node.fileType === "file";
const isDir = node => node.fileType === "directory";

const initialState = {
  isLoading: false,
  hasError: false,
  path: "",
  contents: null
};

function getParentDir(path) {
  return path
    .split("/")
    .slice(0, -1)
    .join("/");
}

class FilePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate() {
    this.load();
  }

  onGoBack() {
    const { path } = this.state;
    const { onCancel } = this.props;
    if (path === "") {
      onCancel();
      return;
    }

    this.setState({
      ...initialState,
      path: getParentDir(path)
    });
  }

  openNode(node) {
    const { onFilePick, onError } = this.props;
    if (isDir(node)) {
      this.setState({ ...initialState, path: node.path });
      return;
    }
    if (isFile(node)) {
      this.setState(initialState);
      onFilePick(node.path);
      return;
    }
    onError(new Error(`Filepicker: Unkown node type: ${node.type}`));
  }

  async load() {
    const { accessToken, onError } = this.props;
    const { isLoading, hasError, path, contents } = this.state;
    if (isLoading || hasError || contents !== null) return;
    this.setState({ isLoading: true, hasError: false });
    try {
      const result = await loadDir({ accessToken, path });
      this.setState({ isLoading: false, contents: result.contents });
    } catch (err) {
      onError(err);
      this.setState({ isLoading: false, hasError: true });
    }
  }

  renderLoading() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Portal>
        <ActivityIndicator style={{ marginTop: 110 }} />
      </Portal>
    ) : null;
  }

  renderHeader() {
    const { path } = this.state;
    const { onFilePick } = this.props;
    return (
      <Header
        subtitle={path}
        onNewFile={filename => onFilePick(`${path}/${filename}`)}
        onGoBack={() => this.onGoBack()}
      />
    );
  }

  renderContents() {
    const { contents } = this.state;

    if (!contents) {
      return null;
    }

    if (!contents.length) {
      return (
        <Paragraph style={{ marginLeft: 5 }}>The directory is empty.</Paragraph>
      );
    }

    return (
      <FlatList
        data={contents}
        keyExtractor={item => item.path}
        renderItem={({ item }) => (
          <FilePickerItem node={item} onPress={() => this.openNode(item)} />
        )}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderLoading()}
        {this.renderHeader()}
        {this.renderContents()}
      </View>
    );
  }
}

FilePicker.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  onFilePick: PropTypes.func.isRequired
};

export default FilePicker;
