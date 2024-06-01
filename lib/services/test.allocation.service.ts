import axios from "axios";
// api routes
import {
  ALLOCATE_TEST,
  GROUP_USER,
  PRACTICE_SETS,
  PRACTICE_SETS_WITH_ID,
  PRACTICE_SET_ASSESSMENT,
  STUDENT_GROUPS,
  STUDENT_GROUPS_WITH_ID,
} from "@constants/api-routes";

export const AssessmentSet = {
  create: async (data: any) => {
    try {
      const response = await axios.post(PRACTICE_SETS, data);
      console.log(response);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(PRACTICE_SETS_WITH_ID(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (set_id: Number) => {
    try {
      const response = await axios.delete(PRACTICE_SETS_WITH_ID(set_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
export const PracticeSetAssessment = {
  create: async (data: any) => {
    try {
      const response = await axios.post(PRACTICE_SET_ASSESSMENT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
export const Group = {
  create: async (data: any) => {
    try {
      const response = await axios.post(STUDENT_GROUPS, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(STUDENT_GROUPS_WITH_ID(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (group_id: Number) => {
    try {
      const response = await axios.delete(STUDENT_GROUPS_WITH_ID(group_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
export const GroupUser = {
  create: async (data: any) => {
    try {
      const response = await axios.post(GROUP_USER, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
export const TestAllocation = {
  create: async (data: any) => {
    try {
      const response = await axios.post(ALLOCATE_TEST, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
