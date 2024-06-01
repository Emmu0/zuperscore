// import { axiosPScaleInstance } from "@configuration/axios-configuration";
import axios from "axios";
// api routes
import {
  ASSESSMENT_MIGRATION_SESSIONS_WITH_ASSESSMENT_ID_ENDPOINT,
  ASSESSMENT_MIGRATION_SESSIONS_ATTEMPT_CREATE_BULK_ENDPOINT,
  ASSESSMENT_MIGRATION_SESSIONS_ATTEMPT_CREATE_BULK_ASYNC_ENDPOINT,
} from "@constants/api-routes";
// import { ASSESSMENT_MIGRATION_ATTEMPTS_WITH_SESSIONS_ENDPOINT } from "@pscale/helpers/api-routes";

export const AssessmentMigrateSessionsWithAssessmentId = async (assessment_id: any) => {
  try {
    const response = await axios.get(
      ASSESSMENT_MIGRATION_SESSIONS_WITH_ASSESSMENT_ID_ENDPOINT(assessment_id)
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// export const AssessmentPScaleMigrateAttemptsWithSessions = async (data: any) => {
//   console.log("data", data);
//   try {
//     const response = await axiosPScaleInstance.post(
//       ASSESSMENT_MIGRATION_ATTEMPTS_WITH_SESSIONS_ENDPOINT,
//       data
//     );
//     return response.data;
//   } catch (error: any) {
//     throw error.response.data;
//   }
// };

export const AssessmentMigrateAttemptBulkCreate = async (data: any) => {
  try {
    const response = await axios.post(
      ASSESSMENT_MIGRATION_SESSIONS_ATTEMPT_CREATE_BULK_ENDPOINT,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const AssessmentMigrateAttemptBulkCreateAsync = async (data: any) => {
  try {
    const response = await axios.post(
      ASSESSMENT_MIGRATION_SESSIONS_ATTEMPT_CREATE_BULK_ASYNC_ENDPOINT,
      data
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
