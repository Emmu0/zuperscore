import React from "react";
// swr
import useSWR from "swr";
// react hook form
import { useForm } from "react-hook-form";
// components
import StudentProgress from "./StudentProgress";
import InactiveProgress from "./InactiveProgress";
// api routes
import { WEEKLY_PROGRESS } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { WeeklyProgress } from "@lib/services/user.assessment.service";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

type Inputs = {
  id: string | null;
  start_date: string;
  end_date: string;
  core_class: number;
  doubts_class: number;
  strategy_class: number;
  sectional_class: number;
  reading_articles: number;
  mock_tests: number;
  practice_sheet: number;
  analyse: number;
  progress: {
    id: string;
    name: string;
    date: string;
    duration: number;
  }[];
};

let defaultValues: Inputs = {
  id: null,
  start_date: "",
  end_date: "",
  core_class: 0,
  doubts_class: 0,
  strategy_class: 0,
  sectional_class: 0,
  reading_articles: 0,
  mock_tests: 0,
  practice_sheet: 0,
  analyse: 0,
  progress: [],
};

const getPreMondaynextSunday = () => {
  let date = new Date();
  let day = date.getDay();
  let prevMonday = new Date();
  if (date.getDay() == 0) {
    prevMonday.setDate(date.getDate() - 7);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }
  let nextSunday = new Date(prevMonday);
  nextSunday.setDate(nextSunday.getDate() + 6);
  return {
    prevMonday: prevMonday.toISOString().slice(0, 10),
    nextSunday: nextSunday.toISOString().slice(0, 10),
  };
};

const Joe: React.FC<any> = () => {
  const [user, setUser] = React.useState<any>();

  const { data: weeklyProgress, error: weeklyProgressError } = useSWR(
    user && user?.id ? [WEEKLY_PROGRESS(user?.id), `user-${user?.id}`] : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { ...defaultValues },
  });
  const [activeWeeklyProgress, setActiveWeeklyProgress] = React.useState<any>(defaultValues);
  const [inActiveWeeklyProgress, setInActiveWeeklyProgress] = React.useState<any>([]);

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) {
      setUser(userToken?.user);
    }
  }, [setUser]);
  React.useEffect(() => {
    if (activeWeeklyProgress && reset) {
      reset({
        id: activeWeeklyProgress?.id || null,
        start_date: activeWeeklyProgress.start_date || getPreMondaynextSunday().prevMonday,
        end_date: activeWeeklyProgress.end_date || getPreMondaynextSunday().nextSunday,
        core_class: activeWeeklyProgress?.core_class / 60 || 0,
        doubts_class: activeWeeklyProgress?.doubts_class / 60 || 0,
        strategy_class: activeWeeklyProgress?.strategy_class / 60 || 0,
        sectional_class: activeWeeklyProgress?.sectional_class / 60 || 0,
        reading_articles: activeWeeklyProgress?.reading_articles / 60 || 0,
        mock_tests: activeWeeklyProgress?.mock_tests / 60 || 0,
        practice_sheet: activeWeeklyProgress?.practice_sheet / 60 || 0,
        analyse: activeWeeklyProgress?.analyse / 60 || 0,
        progress: activeWeeklyProgress?.progress || [],
      });
    }
  }, [activeWeeklyProgress, reset]);

  const [globalState, globalDispatch] = React.useContext(globalContext);
  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };
  const onSubmitHandler = async (data: any) => {
    let payload: any = {
      progress: data?.progress || [],
    };
    if (data?.id) {
      payload = { ...payload, id: data?.id };
      return WeeklyProgress.update(payload)
        .then((response) => {
          handleAlert("success", "Success", "Weekly progress updated successfully.");
        })
        .catch((error) => {
          handleAlert("error", "Something went wrong.", error.error);
        });
    } else {
      payload = {
        ...payload,
        start_date: getPreMondaynextSunday().prevMonday,
        end_date: getPreMondaynextSunday().nextSunday,
        user_id: user?.id,
      };
      return WeeklyProgress.create(payload)
        .then((response) => {
          handleAlert("success", "Success", "Weekly progress created successfully.");
        })
        .catch((error) => {
          handleAlert("error", "Something went wrong.", error.error);
        });
    }
  };
  const findActiveWeeklyProgress = () => {
    let allWeekProgress: any = weeklyProgress?.weekly_progress.filter(
      (item: any) => item.start_date !== null && item.end_date !== null
    );
    if (weeklyProgress) {
      const filteredProgress = allWeekProgress.filter((item: any) => {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);
        const currentDate = new Date();
        return startDate <= currentDate && currentDate <= endDate;
      });
      if (filteredProgress[0]) {
        setActiveWeeklyProgress(filteredProgress[0]);
        let inActiveWeeklyProgress: any = [...allWeekProgress];
        inActiveWeeklyProgress.shift();
        setInActiveWeeklyProgress(inActiveWeeklyProgress);
      }
    }
  };
  React.useEffect(() => {
    findActiveWeeklyProgress();
  }, [weeklyProgress]);

  return (
    <div className="my-4">
      {weeklyProgress ? (
        <StudentProgress
          register={register}
          setValue={setValue}
          watch={watch}
          control={control}
          reset={reset}
          getValues={getValues}
          handleSubmit={handleSubmit}
          onSubmitHandler={onSubmitHandler}
          isSubmitting={isSubmitting}
          user_id={user?.id}
        />
      ) : (
        <div className="text-center text-gray-400 py-8">Loading...</div>
      )}
      {inActiveWeeklyProgress ? (
        <>
          {inActiveWeeklyProgress.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No Past Weekly Progress</div>
          ) : (
            <>
              <div className="font-medium px-4 py-2 border border-gray-200 bg-white text-black">
                Past Weekly Progress
              </div>
              {inActiveWeeklyProgress.map((data: any, index: any) => (
                <InactiveProgress key={index} data={data} register={register} />
              ))}
            </>
          )}
        </>
      ) : (
        <div className="text-center text-gray-400 py-8">Loading...</div>
      )}
    </div>
  );
};
export default Joe;
