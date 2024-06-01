import ReactHookInput from "@components/forms/ReactHookInput";
import { ReactHookSelect } from "@components/forms/ReactHookSelect";
import ReactHookTextarea from "@components/forms/ReactHookTextarea";
import Editor from "@components/lexical/Editor";
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import MultiSelect from "@components/ui/Select/MultiSelect";
import { ALL_SUBJECT } from "@constants/api-routes";
import { Switch } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { APIFetcher, APIPostFetcher } from "@lib/services";
import { Authentication } from "@lib/services/authenticate.service";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
type Inputs = {
  id: string | null;
  name: string;
  description: string;
  instructions: any;
  kind: "MOCK" | "SECTIONAL" | "MICRO" | "PRACTICE_SHEET" | "DIAGNOSTIC" | null;
  is_extended: true | false;
  is_tutor_test: true | false;
  subject: number | null;
  host: number | null;
  startTime: any;
  title: string | null;
  duration: number | null;
  domain: number | null;
  topic: number | null;
  assessment_tags: [] | null;
};

let defaultValues: Inputs = {
  id: "",
  name: "",
  description: "",
  kind: null,
  instructions: null,
  is_extended: false,
  is_tutor_test: false,
  subject: null,
  domain: null,
  startTime: "",
  title: "",
  topic: null,
  duration: 1,
  host: null,
  assessment_tags: null,
};
const ConfigPopup = ({ popupHandler, zoomPopup }: any) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  const { data: AllSubject, error: AllsubjectError } = useSWR(ALL_SUBJECT, APIFetcher, {
    refreshInterval: 0,
  });
  console.log(AllSubject, "AllSubject");
  const onSubmit = (data: any) => {
    const DDDD = {
      host: 256,
      subject: 1,
      title: "my topic",
      start_time: "2023-09-18T10:33:36.652652+05:30",
      duration: "3",
    };
    console.log(DDDD, "step@@ 1");

    return Authentication.ZoomConfig(DDDD)
      .then((response) => {
        console.log(response, "step@@ 2");
      })
      .catch((error) => {
        console.log(error, "step@@ 3");
      });
  };
  return (
    <div>
      <Modal
        size={`xl`}
        title={`Zoom Configration`}
        modal={zoomPopup}
        setModal={() => {
          popupHandler(false);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-col space-y-5">
          <div className="flex-col">
            <div className="flex gap-6">
              <div className="w-full space-y-2 mx-3">
                <div className="text-base text-dark-100 mb-3">Host</div>
                <div className="mt-3 ">
                  <input
                    {...register(`host`, {
                      required: "This is an error. Host is required.",
                    })}
                    type="number"
                    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Host"
                  />
                </div>
              </div>
              <div className="w-full space-y-2 mx-3">
                <div className="text-base text-dark-100 mb-3">Subject</div>
                <div className="mt-3 ">
                  <Controller
                    control={control}
                    {...register(`subject`, {
                      required: "This is an error. Host is required.",
                    })}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <select
                        id="countries"
                        className=" border border-gray-100  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-100  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Select Subject</option>
                        {AllSubject?.map((vl: any) => (
                          <option value="US" key={vl.title}>
                            {vl.title}
                          </option>
                        ))}
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
                    {...register(`title`, {
                      required: {
                        value: true,
                        message: "This is Error.",
                      },
                    })}
                    render={({ field: { onChange, value, ref } }) => (
                      <div className="">
                        <input
                          type="text"
                          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                          placeholder="Title"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="w-full space-y-2 mx-3">
                <div className="text-base text-dark-100 mb-3">Start Time</div>
                <div className="mt-3 ">
                  <Controller
                    control={control}
                    {...register(`startTime`, {
                      required: {
                        value: true,
                        message: "This is Error.",
                      },
                    })}
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
              </div>
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
      </Modal>
    </div>
  );
};

export default ConfigPopup;
