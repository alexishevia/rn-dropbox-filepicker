# React Native Dropbox FilePicker
React Native Component to select a Dropbox file.

This project assumes:
1. You are building a React Native application.
2. You need your users to connect to Dropbox and select a file.

## How to Use
1. `npm install --save rn-dropbox-filepicker`
2. Include the provided `<FilePicker />` component in your app
  ```
  import FilePicker from 'rn-dropbox-filepicker';

  class YourComponent extends React.Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <FilePicker
            token="YOUR_ACCESS_TOKEN"
            onSelect={(filepath) => console.log(filepath); }
          />
        </View>
      )
    }
  }
  ```

The FilePicker requires 3 arguments:
1. The user's access token.
  If you're using [Expo](https://docs.expo.io/versions/latest/), you can get a Dropbox access using [AuthSession](https://docs.expo.io/versions/v34.0.0/sdk/auth-session/):
  ```
  import { AuthSession } from "expo";

  const APP_KEY = "YOUR_APP_KEY"; // Get it from the Dropbox App console - https://www.dropbox.com/developers/apps

  const dropboxLogin = async () => {
    const authUrl = [
      "https://www.dropbox.com/1/oauth2/authorize",
      "?response_type=token",
      `&client_id=${APP_KEY}`,
      `&redirect_uri=${AuthSession.getRedirectUrl()}`
    ].join("");

    const response = await AuthSession.startAsync({ authUrl });

    if (response.type !== "success") {
      throw new Error("Unexpected login response.type", response.type);
    }

    if (!response.params || !response.params.access_token) {
      throw new Error("No access_token was returned");
    }

    return response.params.access_token;
  };

  export default dropboxLogin;
  ```
2. The `onSelect()` callback.
  Executed when the user selects a file.
3. The `onCancel()` callback.
  Executed when the user cancels the FilePicker.

### Publish to npm

Run the following to publish the package to npm:

```
npm run build && npm publish
```
