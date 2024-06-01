import axios from "axios";
// api routes
import {
  SUBJECT_CREATE_ENDPOINT,
  SUBJECT_NODE_OPERATIONS_ENDPOINT,
  SUBJECT_NODE_ENDPOINT,
  ASSESSMENT_QUESTION_FROM_SUBJECT_NODE_ENDPOINT,
} from "@constants/api-routes";

export const SubjectCreate = async (data: any) => {
  try {
    const response = await axios.post(SUBJECT_CREATE_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const SubjectNodeEdit = async (data: any) => {
  try {
    const response = await axios.put(SUBJECT_NODE_ENDPOINT(data.id), data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const SubjectNodeOperation = async (data: any) => {
  try {
    const response = await axios.post(SUBJECT_NODE_OPERATIONS_ENDPOINT, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const SubjectNodeQuestionSequence = async (data: any) => {
  try {
    const response = await axios.put(
      ASSESSMENT_QUESTION_FROM_SUBJECT_NODE_ENDPOINT(data?.question, data?.node),
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
