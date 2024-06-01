import React, { useEffect, useState } from "react";
// headless-ui imports
import { Dialog } from "@headlessui/react";
//components
import Button from "@components/buttons";
// ui icons imports
import { testTypes } from "@components/data";
import UserSelectDropDown from "./UserSelectDropDown";
import { Controller, useForm } from "react-hook-form";
import TestSelectDropDown from "./TestSelectDropDown";
import ReactHookInput from "@components/forms/ReactHookInput";

type Inputs = {
  students: any[];
  test: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
};

const EnrollUserDialog = ({ isModal, setIsModal }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      students: [],
      test: testTypes[0],
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
    },
  });

  const registerOptions = {
    students: { required: "Select atleast 1 student" },
    test: { required: "Select test " },
    start_date: { required: "Choose Start Date" },
    end_date: {
      required: "Choose End Date",
    },
    start_time: { required: "Choose Start Time" },
    end_time: {
      required: "Choose End Time",
      validate: () => {
        const start_date_time: any = new Date(`${watch("start_date")}:${watch("start_time")}`);
        const end_date_time: any = new Date(`${watch("end_date")}:${watch("end_time")}`);
        if (end_date_time - start_date_time <= 0) {
          return "Please Choose Expiry Date and Time after Start Date and Time";
        }
      },
    },
  };
  useEffect(() => {
    reset({
      students: [],
      test: testTypes[0],
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
    });
  }, [isModal]);
  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState(testTypes[0]);
  const handleAssignTest = (data: any) => {};
  return (
    <Dialog as="div" className="shadow-lg" open={isModal} onClose={() => setIsModal(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-[623px] h-full  transform overflow-hidden  bg-white p-8  shadow-xl transition-all">
            <Dialog.Title as="div" className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
              Assign Test
            </Dialog.Title>
            <form onSubmit={handleSubmit(handleAssignTest)}>
              <div className="mt-4 relative">
                <div className="text-dark-0">Select Students</div>
                <Controller
                  control={control}
                  name="students"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <UserSelectDropDown
                      onChange={(e: any) => {
                        onChange(e);
                        setSelectedStudents(e);
                      }}
                      value={selectedStudents}
                    />
                  )}
                  rules={registerOptions.students}
                />
              </div>
              <div className="text-red-500"> {errors.students && errors.students.message}</div>
              <div className="mt-4 relative">
                <div className="text-dark-0">Select Test Types</div>
                <Controller
                  control={control}
                  name="test"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TestSelectDropDown
                      onChange={(e: any) => {
                        onChange(e);
                        setSelectedTest(e);
                      }}
                      value={selectedTest}
                    />
                  )}
                  rules={registerOptions.test}
                />
              </div>
              <div className="pt-2 w-full flex justify-between items-start mt-4">
                <div className="w-1/2">
                  {/* <div className="text-dark-0">Start Date</div> */}
                  {/* <input
                    type="date"
                    className="outline-none border p-2 w-full flex justify-between items-center flex-row-reverse text-dark-0"
                  /> */}
                  <ReactHookInput
                    label="Start Date"
                    type="date"
                    name="start_date"
                    register={register}
                    validations={registerOptions.start_date}
                    error={errors.start_date}
                  />
                </div>
                <div className="w-1/2">
                  {/* <div className="text-dark-0">Start Time</div>
                  <input
                    type="time"
                    className="outline-none border p-2 w-full flex justify-between items-center flex-row-reverse text-dark-0"
                  /> */}
                  <ReactHookInput
                    label="Start Time"
                    type="time"
                    name="start_time"
                    register={register}
                    validations={registerOptions.start_time}
                    error={errors.start_time}
                  />
                </div>
              </div>
              <div className="pt-2 w-full flex justify-between items-start mt-4">
                <div className="w-1/2">
                  {/* <div className="text-dark-0">Expiry Date</div>
                  <input
                    type="date"
                    className="outline-none border p-2 w-full flex  items-center flex-row-reverse text-dark-0"
                    placeholder=""
                  /> */}
                  <ReactHookInput
                    label="Expiry Date"
                    type="date"
                    name="end_date"
                    register={register}
                    validations={registerOptions.end_date}
                    error={errors.end_date}
                  />
                </div>
                <div className="w-1/2">
                  {/* <div className="text-dark-0">Expiry Time</div>
                  <input
                    type="time"
                    className="outline-none border p-2 w-full flex justify-center items-center flex-row-reverse text-dark-0"
                    placeholder=""
                  /> */}
                  <ReactHookInput
                    label="Expiry Time"
                    type="time"
                    name="end_time"
                    register={register}
                    validations={registerOptions.end_time}
                    error={errors.end_time}
                  />
                </div>
              </div>

              <div className="flex justify-end items-center pt-8">
                <div>
                  <Button
                    className={"border border-border-light px-4 py-2 bg-light-100 text-dark-0 mr-8"}
                    variant="secondary"
                    onClick={() => setIsModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={
                      "px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium"
                    }
                  >
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default EnrollUserDialog;
