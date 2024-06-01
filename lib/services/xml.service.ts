// cookie helpers
import { getAuthenticationToken } from "lib/cookie";
// api routes
import { BASE_STAGING, BASE_LOCAL, BASE_PROD } from "@constants/api-routes";

const base_url =
  process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "production"
    ? BASE_PROD
    : process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "staging"
    ? BASE_STAGING
    : BASE_LOCAL;

export const initializeXMLHttpRequest = (path: string) => {
  let xmlHttp = new XMLHttpRequest();
  let accessToken: any = getAuthenticationToken();
  accessToken = accessToken ? JSON.parse(accessToken) : null;
  xmlHttp.open("get", base_url + path, true);
  xmlHttp.setRequestHeader("Authorization", "JWT " + accessToken.access_token);
  xmlHttp.send();

  return xmlHttp;
};
