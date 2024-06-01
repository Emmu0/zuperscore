import React from "react";
// next imports
import { useRouter } from "next/router";
import { NextPage } from "next";
// swr
import useSWR from "swr";
// react hook form
import { useForm } from "react-hook-form";
// components
import MistakeAnalyticsFilter from "@components/users/my-performance/mistake-analytics/Filter";
import MistakeAnalyticsSubFilter from "@components/users/my-performance/mistake-analytics/SubFilter";
import AnalysisTab from "@components/users/my-performance/mistake-analytics/AnalysisTab";
// layouts
import AdminLayout from "@layouts/AdminLayout";
// api routes
import {
  TAG_SUBJECT_WITH_EXAM_ENDPOINT,
  TAG_TOPIC_WITH_DOMAIN_ENDPOINT,
  MY_PERFORMANCE_ANALYST_ENDPOINT,
  USER_WITHOUT_PAGINATION_ENDPOINT,
  SETTINGS_ENDPOINT,
  USER_ENDPOINT,
} from "@constants/api-routes";
// api services
import { APIFetcher, APIPostFetcherWithData } from "@lib/services";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

type Inputs = {
  user: null | "string";
  strategy: null | "last_five" | "all";
  subject: null | "reading_and_writing" | "math";
  output: null | "topic" | "difficulty" | "time_taken";
  topic: null | Number;
  difficulty: null | 1 | 2 | 3 | 4 | 5;
  time_taken: null | "0_30" | "30_6time_taken0" | "60_10000" | "all";
  reason_for_error: null | string;
};

let defaultValues: Inputs = {
  user: null,
  strategy: null,
  subject: null,
  output: null,
  topic: null,
  difficulty: null,
  time_taken: null,
  reason_for_error: null,
};

