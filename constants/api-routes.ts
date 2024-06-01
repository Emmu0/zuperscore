// Base URLS
export const BASE_PROD = "https://digisatprep-dev-3bfa00a9364a.herokuapp.com/";
export const BASE_STAGING = "https://digisatprep-staging.herokuapp.com/";
export const BASE_LOCAL = "http://localhost:8000/";

// authentication urls
export const SIGN_IN_ENDPOINT = "/api/sign-in/";
export const SIGN_UP_ENDPOINT = "/api/sign-up/";

export const SEND_MOBILE_OTP_ENDPOINT = "/send-mobile-otp/";
export const VERIFY_MOBILE_OTP_ENDPOINT = "/verify-mobile-otp/";

export const FORGOT_PASSWORD_ENDPOINT = "/forgot-password/";
export const RESET_PASSWORD_ENDPOINT = "/reset-password/";

// s3 file url
export const S3_URL = `/api/files/`;

// migration endpoints
export const ASSESSMENT_MIGRATION_SESSIONS_WITH_ASSESSMENT_ID_ENDPOINT = (assessment_id: any) =>
  `/api/all-sessions/?assessment_id=${assessment_id}`;
export const ASSESSMENT_MIGRATION_SESSIONS_ATTEMPT_CREATE_BULK_ENDPOINT = `/api/create-bulk/`;
export const ASSESSMENT_MIGRATION_SESSIONS_ATTEMPT_CREATE_BULK_ASYNC_ENDPOINT = `/api/create-bulk-async/`;

// users
export const USER_ENDPOINT = `/api/users/`;
export const ZOOM_DATA_ENDPOINT =(vl : any)=> `/api/conduct/${vl}-appointments/`;
export const USER_WITHOUT_PAGINATION_ENDPOINT = `/api/users-without-pagination/`;
export const USER_WITH_ID_ENDPOINT = (user_id: any) => `/api/users/${user_id}/`;
export const USER_PASSWORD_ENDPOINT = (user_id: any) => `/api/users/${user_id}/setpassword/`;

// subject endpoints
export const SUBJECT_CREATE_ENDPOINT = `/api/subjects/tree/create/`;
export const SUBJECT_ENDPOINT = `/api/subjects/`;
export const ALL_SUBJECT = `/api/subjects/?state=ACTIVE`;
export const SUBJECT_NODE_ENDPOINT = (node_id: any) => `/api/subjects-nodes/${node_id}/`;
export const SUBJECT_WITH_NODE_ENDPOINT = (node_id: any) => `/api/subjects/tree/${node_id}/`;
export const SUBJECT_NODE_OPERATIONS_ENDPOINT = `/api/subjects/tree/`;

export const SUBJECT_CHILD_NODE_WITH_NODE_ID = (subject_node_id: any) =>
  `/api/child-nodes/${subject_node_id}/`;
export const SUBJECT_ONE_LEVEL_CHILD_NODES_WITH_NODE_ID = (subject_node_id: any) =>
  `/api/onelevel-childnodes/${subject_node_id}/`;

// assessments urls
export const ASSESSMENT_ENDPOINT = `/api/assessments/`;
export const ASSESSMENT_WITH_ID_ENDPOINT = (assessment_id: Number) =>
  `/api/assessments/${assessment_id}/`;

export const ASSESSMENT_WITH_SECTIONS_ENDPOINT = (assessment_id: Number) =>
  `/api/assessments/${assessment_id}/sections/`;

export const SECTION_ENDPOINT = `/api/sections/`;
export const SECTION_WITH_ID_ENDPOINT = (section_id: Number) => `/api/sections/${section_id}/`;

export const SECTION_WITH_QUESTIONS_ENDPOINT = (section_id: Number) =>
  `/api/sections/${section_id}/questions/`;

export const ASSESSMENT_SECTION_BRIDGE_WITH_ID_ENDPOINT = (section_bridge_id: any) =>
  `/api/sections/questions/${section_bridge_id}/`;

export const QUESTION_ENDPOINT = `/api/questions/`;
export const QUESTION_WITH_ID_ENDPOINT = (question_id: Number) => `/api/questions/${question_id}/`;
export const QUESTION_BY_IDS_ENDPOINT = `/api/questions-by-ids/`;

export const OPTION_ENDPOINT = `/api/options/`;
export const OPTION_WITH_ID_ENDPOINT = (option_id: Number) => `/api/options/${option_id}/`;

// question tags fetcher endpoints
export const TAG_EXAM_ENDPOINT = `/api/tags/exam/`;
export const TAG_SUBJECT_WITH_EXAM_ENDPOINT = (exam_id: any = null) =>
  `/api/tags/subject/${exam_id ? `?exam=${exam_id}` : ``}`;
export const TAG_DOMAIN_WITH_SUBJECT_ENDPOINT = (subject_id: any = null) =>
  `/api/tags/domain/${subject_id ? `?subject=${subject_id}` : ``}`;
export const TAG_TOPIC_WITH_DOMAIN_ENDPOINT = (domain_id: any = null) =>
  `/api/tags/topic/${domain_id ? `?domain=${domain_id}` : ``}`;
export const TAG_SUB_TOPIC_WITH_TOPIC_ENDPOINT = (topic_id: any = null) =>
  `/api/tags/sub-topic/${topic_id ? `?topic=${topic_id}` : ``}`;

