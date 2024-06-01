import React from "react";
// react hook form
import { Controller, useForm } from "react-hook-form";
// uuid
import { v4 as uuidV4 } from "uuid";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import Button from "@components/buttons";
import SearchFilter from "@components/filters/SelectSearchFilter";
import DateTimePicker from "@components/ui/DateTimePicker";

type Inputs = {
    name: string | null;
    duration: string | null;
    date: string | null;
};

let defaultValues: Inputs = {
    name: "",
    duration: "",
    date: ""
};
const JoeClassAdd = ({ progressBarData, append, handleSubmitHandler, onSubmitHandlerParent, minDate, maxDate }: any) => {
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


    const onSubmitHandler = (data: Inputs) => {
        if (data.name && data.duration && data.date) {
            append({ ...data, id: uuidV4() });
            handleSubmitHandler(onSubmitHandlerParent)();
            reset();
            setValue("date", "");
        } else {
            alert("Please fill all the details");
        }
    };

    return (
        <>
            <div className="flex px-4 mt-2 gap-4" >
                <div className="w-full">
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name={`name`}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <div className="w-full">
                                <div className="text-sm text-dark-100 mb-1">Type of progress</div>
                                <div>
                                    <SearchFilter
                                        placeHolder="Select Type of class"
                                        search={false}
                                        options={progressBarData}
                                        selectedOptions={value ? [value] : null}
                                        handleOption={(selectedValue: any) => {
                                            onChange(selectedValue[0] || null);
                                        }}
                                        multiple={false}
                                        position="left"
                                    />
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="w-full" >
                    <ReactHookInput
                        label="Time (in Mins)"
                        type="number"
                        name="duration"
                        register={register}
                        min={0}
                    />
                </div>
                <div className="w-full">
                    <label className="text-sm text-dark-100 mb-1">Date</label>
                    <DateTimePicker
                        name="date"
                        setValue={setValue}
                        timePicker={false}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
                <div className="flex-shrink-0 mt-auto mb-1">
                    <Button variant="outline-primary" size="xs" onClick={handleSubmit(onSubmitHandler)}>
                        Add Class
                    </Button>
                </div>
            </div>
        </>
    );
};
export default JoeClassAdd;
