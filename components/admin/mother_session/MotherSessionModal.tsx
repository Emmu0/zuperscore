import Modal from "@components/ui/Modal";
import { ALL_SUBJECT } from "@constants/api-routes";
import { APIFetcher } from "@lib/services";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import useSWR from "swr";


type Inputs = {
  title: string | null;
  session: string | null;
  subject: string | null;
  time: number | null;
  moduleId: string | null;
  action: boolean;
};

let defaultValues: Inputs = {
  title: null,
  session: null,
  subject: null,
  time: null,
  moduleId: null,
  action: false,
};

const MotherSessionModal: React.FC<any> = ({ popup, popupHandler }: any) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting,dirtyFields },
  } = useForm<Inputs>({defaultValues: { ...defaultValues }, mode: "onTouched"});
  const { data: AllSubject, error: AllsubjectError } = useSWR(ALL_SUBJECT, APIFetcher, {
    refreshInterval: 0,
  });
  interface Subject {
    value: string;
    label: string;
  }

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    
    if (AllSubject) {
      const newSubjects = AllSubject.filter(
        (vl: any) => (vl.title.length > 0 )).map((vl: any) => ({
        value: vl.id,
        label: vl.title,
      }));
      console.log(newSubjects, AllSubject, "waiii");

      setSubjects(newSubjects);
    }
  }, [AllSubject]);
  const onSubmitSession: any = (data: any) => {
    console.log(data, errors, "onSubmitSession");
  };
  const onSubmitChapter: any = (data: any) => {
    console.log(data, errors, "onSubmitChapter");
  };
  const onSubmitModule: any = (data: any) => {
    console.log(data, errors, "onSubmitModule");
  };
  const onSubmitTopic: any = (data: any) => {
    console.log(data, errors, "onSubmitTopic");
  };

  console.log(errors,getValues("action"), "onSubmitSession!!");
  return (
    <div>
      <Modal
        size={`xl`}
        title={
          popup == "session"
            ? "Create Session"
            : popup == "chapter"
            ? "Create Chapter"
            : popup === "module_mother"
            ? "Create Module"
            : "Create Topic"
        }
        modal={true}
        setModal={() => {
          popupHandler(false);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(
          popup == "session"
            ? onSubmitSession
            : popup == "chapter"
            ? onSubmitChapter
            : popup === "module_mother"
            ? onSubmitModule
            : onSubmitTopic
        )}
      >
        {popup === "session" ? (
          <div className="flex-col space-y-5">
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3 flex">
                    Title <p className="text-red-600 ml-1">*</p>
                  </div>

                  <div className="mt-3 ">
                    <input
                      type="text"
                      {...register(`title`, {
                        required: "This field is required",
                      })}
                      className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="Title"
                    />
                    {errors?.title?.type === "required" && (
                      <small className="text-red-600 ml-2">{errors?.title?.message}</small>
                    )}
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3 flex">
                    Subject <small className="text-red-600 ml-1">*</small>
                  </div>
                  <div className="mt-3 ">
                  <Controller
                        {...register(`subject`, {
                          required: {
                            value: true,
                            message: `This is Error.`
                          },
                        })}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => {
                          onChange = (event) => {
                            setValue("subject", event);
                            clearErrors("subject")
                          };

                          return (
                            <CreatableSelect
                             isClearable 
                             options={subjects}
                             onChange={onChange} />
                          );
                        }}
                      />
                    {/* <input
                      {...register(`subject`, {
                        required: "This field is required",
                      })}
                      type="number"
                      className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="Subject Id"
                    /> */}
                    {errors?.subject?.type === "required" && (
                      <small className="text-red-600 ml-2">This is Error.</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : popup === "chapter" ? (
          <>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Title</div>
                    <div className="mt-3 ">
                      <input
                        {...register(`title`, {
                          required: "This field is required",
                        })}
                        type="text"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Title"
                      />
                      {errors?.title?.type === "required" && (
                        <small className="text-red-600 ml-2">{errors?.title?.message}</small>
                      )}
                    </div>
                  </div>
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Session</div>
                    <div className="mt-3 ">
                      <input
                        {...register(`session`, {
                          required: "This field is required",
                        })}
                        type="number"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Session Id"
                      />
                      {errors?.session?.type === "required" && (
                        <small className="text-red-600 ml-2">{errors?.session?.message}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mt-3">Action</div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        {...register(`action`, {
                          required: "This field is required",
                        })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {getValues("action") ? "Active":'InActive'}
                      </span>
                    </label>
                  </div>
                  
                </div>
                
                {errors?.action?.type === "required" && (
                        <small className="text-red-600 ml-2">{errors?.action?.message}</small>
                      )}
              </div>
            </div>
          </>
        ) : popup === "module_mother" ? (
          <>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Title</div>
                    <div className="mt-3 ">
                      <input
                        {...register(`title`, {
                          required: "This field is required",
                        })}
                        type="text"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Title"
                      />
                      {errors?.title?.type === "required" && (
                        <small className="text-red-600 ml-2">{errors?.title?.message}</small>
                      )}
                    </div>
                  </div>
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Time</div>
                    <div className="mt-3 ">
                      <input
                        {...register(`time`, {
                          required: "This field is required",
                        })}
                        type="number"
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Time"
                      />
                      {errors?.time?.type === "required" && (
                        <small className="text-red-600 ml-2">{errors?.time?.message}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mt-3">Action</div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        InActive
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Module</div>
                    <div className="mt-3 ">
                      <div className="">
                        <input
                          {...register(`moduleId`, {
                            required: "This field is required",
                          })}
                          type="number"
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Module Id"
                        />
                        {errors?.moduleId?.type === "required" && (
                          <small className="text-red-600 ml-2">{errors?.moduleId?.message}</small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Title</div>
                    <div className="mt-3 ">
                      <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value, ref } }) => (
                          <div className="">
                            <input
                              type="text"
                              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Title"
                              {...register(`title`, {
                                required: "This field is required",
                              })}
                            />
                            {errors?.title?.type === "required" && (
                              <small className="text-red-600 ml-2">{errors?.title?.message}</small>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mt-3">Action</div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        InActive
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default MotherSessionModal;
