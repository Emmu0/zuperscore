import axios from "axios";
// constants
import { BASE_STAGING, BASE_LOCAL, BASE_PROD } from "@constants/api-routes";
// cookie helpers
import { logout, getAuthenticationToken } from "lib/cookie";


const base_url =
  process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "production"
    ? BASE_PROD
    : process.env.NEXT_PUBLIC_APP_ENVIRONMENT === "staging"
    ? BASE_STAGING
    : BASE_LOCAL;

axios.defaults.baseURL = base_url;

export const setAxiosHeader = (token: string) => {
  if (token) axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  else axios.defaults.headers.common["Authorization"] = "";
};

(function () {
  let authToken: any = getAuthenticationToken();
  authToken = authToken ? JSON.parse(authToken) : null;
  if (authToken && authToken.access_token) setAxiosHeader(authToken.access_token);
})();

const UNAUTHORIZED = [401];
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status }: any = error.response;
    if (UNAUTHORIZED.includes(status)) {
      logout();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
