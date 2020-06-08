# React Native Dropbox FilePicker

React Native Component to select a Dropbox file.

This project assumes:

1. You are building a React Native application using [Expo](https://docs.expo.io/versions/latest/).
2. You need your users to connect to Dropbox and select a file.

NOTE: this package was developed against Expo version 33.0. It might not work with latest Expo versions.

## How to Use

1. `npm install --save react react-native expo react-native-paper rn-dropbox-filepicker`
2. Include the provided `<FilePicker />` component in your app

```
import { Portal } from 'react-native-paper';
import FilePicker from 'rn-dropbox-filepicker';

const APP_KEY = 'YOUR DROPBOX APP KEY';

class YourComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      filepath: null,
    };
  }

  render() {
    const { accessToken, filepath } = this.state;
    return (
      <Portal.Host>
        <View style={{ flex: 1 }}>
          <FilePicker
            appKey={APP_KEY}
            accessToken={accessToken}
            filepath={filepath}
            onLogin={accessToken => this.setState({ accessToken })}
            onLogout={() => this.setState({ accessToken: null, filepath: null })}
            onFilePick={filepath => this.setState({ filepath })}
            onError={error => console.error(error.message)}
          />
        </View>
      </Portal.Host>
    )
  }
}
```

The FilePicker accepts the following arguments:

- `appKey`
  You can obtain your app key from the [Dropbox App console](https://www.dropbox.com/developers/apps).
- `accessToken`
  The user's Dropbox access token.  
   The `onLogin()` callback will provide you the accessToken value once the user logs in. Your app must persist this value and pass it back to the `<FilePicker />`.
- `filepath`
  Path to the Dropbox file that was picked by the user.  
   The `onFilePick()` callback will provide you the filepath once the user picks a file. Your app must persist this value and pass it back to the `<FilePicker />`.
- `onLogin()`
  Executed when the user connects to Dropbox.
- `onLogout()`
  Executed when the user disconnects from Dropbox.
- `onFilePick()`
  Executed when the user selects a file.
- `onError()`
  Executed when an unexpected error happens.
- `loggedOutMsg`
  Alternative text at the logged-out-screen
  (default: "You can connect to Dropbox to backup/sync your transactions.")
- `loggedInMsg`
  Alternative text at the logged-in-screen
  (default: "You are connected to Dropbox, but you still need to select a file to use for sync.")
- `fileSelectedMsg`
  Alternative text at the file-selected-screen
  (default: "You are connected to Dropbox and syncing to file:")
- `fileChangeWarningMsg`
  Alternative text for "change file" prompt.
  (default: "If you change the sync file, all local data will be discarded, and data from the new file will be loaded.\n\nAre you sure you want to change the sync file?")
