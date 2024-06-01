import React from "react";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import DateTimePicker from "@components/ui/DateTimePicker";
import { getAuthenticationToken } from "@lib/cookie";
import ReactHookTimeInput from "@components/forms/ReactHookTimeInput";

interface ISectionForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
  control: any;
  userDetail: any;
  reset: any;
  getValues: any;
  setDisplayPage: any;
  disabled?: boolean;
}

const ProfileGoalPostsAndDeadlines: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  reset,
  errors,
  control,
  userDetail,
  getValues,
  disabled = false,
  setDisplayPage,
}) => {
  const [switchTab, setSwitchTab] = React.useState<number>(0);
  const [userDetails, setUserDetails] = React.useState<any>();
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);
  React.useEffect(() => {
    setDisplayPage(null);
  }, []);
  return (
    <>
      {(userDetail.role === "user" || userDetail.role === "manager") && (
        <div className="flex mb-4 gap-4">
          <button
            onClick={() => setSwitchTab(0)}
            className={`w-full border px-4 py-2 text-sm uppercase font-medium rounded-sm ${
              switchTab === 0
                ? "bg-violet-100 text-yellow-0"
                : "hover:bg-violet-0 hover:border-violet-0 hover:text-violet-100 "
            }`}
          >
            Stage One
          </button>
          <button
            onClick={() => setSwitchTab(1)}
            className={`w-full border px-4 py-2 text-sm uppercase font-medium rounded-sm ${
              switchTab === 1
                ? "bg-violet-100 text-yellow-0"
                : "hover:bg-violet-0 hover:border-violet-0 hover:text-violet-100 "
            }`}
          >
            Stage Two
          </button>
        </div>
      )}

      {switchTab === 0 && (
        <div className="space-y-4">
          <div className="border border-gray-200 bg-white ">
            <div className="border-gray-200 p-3 px-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <ReactHookInput
                    label="Tent. Calendar core prep duration"
                    type="number"
                    name="tent_calender_core_prep_duration"
                    register={register}
                    disabled={userDetails?.user?.role === "user" ? true : disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookTimeInput
                    label="Tent. Number of hours per week"
                    name="tent_no_of_hours_per_week"
                    minHours={0}
                    maxHours={20}
                    minuteInterval={15}
                    setValue={setValue}
                    value={getValues("tent_no_of_hours_per_week")}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Tent. duration of core prep"
                    type="number"
                    name="tent_duration_of_core_prep"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookTimeInput
                    label="Tent. No. of hours for solving assignments"
                    // type="time"
                    name="tent_no_of_hours_for_solving_assignments"
                    minHours={0}
                    maxHours={20}
                    minuteInterval={15}
                    setValue={setValue}
                    value={getValues("tent_no_of_hours_for_solving_assignments")}
                    disabled={disabled}
                  />
                </div>
                <div className="w-full">
                  <ReactHookTimeInput
                    label="Tent. Time invested in Practice sheet Average weekly time investment"
                    name="tent_time_invested_in_p_s_avg_weekly_time_investment"
                    minHours={0}
                    maxHours={20}
                    minuteInterval={15}
                    setValue={setValue}
                    value={getValues("tent_time_invested_in_p_s_avg_weekly_time_investment")}
                    disabled={disabled}
                  />
                </div>
                <div className="flex-shrink-1 w-full">
                  <label className="text-sm text-dark-100 mb-1">First PTM Date</label>
                  <DateTimePicker
                    name="first_ptm_date"
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`first_ptm_date`)}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>

                <div className="w-full">
                  <ReactHookInput
                    label="Tent. date for 1st CEO presentation for the parents"
                    type="number"
                    name="tent_date_for_first_ceo_presentation_for_the_parents"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------- */}
      {switchTab === 1 && (
        <div className="space-y-4">
          <div className="border border-gray-200 bg-white ">
            <div className="border-gray-200 p-3 px-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex-shrink-1 w-full">
                  <label className="text-sm text-dark-100 mb-1">CPEA target date</label>
                  <DateTimePicker
                    name={`cpea_target_date`}
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`cpea_target_date`)}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="flex-shrink-1 w-full">
                  <label className="text-sm text-dark-100 mb-1">Mock Test start date</label>
                  <DateTimePicker
                    name="mock_test_start_date_target_date"
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`mock_test_start_date_target_date`)}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Target no. of mock tests"
                    type="number"
                    name="target_no_of_mock_tests"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Target number of PS"
                    type="number"
                    name="target_no_of_ps"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Recommended number of workshops and strategy classes"
                    type="text"
                    name="recommended_no_of_workshops_and_strategy_classes"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="flex-shrink-1 w-full">
                  <label className="text-sm text-dark-100 mb-1">Target test date</label>
                  <DateTimePicker
                    name="target_test_date"
                    setValue={setValue}
                    timePicker={false}
                    value={getValues(`target_test_date`)}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>

                <div className="w-full">
                  <ReactHookInput
                    label="Avg weekly time invested"
                    type="number"
                    name="avg_weekly_time_invested"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>

                <div className="w-full">
                  <ReactHookInput
                    label="Avg weekly test analysis time"
                    type="number"
                    name="avg_weekly_test_analysis_time"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="No. of review doubts & other misc sessions"
                    type="number"
                    name="no_of_review_doubts_and_other_misc_sessions"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Target score range for the 1st attempt"
                    type="number"
                    name="target_score_range_for_the_first_attempt"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
                <div className="w-full">
                  <ReactHookInput
                    label="Grand total"
                    type="number"
                    name="grand_total"
                    register={register}
                    disabled={
                      userDetails?.user?.role === "user" || userDetails?.user?.role === "tutor"
                        ? true
                        : disabled
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileGoalPostsAndDeadlines;
