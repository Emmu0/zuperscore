import Modal from "@components/ui/Modal";

import { ALL_SUBJECT, USER_ENDPOINT } from "@constants/api-routes";

import { getAuthenticationToken } from "@lib/cookie";
import { APIFetcher, APIPostFetcher } from "@lib/services";
import { Authentication } from "@lib/services/authenticate.service";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import useSWR from "swr";
import DateTimePicker from "@components/ui/DateTimePicker";

type Inputs = {
  startDate: any;
  subject: number | null;
  duration: number | null;
  host: string | null;
  title: string | null;
};

let defaultValues: Inputs = {
  startDate: null,
  subject: null,
  duration: null,
  host: null,
  title: null,
};
const ConfigPopup = ({ popupHandler, zoomPopup }: any) => {
  const [teacher, setTeacher] = useState([]);

  let teacherObj: any = [];

  teacher.map((vl: any) => {
    teacherObj.push({ label: vl.name, value: vl.id });
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });
  const { data: AllSubject, error: AllsubjectError } = useSWR(ALL_SUBJECT, APIFetcher, {
    refreshInterval: 0,
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const onSubmit = (data: any) => {
    const formObject = {
      host: data.host.value,
      subject: data.subject.value,
      title: data.title,
      start_time: data.startDate,
      duration: data.duration,
      end_time: new Date(data.startDate.getTime() + data.duration * 60 * 60 * 1000),
    };
    console.log("hello 1");
    return Authentication.ZoomConfig(formObject)
      .then((response) => {
        console.log(response, "step@@ 2");
      })
      .catch((error) => {
        console.log(error, "step@@ 3");
      });
  };

  interface Subject {
    value: string;
    label: string;
  }

  const onSubmitAdmin = () => {
    console.log("hello 2");
  };

  const [userid, setuserid] = useState<any>();

  useEffect(() => {
    if (AllSubject) {
      const newSubjects = AllSubject.filter(
        (vl: any) => (vl.title.length > 0 && vl.title === "Math") || vl.title === "English"
      ).map((vl: any) => ({
        value: vl.id,
        label: vl.title,
      }));
      console.log(newSubjects, AllSubject, "waiii");

      setSubjects(newSubjects);
    }

    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setuserid(userToken);
  }, [AllSubject]);

  return (
    <div>
      <Modal
        size={`xl`}
        title={zoomPopup == "admin" ? "Create Event" : `Schedule a Class`}
        modal={true}
        setModal={() => {
          popupHandler(false);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(zoomPopup == "admin" ? onSubmitAdmin : onSubmit)}
      >
        {zoomPopup == "admin" ? (
          <>
            <div className="flex-col space-y-5">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Host</div>
                    <div className="mt-3 ">
                      <Controller
                        control={control}
                        name="host"
                        render={({ field: { onChange, value, ref } }) => (
                          <div className="">
                            <input
                              type="number"
                              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Host"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Subject</div>
                    <div className="mt-3 ">
                      <Controller
                        control={control}
                        name="subject"
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                          <select
                            id="countries"
                            className=" border border-gray-100  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-100  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option selected>Select Subject</option>
                            {AllSubject?.map(
                              (vl: any) =>
                                vl.title.length > 0 && <option value="US">{vl?.title}</option>
                            )}
                          </select>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col space-y-5 ">
              <div className="flex-col">
                <div className="flex gap-6">
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
                              placeholder="Tittle"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {/* <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Start Time</div>
                    <div className="mt-3 ">
                      <Controller
                        control={control}
                        name="startTime"
                        render={({ field: { onChange, value, ref } }) => (
                          <div className="">
                            <input
                              type="text"
                              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Start Time"
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="flex-col space-y-5 ">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Duration</div>
                    <div className="mt-3">
                      <Controller
                        control={control}
                        name="duration"
                        render={({ field: { onChange, value, ref } }) => (
                          <div className="">
                            <input
                              type="text"
                              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                              placeholder="Duration"
                            />
                          </div>
                        )}
                      />
                    </div>
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
                    <div className="text-base text-dark-100 mb-3">Subject</div>
                    <div className="mt-3 ">
                      <Controller
                        {...register(`subject`, {
                          required: {
                            value: true,
                            message: "This is Error.",
                          },
                        })}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => {
                          onChange = (event) => {
                            setValue("subject", event);
                            if (userid && userid.user && userid.user.id) {
                              Authentication.getTeacher(userid?.user.id)
                                .then((result) => {
                                  let teacherObject =
                                    result.manager_details[event.label.toLowerCase() + "_tutors"];
                                  setTeacher(teacherObject);
                                })
                                .catch((err) => {
                                  console.log(err, "Error he");
                                });
                            }
                          };

                          return (
                            <CreatableSelect isClearable options={subjects} onChange={onChange} />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col space-y-5 mt-3">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Teacher</div>
                    <div className="mt-3 ">
                      <Controller
                        {...register(`host`, {
                          required: {
                            value: true,
                            message: "This is Error.",
                          },
                        })}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => {
                          onChange = (event) => {
                            setValue("host", event);
                          };

                          return (
                            <CreatableSelect
                              isClearable
                              options={teacherObj}
                              onChange={onChange}
                              placeholder="Select Tutor"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col space-y-5 mt-3">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="w-full space-y-2 mx-3">
                    <div className="text-base text-dark-100 mb-3">Title</div>
                    <div className="mt-3">
                      <input
                        type="text"
                        className={`w-full rounded border  px-3 py-1.5 outline-none ${
                          errors?.title ? "bg-red-100 border-red-500" : "bg-white border-[#E2E2E2]"
                        }`}
                        placeholder="Minimum score"
                        {...register(`title`, {
                          required: "This field is required",
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col space-y-5 mt-3">
              <div className="flex-col">
                <div className="flex gap-6">
                  <div className="flex-col gap-2 w-[200px] mx-3" style={{ width: "47%" }}>
                    <div className="text-base text-dark-100 mb-3">Start Date</div>
                    <div className="mt-3 ">
                      <Controller
                        {...register(`startDate`, {
                          required: {
                            value: true,
                            message: "This is Error.",
                          },
                        })}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value, ref } }) => {
                          onChange = (event) => {
                            setValue(`startDate`, event);
                          };
                          return (
                            <DateTimePicker
                              name="startDate"
                              value={getValues(`startDate`)}
                              setValue={setValue}
                              timePicker={true}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-col gap-2 w-[200px] mx-3" style={{ width: "47%" }}>
                    <div className="text-base text-dark-100 mb-3">Duration</div>
                    <div className="mt-3 ">
                      <input
                        type="number"
                        className={`w-full rounded border  px-3 py-1.5 outline-none ${
                          errors?.title ? "bg-red-100 border-red-500" : "bg-white border-[#E2E2E2]"
                        }`}
                        placeholder="Duration"
                        {...register(`duration`, {
                          required: "This field is required",
                        })}
                      />
                    </div>
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

export default ConfigPopup;
