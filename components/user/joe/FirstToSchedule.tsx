import React from "react";
// components
import Modal from "@components/ui/Modal";
import ReactHookInput from "@components/forms/ReactHookInput";
// api services
import { WeeklyProgress } from "@lib/services/user.assessment.service";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

const FirstToSchedule = ({
  register,
  workingProgress,
  setWorkingProgress,
  handleSubmit,
  isSubmitting,
  user_id,
}: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);
  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };
  const progressValidation = (data: any) => {
    const uniqueNames = Array.from(new Set(data?.progress.map((item: any) => item.name)));
    const summedDurations: any = uniqueNames.map((name) => {
      const sum = data?.progress
        .filter((item: any) => item.name === name)
        .reduce((acc: any, curr: any) => acc + Number(curr.duration), 0);
      return { name, sum };
    });

    for (let i = 0; i < summedDurations.length; i++) {
      if (data[summedDurations[i].name] < summedDurations[i].sum) {
        return { value: false, messeage: summedDurations[i].name };
      }
    }
    return { value: true, messeage: "success" };
  };
  const getPreMondaynextSunday=()=>{
    let date = new Date();
    let day = date.getDay();
    let prevMonday = new Date();
    if(date.getDay() == 0){
        prevMonday.setDate(date.getDate() - 7);
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }
    let nextSunday=new Date(prevMonday);
    nextSunday.setDate(nextSunday.getDate() + 6);
    return {prevMonday:prevMonday.toISOString().slice(0, 10),nextSunday:nextSunday.toISOString().slice(0, 10)};
}

  const onWeeklyProgressSubmit = (data: any) => {
    let payload: any = {
      core_class: Number(data?.core_class) * 60,
      doubts_class: Number(data?.doubts_class) * 60,
      strategy_class: Number(data?.strategy_class) * 60,
      sectional_class: Number(data?.sectional_class) * 60,
      reading_articles: Number(data?.reading_articles) * 60,
      mock_tests: Number(data?.mock_tests) * 60,
      practice_sheet: Number(data?.practice_sheet) * 60,
      analyse: Number(data?.analyse) * 60,
    };
    // const check = progressValidation({ ...payload, progress: data?.progress });
    // if (!check.value) {
    //   handleAlert(
    //     "error",
    //     "Something went wrong.",
    //     `Duration for ${check.messeage} exceeds the total duration from the schedule.`
    //   );
    //   return;
    // }
    if (data?.id) {
      payload = { ...payload, id: data?.id };
      return WeeklyProgress.update(payload)
        .then((response) => {
          handleAlert("success", "Success.", "Weekly progress updated successfully.");
          setWorkingProgress(false);
        })
        .catch((error) => {
          handleAlert("error", "Something went wrong.", error.error);
          setWorkingProgress(false)
        });
    } else {
      payload = {
        ...payload,
        user_id: user_id,
        start_date:getPreMondaynextSunday().prevMonday,
        end_date:getPreMondaynextSunday().nextSunday,
      };
      return WeeklyProgress.create(payload)
        .then((response) => {
          handleAlert("success", "Success.", "Weekly progress created successfully.");
          setWorkingProgress(false);
        })
        .catch((error) => {
          handleAlert("error", "Something went wrong.", error.error);
          setWorkingProgress(false)
        });
    }
  };
  return (
    <>
      <Modal
        size={`xl`}
        title={"First to schedule"}
        modal={workingProgress}
        setModal={() => {
          setWorkingProgress(false);
          setTimeout(() => {}, 500);
        }}
        onClose={() => {
          setWorkingProgress(false);
        }}
        loading={isSubmitting}
        onSubmit={handleSubmit(onWeeklyProgressSubmit)}
      >
        <div className=" my-2 bg-white">
          <div className="grid grid-cols-4 gap-4 px-4 py-2">
            <div className="w-full">
              <ReactHookInput
                label="Core Class (in Hrs)"
                type="number"
                name="core_class"
                register={register}
                className="py-1 rounded"
                min={0}
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Doubts Class (in Hrs)"
                type="number"
                name="doubts_class"
                register={register}
                className="py-1 rounded"
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Strategy Class (in Hrs)"
                type="number"
                name="strategy_class"
                register={register}
                className="py-1 rounded"
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Sectional Test (in Hrs)"
                type="number"
                name="sectional_class"
                register={register}
                className="py-1 rounded"
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Reading Articles (in Hrs)"
                type="number"
                name="reading_articles"
                register={register}
                className="py-1 rounded"
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Mock Tests (in Hrs)"
                type="number"
                name="mock_tests"
                register={register}
                className="py-1 rounded"
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Practice Sheet (in Hrs)"
                type="number"
                name="practice_sheet"
                register={register}
                className="py-1 rounded"
              />
            </div>
            <div className="w-full">
              <ReactHookInput
                label="Analysis (in Hrs)"
                type="number"
                name="analyse"
                register={register}
                className="py-1 rounded"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default FirstToSchedule;
