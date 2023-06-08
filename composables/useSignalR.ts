import { HubConnectionBuilder } from '@microsoft/signalr'
import { msalInstance } from '~/auth'

export default (url: string) => {
  // const connection = new HubConnectionBuilder().withUrl(url, {
    // accessTokenFactory: async () => {
      // Use the appropriate authentication library for Azure AD authentication.
      // For example, you can use msal.js or adal.js.
      // Obtain a valid access token from Azure AD.
      // const authResult = await msalInstance.acquireTokenSilent({
        // scopes: ["openid", "profile", ""
      // });
      // Acquire an access token using your authentication provider
      // const token = await authProvider.getAccessToken();

      // return token;
    // }


  // }).build();
  // connection.on("newDeviceData", (historiek: any) => {
  //   console.info(historiek);
  // });
  // connection.start()
  //   .then(() => {
  //     console.log("SignalR connection established.");
  //   })
  //   .catch((error) => {
  //     console.error("Error establishing SignalR connection:", error);
  //   });
}