import axios from "axios";
// api routes
import {
  USER_ASSESSMENT_GENERATE,
  USER_ASSESSMENT_RENDER,
  USER_ASSESSMENT_SESSIONS,
  USER_ASSESSMENT_SESSIONS_WITH_ID,
  USER_ASSESSMENT_ATTEMPT_ENDPOINT,
  USER_ASSESSMENT_ATTEMPT_WITH_ID_ENDPOINT,
  WEEKLY_PROGRESS,
} from "@constants/api-routes";

export const UserAssessmentGenerate = {
  create: async (data: any) => {
    try {
      const response = await axios.post(USER_ASSESSMENT_GENERATE, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  bulkCreate: async (data: any) => {
    const promiseData = [];
    for (let i = 0; i < data.length; i++) {
      promiseData.push(axios.post(USER_ASSESSMENT_GENERATE, data[i]));
    }
    return await Promise.all(promiseData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },
};

export const UserAssessmentRender = {
  create: async (data: any) => {
    try {
      const response = await axios.post(USER_ASSESSMENT_RENDER, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const UserAssessmentSessions = {
  update: async (data: any) => {
    try {
      const response = await axios.put(USER_ASSESSMENT_SESSIONS_WITH_ID(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const AssessmentSession = {
  create: async (data: any) => {
    try {
      const response = await axios.post(USER_ASSESSMENT_SESSIONS, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(USER_ASSESSMENT_SESSIONS_WITH_ID(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (data: any) => {
    try {
      const response = await axios.delete(USER_ASSESSMENT_SESSIONS_WITH_ID(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const AssessmentAttempt = {
  create: async (data: any) => {
    try {
      const response = await axios.post(USER_ASSESSMENT_ATTEMPT_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(USER_ASSESSMENT_ATTEMPT_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (data: any) => {
    try {
      const response = await axios.delete(USER_ASSESSMENT_ATTEMPT_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const WeeklyProgress={
  create: async (data: any) => {
    try {
      const response = await axios.post(WEEKLY_PROGRESS(data?.user_id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(WEEKLY_PROGRESS(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
}
