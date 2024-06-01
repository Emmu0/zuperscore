import GroupUserSearch from "@components/admin/test-allocation/GroupUserSearch";
import Button from "@components/buttons";
import DateTimePicker from "@components/ui/DateTimePicker";
import { bindZero } from "@constants/common";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const RegistrationForm: React.FC<any> = () => {
  const [nextPage, setNextPage] = useState(false);

  type Inputs = {
    prep_managers: any[];
    ops_managers: any[];
    sso_managers: any[];
    id: any;
    students: any[];
    english_tutors: [];
    math_tutors: [];
  };
  let defaultValues: Inputs = {
    id: null,
    prep_managers: [],
    ops_managers: [],
    sso_managers: [],
    students: [],
    english_tutors: [],
    math_tutors: [],
  };
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });
  const renderScheduleMinTime = (date: any) => {
    let dateTimeLocalValue: any = new Date();
    dateTimeLocalValue = `${dateTimeLocalValue.getFullYear()}-${bindZero(
      dateTimeLocalValue.getMonth() + 1
    )}-${dateTimeLocalValue.getDate()}T${bindZero(dateTimeLocalValue.getHours())}:${bindZero(
      dateTimeLocalValue.getMinutes()
    )}`;
    return dateTimeLocalValue;
  };

  
  const onSubmit = () => {
    console.log("hello");
  };

  const nextHadler = (vl: any) => {
    setNextPage(vl);
  };

  return (
    <div className="bg-white w-full border border-gray-200 p-5 space-y-5">
      <p className="font-semibold ml-3">Please fill your Information.</p>
      {/* <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0 relative w-[55px] h-[55px] rounded-full overflow-hidden">
          <Image
            src={"/images/default.jpg"}
            className="w-full h-full object-cover rounded-full"
            layout="fill"
            alt="user"
          />
        </div>
        <div className="w-full">
          <div className="font-medium text-lg capitalize">prince parmar</div>
          <div className="text-gray-600 text-sm">prince@yopmail.com</div>
        </div>
      </div> */}
      {!nextPage ? (
        <>
          <div className="flex-col space-y-5 mt-5 pt-8">
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">School Name</div>
                  <div className="mt-3">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter School Name"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Year of Passing</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Year of Passing"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Source Type</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Source Type"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Source Name</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Source Name"
                          />
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
                  <div className="text-base text-dark-100 mb-3">Type</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Type"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Auto Generate</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Auto Generate"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Add Attempt</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="2"
                          />
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
                  <div className="text-base text-dark-100 mb-3">Special Request</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <textarea
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Special Request"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Prep Navigation details</div>
                  <div className="mt-3">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <textarea
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Prep Navigation details"
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
          <div className="flex-col space-y-5 pt-8">
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">First Name*</div>
                  <div className="mt-3">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="First Name"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Last Name*</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Last Name"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">DOB{"(DD/MM/YYYY)"}</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <DateTimePicker
                          name="schedule_at"
                          setValue={setValue}
                          timePicker={true}
                          minDate={renderScheduleMinTime(new Date())}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Target Test Date</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <DateTimePicker
                          name="schedule_at"
                          setValue={setValue}
                          timePicker={true}
                          minDate={renderScheduleMinTime(new Date())}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-col space-y-5 pb-8">
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Email</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Dummy@yopmail.com"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Whatsapp Number</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="+91******00"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Time Zone</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          disableDayPicker
                          format="HH:mm:ss"
                          placeholder="--:-- --"
                          plugins={[<TimePicker key={1} />]}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="px-8 py-6" />
          <div className="flex-col space-y-4">
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Country</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <select
                          id="countries"
                          className=" border border-gray-100  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-100  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">City</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <select
                          id="countries"
                          className=" border border-gray-100  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-100  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected className="text-gray">
                            Select a City
                          </option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">State</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className=" mt-3">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="State"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Time Zone</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <DatePicker
                          disableDayPicker
                          format="HH:mm:ss"
                          placeholder="--:-- --"
                          plugins={[<TimePicker key={2} />]}
                        />
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
                  <div className="text-base text-dark-100 mb-3">Special Request</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <textarea
                            className="w-[45%] border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Special Request"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-3 pt-8">
            <p className="font-semibold">different Able.</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-blue-900 peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex-col space-y-5">
            <div className="flex-col">
              <div className="flex gap-6">
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Parent Name</div>
                  <div className="mt-3">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Name"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full space-y-2 mx-3">
                  <div className="text-base text-dark-100 mb-3">Email</div>
                  <div className="mt-3 ">
                    <Controller
                      control={control}
                      name="sso_managers"
                      render={({ field: { onChange, value, ref } }) => (
                        <div className="">
                          <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Email"
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
      )}

      <div className="flex justify-center">
        <Button
          size="sm"
          className="mx-3 rounded-lg"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Save
        </Button>
        <Button size="sm" className="rounded-lg" onClick={() => nextHadler(!nextPage)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default RegistrationForm;
