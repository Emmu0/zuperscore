//next imports
import { NextPage } from "next";
import Link from "next/link";
//react imports
import React from "react";
//components
import AdminHeader from "@components/admin/AdminHeader";
import Button from "@components/buttons";
import CreateSetForm from "@components/admin/test-allocation/CreateSetForm";
//layouts
import AdminLayout from "@layouts/AdminLayout";
//react hook form
import { useForm } from "react-hook-form";
//api routes
import { ASSESSMENT_ENDPOINT, PRACTICE_SETS_WITH_ID } from "@constants/api-routes";
//swr
import useSWR from "swr";
//api services
import { APIFetcher } from "@lib/services";
import { AssessmentSet, PracticeSetAssessment } from "@lib/services/test.allocation.service";
import { useRouter } from "next/router";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
//hero icons
import { ArrowLeftIcon } from "@heroicons/react/solid";

type Inputs = {
  id: any;
  set_name: string;
  status: boolean;
  assessment: any;
  data: any;
};

let defaultValues: Inputs = {
  id: null,
  set_name: "",
  status: false,
  assessment: [],
  data: null,
};
const CreateSet: NextPage = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  // assessment type swr
  const { data: assessmentList, error: assessmentListError } = useSWR(
    [`${ASSESSMENT_ENDPOINT}?kind=PRACTICE_SHEET`, `ASSESSMENT_FILTER_PRACTICE_SHEET`],
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const router = useRouter();
  const { id } = router.query as { id: any };
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const { data: setData, error: setDataError } = useSWR(
    id ? PRACTICE_SETS_WITH_ID(id) : null,
    id ? APIFetcher : null,
    {
      refreshInterval: 0,
    }
  );

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const onSubmit = async (data: any) => {
    let payload: any = {
      name: data?.set_name,
      status: data?.status,
    };

    return AssessmentSet.create(payload)
      .then((res) => {
        const assessmentPayload = {
          practice_set: res?.id,
          assessments: data?.assessment,
        };
        PracticeSetAssessment.create(assessmentPayload).then(() => {
          handleAlert("success", "Success", "Practice Set Created Successfully");
          router.push(`/admin/practice-sheets/`);
        });
      })
      .catch((error) => {
        console.log(error);
        handleAlert("error", "Error", "Error in Creating Practice Set");
      });
  };

  React.useEffect(() => {
    if (setData && reset) {
      reset({
        ...defaultValues,
        id: setData?.id || null,
        set_name: setData?.name,
        status: setData?.status,
        data: setData?.data ?? null,
        assessment: setData?.assessments.map((assessment: any) => assessment.id) ?? [],
      });
    }
  }, [setData, reset]);

  return (
    <AdminLayout>
      <Link href={`/admin/practice-sheets`}>
        <a className="text-sm flex items-center space-x-3 pb-5">
          <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
          <p className="text-dark-100">Back to Assessment Sets</p>
        </a>
      </Link>
      <AdminHeader
        title="Create Practice Sheet Set"
        description="An investment in knowledge pays the best interest."
      />
      {!id || (setData && id) ? (
        <div className="flex-col bg-white space-y-5 mt-6 p-2">
          <CreateSetForm
            register={register}
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            assessmentList={assessmentList}
            setData={setData}
          />

          <div className="flex justify-end border-t-2 border-r-2 border-l-2 border-b-0 shadow-md rounded-none w-full h-15">
            <Button size="sm" className="my-4 mr-4" onClick={handleSubmit(onSubmit)}>
              {isSubmitting ? "Processing..." : "Create Set"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          Loading...
        </div>
      )}
    </AdminLayout>
  );
};

export default CreateSet;