// user and admin assessment endpoints for scheduling and filtering purposes
export const ASSESSMENT_WITH_SESSIONS_WITH_USER_ID = (user_id: any) =>
  `/api/users/${user_id}/assessments/`;

export const ASSESSMENT_USERS_WITH_ASSESSMENT_ID = (assessment_id: any) =>
  `/api/assessments/${assessment_id}/users/list/`;

// tag represents subject nodes
export const ASSESSMENT_QUESTION_SUBJECT_LIST = `/api/subjects-nodes/`;
export const ASSESSMENT_QUESTION_WITH_SUBJECT_ID = (subject_id: Number) =>
  `/api/subnodes/${subject_id}/`;
export const ADD_ASSESSMENT_QUESTION_TO_SUBJECT = (question_id: Number) =>
  `/api/questions/${question_id}/nodes/`;
export const ASSESSMENT_QUESTION_FROM_SUBJECT_NODE_ENDPOINT = (
  question_id: Number,
  subject_id: Number
) => `/api/questions/${question_id}/nodes/${subject_id}/`;

export const GENERATE_QUESTIONS_FROM_SUBJECT_UNDER_SECTION = `/api/generate-for-sections/`;
export const SEARCH_QUESTIONS_FROM_SUBJECT = `/api/search-questions/`;

// user assessment endpoints
export const USER_ASSESSMENT_GENERATE = `/api/users/assessments-sessions/generate/`;
export const USER_ASSESSMENT_RENDER = `api/users/assessments-sessions/render/`;
export const USER_ASSESSMENT_SESSIONS = `/api/users/assessments-sessions/`;
export const USER_ASSESSMENT_SESSIONS_WITH_ID = (session_id: any) =>
  `/api/users/assessments-sessions/${session_id}/`;

export const USER_ASSESSMENT_ATTEMPT_ENDPOINT = `/api/users/assessments-attempts/`;
export const USER_ASSESSMENT_ATTEMPT_WITH_ID_ENDPOINT = (attempt_id: any) =>
  `/api/users/assessments-attempts/${attempt_id}/`;

export const USER_ASSESSMENT_ATTEMPTS_WITH_SESSION_ID_ENDPOINT = (session_id: any) =>
  `/api/users/sessions/${session_id}/attempts/`;

export const USER_ASSESSMENT_SESSION_WITH_USER_ID = (user_id: any, assessment_id: any) =>
  `/api/users/assessments-sessions/${user_id ? `?user=${user_id}&` : `?`}${
    assessment_id ? `assessment=${assessment_id}` : ``
  }`;

export const USER_ASSESSMENT_SESSION_SECTION_WITH_SESSION_DETAILS = `/api/users/assessments-sessions/sections/`;

// user side endpoints

// dashboard
export const USER_DASHBOARD_ASSESSMENT_ENDPOINT = `/api/users/assessments/dashboard/`;

// assessment
export const USER_ASSESSMENT_ENDPOINT = `/api/users/assessments/`;
export const USER_ASSESSMENT_CHECK_ENDPOINT = (assessment_id: any) =>
  `/api/users/assessments/check/?assessment_id=${assessment_id}`;

// mistake analysis
export const USER_MISTAKE_ANALYSIS_ENDPOINT = `/api/users/assessments/mistakeanalysis/`;

// scaled score
export const ASSESSMENT_SCALED_SCORE = `/api/compute-scaled-score/`;

// mistake analysis
export const MISTAKE_ANALYZER_ENDPOINT = `/api/mistakes-analyser/`;

// student strength analysis
export const MY_PERFORMANCE_ANALYST_ENDPOINT = `/api/student-my-performance-analytics/`;

// result download
export const ASSESSMENT_BULK_RESULT_DOWNLOAD_ENDPOINT = (assessment_id: any) =>
  `api/session-csv-result-download/?assessment_id=${assessment_id}`;

// settings api
export const SETTINGS_ENDPOINT = `/api/settings/`;

// assessment tags
export const ASSESSMENT_TAGS = `/api/assessment-tags/`;
// student groups
export const STUDENT_GROUPS = `/api/groups/`;
export const STUDENT_GROUPS_WITH_ID = (group_id: any) => `/api/groups/${group_id}`;
export const GROUP_USER = `/api/group-user/`;

// practice sets
export const PRACTICE_SETS = `/api/practice-sets/`;
export const PRACTICE_SETS_WITH_ID = (set_id: any) => `/api/practice-sets/${set_id}`;
export const PRACTICE_SET_ASSESSMENT = `/api/practice-set-assessment/`;

// test allocation
export const ALLOCATE_TEST = `/api/test-allocation/`;

// download assessment sessions
export const DOWNLOAD_ASSESSMENT_SESSIONS = () => `api/users/download-assessment-sessions/`;

// Download assessment analysis
export const DOWNLOAD_ASSESSMENT_ANALYSIS = () => `api/download-assessment-analysis/`;

// zoom config post api
export const ZOOM_ENDPOINT =  `/api/subjects/?state=ACTIVE`;


// Weekly progress
export const WEEKLY_PROGRESS = (user_id: any) => `/api/weekly-progress/${user_id}`;
