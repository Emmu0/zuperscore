//next imports
import { NextPage } from "next";
//react imports
import React from "react";
import { useForm } from "react-hook-form";
//components
import AdminHeader from "@components/admin/AdminHeader";
import StudentGroupForm from "@components/admin/StudentGroupForm";
import TestTypeForm from "@components/admin/TestTypeForm";
import Button from "@components/buttons";
//layouts
import AdminLayout from "@layouts/AdminLayout";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
// api services
import { TestAllocation } from "@lib/services/test.allocation.service";

type Inputs = {
  kind: null;
  users: null;
  practice_set: any[];
  groups: null;
  assessment_id: any[];
  schedule_at: null | "";
};

let defaultValues: Inputs = {
  kind: null,
  users: null,
  practice_set: [],
  groups: null,
  assessment_id: [],
  schedule_at: null,
};

const AllocateTest: NextPage = () => {
  const tabs = ["Test Type", "Students"];
  const {
    register,
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  const [selectedTab, setSelectedTab] = React.useState("Test Type");
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const [groupPayload, setGroupPayload] = React.useState<any>([]);

  const [practiceSetAssessments, setPracticeSetAssessments] = React.useState<any>({});
  const [practiceSetPayload, setPracticeSetPayload] = React.useState<any>([]);

  const [errorMessage, setErrorMessage] = React.useState({
    kind: true,
    assessment_id: true,
    practice_set: true,
  });
  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const onSubmit = async (data: any) => {
    let payload: any = {
      kind: data.kind ?? "",
      // assessments: data.kind ==="PRACTICE_SHEET" ? [] : data.assessment_id,
      practice_sets: data.kind === "PRACTICE_SHEET" ? practiceSetPayload : [],
      scheduled_at: data.schedule_at !== null ? new Date(data.schedule_at) : null,
      groups: groupPayload,
    };
    if (data.kind !== "PRACTICE_SHEET") payload["assessments"] = data.assessment_id;
    return TestAllocation.create(payload)
      .then((res) => {
        reset();
        payload = {};
        setGroupPayload([]);
        setPracticeSetPayload([]);
        handleAlert("success", "Allocated Successfully", "Tests Were Allocated Successfully");
        setSelectedTab("Test Type");
      })
      .catch((error) => {
        handleAlert("error", "Error", "Test Allocation Failed, Please try Again");
        console.log(error);
      });
  };

  const handleNext = () => {
    if (watch("kind") === "PRACTICE_SHEET") {
      if (!watch("practice_set") || watch("practice_set").length === 0) {
        handleAlert("error", "Error", "Please fill all the details");
        return;
      }
    } else {
      if (!watch("assessment_id") || watch("assessment_id").length === 0) {
        handleAlert("error", "Error", "Please fill all the details");
        return;
      }
    }
    setSelectedTab("Students");
  };

  return (
    <AdminLayout>
      <AdminHeader
        title="Create New Test Allocation"
        description="An investment in knowledge pays the best interest."
      />
      <div className="flex border-b w-full justify-center gap-4 bg-white pt-3 text-base">
        {tabs.map((item: any, index: number) => (
          <div
            key={index}
            className={`${
              selectedTab == item ? "border-b-2 pb-2 border-b-violet-100 text-violet-100" : "pb-2"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      {selectedTab === "Test Type" ? (
        <>
          <TestTypeForm
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
            practiceSetAssessments={practiceSetAssessments}
            setPracticeSetAssessments={setPracticeSetAssessments}
            practiceSetPayload={practiceSetPayload}
            setPracticeSetPayload={setPracticeSetPayload}
            errorMessage={errorMessage}
          />
          <div className="flex justify-end rounded-none w-full h-15">
            <Button size="sm" className="my-4 mr-4 w-[130px]" onClick={handleNext}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <StudentGroupForm
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            groupUsers={groupPayload}
            setGroupUsers={(grp_payload: any) => setGroupPayload(grp_payload)}
            errors={errors}
          />
          <div className="flex w-full">
            <Button
              size="sm"
              className="my-4 mr-4 w-[130px]"
              onClick={() => setSelectedTab("Test Type")}
            >
              Previous
            </Button>
            <Button
              size="sm"
              className="my-4 ml-auto w-[130px]"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Allocating..." : "Allocate Test"}
            </Button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AllocateTest;
