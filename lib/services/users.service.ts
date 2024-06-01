import axios from "axios";
// api routes
import {
  SIGN_UP_ENDPOINT,
  USER_WITH_ID_ENDPOINT,
  USER_PASSWORD_ENDPOINT,
} from "@constants/api-routes";

export const User = {
  create: async (data: any) => {
    try {
      const response = await axios.post(SIGN_UP_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(USER_WITH_ID_ENDPOINT(data.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  updatePassword: async (data: any) => {
    try {
      const response = await axios.post(USER_PASSWORD_ENDPOINT(data.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
