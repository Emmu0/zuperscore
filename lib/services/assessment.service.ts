import axios from "axios";
// api routes
import {
  ASSESSMENT_ENDPOINT,
  ASSESSMENT_WITH_ID_ENDPOINT,
  ASSESSMENT_WITH_SECTIONS_ENDPOINT,
  SECTION_WITH_ID_ENDPOINT,
  ASSESSMENT_SECTION_BRIDGE_WITH_ID_ENDPOINT,
  SECTION_WITH_QUESTIONS_ENDPOINT,
  GENERATE_QUESTIONS_FROM_SUBJECT_UNDER_SECTION,
  QUESTION_ENDPOINT,
  QUESTION_WITH_ID_ENDPOINT,
  OPTION_WITH_ID_ENDPOINT,
  OPTION_ENDPOINT,
  ADD_ASSESSMENT_QUESTION_TO_SUBJECT,
  ASSESSMENT_QUESTION_FROM_SUBJECT_NODE_ENDPOINT,
  ASSESSMENT_SCALED_SCORE,
} from "@constants/api-routes";

export const Assessment = {
  create: async (data: any) => {
    try {
      const response = await axios.post(ASSESSMENT_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(ASSESSMENT_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (assessment_id: Number) => {
    try {
      const response = await axios.delete(ASSESSMENT_WITH_ID_ENDPOINT(assessment_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const Section = {
  create: async (data: any) => {
    try {
      const response = await axios.post(
        ASSESSMENT_WITH_SECTIONS_ENDPOINT(data?.assessment_id),
        data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(SECTION_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (assessment_id: Number) => {
    try {
      const response = await axios.delete(SECTION_WITH_ID_ENDPOINT(assessment_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  generateBulkQuestionFromSelection: async (questionPayload: any) => {
    try {
      const response = await axios.post(
        GENERATE_QUESTIONS_FROM_SUBJECT_UNDER_SECTION,
        questionPayload
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const SectionQuestionBridge = {
  update: async (data: any) => {
    try {
      const response = await axios.put(ASSESSMENT_SECTION_BRIDGE_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (section_bridge_id: any) => {
    try {
      const response = await axios.delete(
        ASSESSMENT_SECTION_BRIDGE_WITH_ID_ENDPOINT(section_bridge_id)
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const Question = {
  create: async (data: any) => {
    try {
      const response = await axios.post(SECTION_WITH_QUESTIONS_ENDPOINT(data.section), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(QUESTION_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (assessment_id: Number) => {
    try {
      const response = await axios.delete(QUESTION_WITH_ID_ENDPOINT(assessment_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  createWithoutSection: async (data: any) => {
    try {
      const response = await axios.post(QUESTION_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

export const Option = {
  create: async (data: any) => {
    try {
      const response = await axios.post(OPTION_ENDPOINT, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  update: async (data: any) => {
    try {
      const response = await axios.put(OPTION_WITH_ID_ENDPOINT(data?.id), data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (option_id: Number) => {
    try {
      const response = await axios.delete(OPTION_WITH_ID_ENDPOINT(option_id));
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  asyncCreateRequest: async (data: any) => {
    const promiseData = [];
    for (let i = 0; i < data.length; i++) {
      promiseData.push(axios.post(OPTION_ENDPOINT, data[i]));
    }
    return await Promise.all(promiseData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },
  asyncEditRequest: async (data: any) => {
    const promiseData = [];
    for (let i = 0; i < data.length; i++) {
      promiseData.push(axios.put(OPTION_WITH_ID_ENDPOINT(data[i]?.id), data[i]));
    }
    return await Promise.all(promiseData)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error.response.data;
      });
  },
  asyncDeleteRequest: async (data: any) => {
    const promiseData = [];
    for (let i = 0; i < data.length; i++) {
      promiseData.push(axios.delete(OPTION_WITH_ID_ENDPOINT(data[i])));
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

export const AssessmentTags = {
  create: async (data: any) => {
    try {
      const response = await axios.post(
        ADD_ASSESSMENT_QUESTION_TO_SUBJECT(data?.question_id),
        data?.data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  delete: async (data: any) => {
    try {
      const response = await axios.delete(
        ASSESSMENT_QUESTION_FROM_SUBJECT_NODE_ENDPOINT(data?.question_id, data?.tag_id)
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};

// scaled score
export const AssessmentScaledScore = async (data: any) => {
  try {
    const response = await axios.post(ASSESSMENT_SCALED_SCORE, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
