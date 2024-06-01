import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// components
import Modal from "@components/ui/Modal";
import DateTimePicker from "@components/ui/DateTimePicker";
// common
import { bindZero } from "@constants/common";
// api services
import { AssessmentSession } from "@lib/services/user.assessment.service";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

interface ICreateEditAssessmentSession {
  children?: React.ReactNode;
  session?: any;
  mutationData?: any;
  mutation?: any;
}

interface IDefaultFromData {
  session_id: number | null;
  scheduled_at: string | null;
}

let defaultValues: IDefaultFromData = {
  session_id: null,
  scheduled_at: null,
};

const renderScheduleTime = (date: any) => {
  const d = new Date(date);
  const dateTimeLocalValue = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1);
  return dateTimeLocalValue;
};

const renderScheduleMinTime = (date: any) => {
  let dateTimeLocalValue: any = new Date();
  dateTimeLocalValue = `${dateTimeLocalValue.getFullYear()}-${bindZero(
    dateTimeLocalValue.getMonth() + 1
  )}-${dateTimeLocalValue.getDate()}T${bindZero(0)}:${bindZero(0)}`;
  return dateTimeLocalValue;
};

const CreateEditAssessmentSession: React.FC<ICreateEditAssessmentSession> = ({
  children,
  session,
  mutationData,
  mutation,
}) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<IDefaultFromData>({
    defaultValues: { ...defaultValues },
  });

  const [isModal, setModal] = React.useState<any>(false);
  const handleOpen = () => {
    if (reset) {
      reset({
        session_id: session != null ? session?.id : null,
        scheduled_at: session?.scheduled_at ? renderScheduleTime(session?.scheduled_at) : null,
      });
      setModal(true);
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleAssessmentSession = async (data: IDefaultFromData) => {
    if (session && session?.id) return editSession(data?.session_id, data?.scheduled_at);
  };

  const editSession = async (session_id: any, scheduled_at: any) => {
    const payload = {
      id: session_id,
      scheduled_at: scheduled_at ? new Date(scheduled_at) : null,
    };

    if (payload?.scheduled_at)
      await AssessmentSession.update(payload)
        .then((response) => {
          mutation({
            ...mutationData,
            results: mutationData.results.map((_data: any) =>
              _data?.id == session_id ? response : _data
            ),
          });
          handleClose();
          handleAlert("success", "Session updated successfully.", "Session updated successfully.");
        })
        .catch((error) => {
          console.log(error);
          handleAlert(
            "error",
            "Something went wrong.",
            "Error updating a session. Please try again."
          );
        });
    else
      handleAlert(
        "error",
        "Invalid Date selected.",
        "Please select the date greater than current date and time."
      );

    return;
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>

      <Modal
        title={`Edit Assessment Session`}
        modal={isModal}
        setModal={() => {
          setModal(false);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(handleAssessmentSession)}
      >
        <div className="space-y-4">
          <DateTimePicker
            name={`scheduled_at`}
            setValue={setValue}
            timePicker={true}
            minDate={renderScheduleMinTime(new Date())}
            value={getValues("scheduled_at")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateEditAssessmentSession;
