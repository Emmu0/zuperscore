import axios from "axios";
// api routes
import {
  SIGN_IN_ENDPOINT,
  SIGN_UP_ENDPOINT,
  SEND_MOBILE_OTP_ENDPOINT,
  VERIFY_MOBILE_OTP_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  RESET_PASSWORD_ENDPOINT,
  ZOOM_ENDPOINT,
  USER_ENDPOINT,
  ZOOM_DATA_ENDPOINT,
} from "@constants/api-routes";
export const Authentication = {
  emailLogin: async (data: any) => {
    try {
      const response = await axios.post(SIGN_IN_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  emailSignUp: async (data: any) => {
    try {
      const response = await axios.post(SIGN_UP_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  sendMobileOtp: async () => {
    try {
      const response = await axios.post(SEND_MOBILE_OTP_ENDPOINT);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  verifyMobileOtp: async (data: any) => {
    try {
      const response = await axios.post(VERIFY_MOBILE_OTP_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  forgotPassword: async (data: any) => {
    try {
      const response = await axios.post(FORGOT_PASSWORD_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  resetPassword: async (data: any) => {
    try {
      const response = await axios.post(RESET_PASSWORD_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  ZoomConfig: async (data: any) => {
    try {
      const response = await axios.post(ZOOM_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  getTeacher:async (userid:any) => {
    try {
      const response = await axios.get(`${USER_ENDPOINT}${userid}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  getAdminZoom:async (vl:any) => {
    try {
      const response = await axios.get(ZOOM_DATA_ENDPOINT(vl));
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};
