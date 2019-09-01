import { AuthSession } from "expo";

const dropboxLogin = async appKey => {
  const authUrl = [
    "https://www.dropbox.com/1/oauth2/authorize",
    "?response_type=token",
    `&client_id=${appKey}`,
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