const MistakeAnalysis: NextPage = () => {
  const router = useRouter();
  const { user, strategy, subject, output, topic, difficulty, time_taken, reason_for_error } =
    router.query as any;

  const [userDetails, setUserDetails] = React.useState<any>();
  const [tutorId, setTutorId] = React.useState();
  const [managerId, setManagerId] = React.useState();

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);

  React.useEffect(() => {
    if (userDetails && userDetails.user && userDetails.user.role === "tutor") {
      setTutorId(userDetails?.user?.id);
    }
    if (userDetails && userDetails.user && userDetails.user.role === "manager") {
      setManagerId(userDetails?.user?.id);
    }
  }, [userDetails]);

  const [globalState, globalDispatch] = React.useContext(globalContext);
  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { ...defaultValues },
  });

  const { data: topicList, error: topicListError } = useSWR(
    TAG_TOPIC_WITH_DOMAIN_ENDPOINT(null),
    APIFetcher
  );
  const { data: subjectList, error: subjectListError } = useSWR(
    [TAG_SUBJECT_WITH_EXAM_ENDPOINT(1), `strength-analytics-tag-subject-${1}`],
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const { data: settings, error: settingsError } = useSWR(SETTINGS_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const [cursor, setCursor] = React.useState<any>(`10:0:0`);

  const SELECT_USER_ENDPOINT = `${USER_ENDPOINT}?per_page=10&cursor=${cursor}${
    userDetails?.user?.role != "admin"
      ? `${tutorId ? `&tutor_id=${tutorId}` : ""}${managerId ? `&manager_id=${managerId}` : ""}`
      : ""
  } `;

  const { data: users, error: usersError } = useSWR(
    settings && !settings[0].disabled_mistake_analyzer ? SELECT_USER_ENDPOINT : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const [analyticsRender, setAnalyticsRender] = React.useState({ filter: false, subFilter: false });
  const handleAnalyticsRender = (key: string, value: boolean) => {
    setAnalyticsRender((prevData) => {
      return { ...prevData, [key]: value };
    });
  };

  const renderStrengthAnalyticsPayload = () => {
    let payload = null;
    if (
      user != null ||
      strategy != null ||
      subject != null ||
      output != null ||
      topic != null ||
      difficulty != null ||
      time_taken != null ||
      reason_for_error != null
    )
      payload = {
        user: user ? user : null,
        strategy: strategy ? strategy : null,
        subject: subject ? subject : null,
        output: output ? output : null,
        topic: topic ? topic : null,
        difficulty: difficulty ? difficulty : null,
        time_taken: time_taken ? time_taken : null,
        reason_for_error: reason_for_error ? reason_for_error : null,
      };
    return payload;
  };
  const { data: strengthAnalysis, error: strengthAnalysisError } = useSWR(
    analyticsRender && analyticsRender?.filter
      ? [MY_PERFORMANCE_ANALYST_ENDPOINT, JSON.stringify(renderStrengthAnalyticsPayload())]
      : null,
    (url) => APIPostFetcherWithData(url, renderStrengthAnalyticsPayload())
  );

  const generateFilters = () => {
    if (
      watch("user") != null &&
      watch("strategy") != null &&
      watch("subject") != null &&
      watch("output") != null
    ) {
      router.replace(
        `/user-performance/mistake-analytics?user=${watch("user")}&strategy=${watch(
          "strategy"
        )}&subject=${watch("subject")}&output=${watch("output")}`,
        undefined,
        {
          shallow: true,
        }
      );
      handleAnalyticsRender("filter", true);
    } else {
      handleAnalyticsRender("filter", false);
      handleAlert("warning", "Warning", "Please select the filters to continue searching.");
    }
  };
  const clearFilters = () => {
    if (watch("user") && watch("strategy") && watch("subject") && watch("output")) {
      router.replace(`/user-performance/mistake-analytics`, undefined, {
        shallow: true,
      });
      reset({ ...defaultValues });
      handleAnalyticsRender("filter", false);
    }
  };

  const generateSubFilters = () => {
    if (
      watch("topic") != null ||
      watch("difficulty") != null ||
      watch("time_taken") != null ||
      watch("reason_for_error") != null
    ) {
      router.replace(
        `/user-performance/mistake-analytics?user=${watch("user")}&strategy=${watch(
          "strategy"
        )}&subject=${watch("subject")}&output=${watch("output")}${
          watch("topic") ? `&topic=${watch("topic")}` : ``
        }${watch("difficulty") ? `&difficulty=${watch("difficulty")}` : ``}${
          watch("time_taken") ? `&time_taken=${watch("time_taken")}` : ``
        }${watch("reason_for_error") ? `&reason_for_error=${watch("reason_for_error")}` : ``}`,
        undefined,
        {
          shallow: true,
        }
      );
      handleAnalyticsRender("subFilter", true);
    } else {
      handleAnalyticsRender("subFilter", false);
      handleAlert("warning", "Warning", "Please select any sub filters to continue searching.");
    }
  };
  const clearSubFilters = () => {
    if (watch("topic") || watch("difficulty") || watch("time_taken") || watch("reason_for_error")) {
      router.replace(
        `/user-performance/mistake-analytics?${user ? "user=" + user : ""}&strategy=${watch(
          "strategy"
        )}&subject=${watch("subject")}&output=${watch("output")}`,
        undefined,
        {
          shallow: true,
        }
      );
      handleAnalyticsRender("filter", true);
    }
  };

  React.useEffect(() => {
    if (
      user ||
      strategy ||
      subject ||
      output ||
      topic ||
      difficulty ||
      time_taken ||
      reason_for_error
    ) {
      reset({
        ...defaultValues,
        user: user ? user : null,
        strategy: strategy ? strategy : null,
        subject: subject ? subject : null,
        output: output ? output : null,
        topic: topic ? topic : null,
        difficulty: difficulty ? difficulty : null,
        time_taken: time_taken ? time_taken : null,
        reason_for_error: reason_for_error ? reason_for_error : null,
      });
      if (strategy && subject && output) handleAnalyticsRender("filter", true);
    }
  }, [user, strategy, subject, output, topic, difficulty, time_taken, reason_for_error, reset]);

  return (
    <AdminLayout padding={false}>
      <div className="relative w-full h-full overflow-hidden flex flex-col">
        <div className="text-xl font-medium px-5 py-4 flex-shrink-0 w-full">Mistake Analytics</div>
        {settings && !settings[0].disabled_mistake_analyzer ? (
          <>
            {subjectList && !subjectListError && users && !usersError ? (
              <div className="w-full h-full overflow-hidden relative flex flex-col">
                <div className="w-full px-5 flex-shrink-0">
                  <MistakeAnalyticsFilter
                    users={users.results}
                    mutateUrl={SELECT_USER_ENDPOINT}
                    subjects={subjectList}
                    control={control}
                    generateFilters={generateFilters}
                    clearFilters={clearFilters}
                  />
                </div>
                {analyticsRender && analyticsRender?.filter && (
                  <>
                    {strengthAnalysis && !strengthAnalysisError ? (
                      <div className="w-full h-full overflow-hidden flex">
                        <div className="w-[300px] h-full flex-shrink-0 p-5 py-4 overflow-y-auto">
                          <MistakeAnalyticsSubFilter
                            subject={subject}
                            output={output}
                            topicList={topicList}
                            strengthAnalysis={strengthAnalysis?.data}
                            control={control}
                            generateSubFilters={generateSubFilters}
                            clearSubFilters={clearSubFilters}
                          />
                        </div>
                        <div className="w-full h-full pr-5 py-4 overflow-hidden">
                          <div className="w-full h-full border border-gray-200 rounded-sm p-3 space-y-3 overflow-y-auto">
                            <AnalysisTab
                              topicList={topicList}
                              subject={subject}
                              output={output}
                              strengthAnalysis={strengthAnalysis?.data}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-600 text-sm py-10">loading...</div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-700 py-5">Loading...</div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-700 py-5">
            This feature is currently disabled due to heavy load of testing. Kindly make a request
            on your WhatsApp group to resume this.
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default authWrapper(MistakeAnalysis, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
