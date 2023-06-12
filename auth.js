import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: " 00f51814-c4d7-44d7-87d6-e3bb48a672f6",
    authority: "https://login.microsoftonline.com/17b35a1d-057c-4ac5-a15a-08758f7a7064",
    redirectUri: 'http://localhost:3000',
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

