// next imports
import Router from "next/router";
// next-cookie
import nextCookie from "next-cookies";
// js cookie
import cookie from "js-cookie";
// axios
import { setAxiosHeader } from "@configuration/axios-configuration";

// optimizing the user token data
const optimizeUserToken = (userToken: any) => {
  let token = JSON.parse(JSON.stringify(userToken));
  token = { ...token, user: { ...token?.user, initial_assessments: [] } };
  return token;
};

// getting server side cookies
export const getServerAuthenticationCookie = (context: any) => {
  const { userToken } = nextCookie(context);
  if (userToken) return userToken;
  else return;
};

// setting authentication tokens
export const setAuthenticationToken = (userToken: any) => {
  if (userToken) {
    let stringifyUserToken = userToken ? optimizeUserToken(userToken) : null;
    stringifyUserToken = stringifyUserToken != null ? JSON.stringify(stringifyUserToken) : "";
    cookie.set("userToken", stringifyUserToken);
    setAxiosHeader(userToken.access_token);
  }
};

export const getAuthenticationToken = () => {
  const userToken = cookie.get("userToken") ? cookie.get("userToken") : null;
  return userToken;
};

export const removeAuthenticationToken = () => {
  cookie.remove("userToken");
};

// removing all user tokens
export const logout = () => {
  removeAuthenticationToken();
  Router.push("/signin");
};
