import React from "react";
// react hook form
import { useForm, Controller, useFieldArray } from "react-hook-form";
// icons
import { TrashIcon } from "@heroicons/react/outline";
// components
import Button from "@components/buttons";
import Modal from "@components/ui/Modal";
import SearchFilter from "@components/filters/SelectSearchFilter";
import DateTimePicker from "@components/ui/DateTimePicker";
// common
import { bindZero } from "@constants/common";
// api services
import { UserAssessmentGenerate } from "@lib/services/user.assessment.service";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

interface ICreateEditAssessmentSession {
  children?: React.ReactNode;
  user_id?: string;
  assessment_id?: string | null;
  assessments?: any;
  mutationData?: any;
  mutation?: any;
}

interface IDefaultFromData {
  assessment_id: string | null;
  assessments: {
    assessment: string | null;
    scheduled_at: string | null;
  }[];
}

let defaultValues: IDefaultFromData = {
  assessment_id: null,
  assessments: [{ assessment: null, scheduled_at: null }],
};

const renderScheduleMinTime = (date: any) => {
  let dateTimeLocalValue: any = new Date();
  dateTimeLocalValue = `${dateTimeLocalValue.getFullYear()}-${bindZero(
    dateTimeLocalValue.getMonth() + 1
  )}-${dateTimeLocalValue.getDate()}T${bindZero(dateTimeLocalValue.getHours())}:${bindZero(
    dateTimeLocalValue.getMinutes()
  )}`;
  return dateTimeLocalValue;
};

const CreateEditAssessmentSession: React.FC<ICreateEditAssessmentSession> = ({
  children,
  user_id,
  assessment_id,
  assessments: assessmentOptions,
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

  const [assessmentListOptions, setAssessmentListOptions] = React.useState<any>(null);

  React.useEffect(() => {
    if (assessmentOptions && assessmentOptions.length > 0) {
      let assessmentPayload: any = [];
      assessmentOptions.map((_assessment: any) => {
        assessmentPayload.push({
          key: _assessment?.id,
          title: _assessment?.name,
          data: _assessment,
        });
      });
      setAssessmentListOptions(assessmentPayload);
    }
  }, [assessmentOptions]);

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
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "assessments",
  });

  const handleAssessment = (
    type: any = "create",
    index: any = null,
    key: any = null,
    value: any = null
  ) => {
    if (type === "create") append({ assessment: null, scheduled_at: null });
    if (type === "edit")
      update(index, {
        ...fields[index],
        [key]: value,
      });
    if (type === "delete") remove(index);
  };

  const [isModal, setModal] = React.useState<any>(false);
  const handleOpen = () => {
    if (reset) {
      reset({ ...defaultValues });
      setModal(true);
    }
  };
  const handleClose = () => {
    setModal(false);
  };

  const createAssessmentSession = async (data: any) => {
    let payload: any = [];

    if (data && data?.assessments && data?.assessments.length > 0) {
      payload = data?.assessments.map((_assessment: any) => {
        if (assessment_id != null || (_assessment && _assessment?.assessment != null)) {
          return {
            assessment: assessment_id ? assessment_id : _assessment?.assessment,
            user: user_id ? parseInt(user_id) : user_id,
            scheduled_at: _assessment?.scheduled_at ? new Date(_assessment?.scheduled_at) : null,
          };
        }
      });
    }

    if (payload.length === data?.assessments.length)
      return await UserAssessmentGenerate.bulkCreate(payload)
        .then((response) => {
          handleClose();
          handleAlert("success", "Session created successfully.", "Session created successfully.");
          return mutation({
            ...mutationData,
            results: [
              response.map((_response: any) => _response?.data?.user_assessment_session),
              ...mutationData.results,
            ],
          });
        })
        .catch((error) => {
          console.log(error);
          handleAlert(
            "error",
            "Something went wrong.",
            "Error creating a session. Please try again."
          );
          return;
        });
    else {
      handleAlert("error", "Assessment Field empty.", "Please select the assessment.");
      return;
    }
  };

  return (
    <div>
      <div>
        {children ? (
          <div onClick={handleOpen}>{children}</div>
        ) : (
          <Button size={"xs"} onClick={handleOpen}>
            Create Session
          </Button>
        )}
      </div>

      <Modal
        title={`Create Assessment Session`}
        modal={isModal}
        setModal={() => {
          setModal(false);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(createAssessmentSession)}
      >
        <div className="space-y-4">
          <div className="text-sm text-blue-500 font-medium">
            NOTE: For unscheduled test, click continue button without selecting the date.
          </div>
          {fields &&
            fields.length > 0 &&
            fields.map((_routeField: any, index: any) => (
              <div
                key={index}
                className="border border-gray-200 rounded-sm p-2 flex items-center gap-4"
              >
                <div className="flex-shrink-0 border border-gray-200 w-[28px] h-[28px] flex justify-center items-center rounded-sm mb-auto">
                  {index + 1}
                </div>
                <div className="w-full h-full space-y-2">
                  {assessment_id === null && (
                    <div>
                      <Controller
                        control={control}
                        rules={{
                          required: "This field is required.",
                        }}
                        name={`assessments.${index}.assessment`}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <div>
                             <div className="text-sm text-dark-100 mb-1">
                              Select Assessment
                              <span className="text-red-600 ml-1">*</span>
                            </div>
                            <div>
                              <SearchFilter
                                placeHolder="Select Assessment"
                                options={assessmentListOptions}
                                selectedOptions={value ? [value] : null}
                                handleOption={(selectedValue: any) => {
                                  onChange(selectedValue[0]);
                                }}
                                multiple={false}
                                position="left"
                                key={index}
                              />
                            </div>
                          </div>
                        )}
                      />
                      {errors?.assessments?.[index]?.assessment?.message && (
                        <div className="text-sm text-red-500 mt-1">
                          {errors?.assessments?.[index]?.assessment?.message}
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <DateTimePicker
                      name={`assessments.${index}.scheduled_at`}
                      setValue={setValue}
                      timePicker={true}
                      minDate={renderScheduleMinTime(new Date())}
                      value={getValues(`assessments.${index}.scheduled_at`)}
                    />
                  </div>
                </div>

                {fields && fields.length > 1 && (
                  <div
                    className="flex-shrink-0 border border-gray-200 w-[28px] h-[28px] flex justify-center items-center rounded-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => handleAssessment("delete", index, null, null)}
                  >
                    <TrashIcon height="14px" width="14px" />
                  </div>
                )}
              </div>
            ))}

          {assessment_id === null && (
            <div>
              <Button size="xs" onClick={() => handleAssessment("create")}>
                Add Sessions
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CreateEditAssessmentSession;
