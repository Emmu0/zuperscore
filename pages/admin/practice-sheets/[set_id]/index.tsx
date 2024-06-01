import React from "react";
//next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
//swr
import useSWR from "swr";
//components
import AdminHeader from "@components/admin/AdminHeader";
import CreateSetForm from "@components/admin/test-allocation/CreateSetForm";
import Button from "@components/buttons";
//api routes
import { ASSESSMENT_ENDPOINT, PRACTICE_SETS_WITH_ID } from "@constants/api-routes";
//context
import { globalContext } from "@contexts/GlobalContextProvider";
//hero icons
import { ArrowLeftIcon } from "@heroicons/react/solid";
//layouts
import AdminLayout from "@layouts/AdminLayout";
//api services
import { APIFetcher } from "@lib/services";
import { AssessmentSet } from "@lib/services/test.allocation.service";
//react hook form
import { useForm } from "react-hook-form";

type Inputs = {
  set_id: any;
  set_name: string;
  status: boolean;
  assessment: any;
  data: any;
};

let defaultValues: Inputs = {
  set_id: null,
  set_name: "",
  status: false,
  assessment: [],
  data: null,
};

const EditSet: NextPage = () => {
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
  const { set_id } = router.query;

  const [globalState, globalDispatch] = React.useContext(globalContext);
  const { data: setData, error: setDataError } = useSWR(
    set_id ? PRACTICE_SETS_WITH_ID(set_id) : null,
    set_id ? APIFetcher : null,
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

    payload = { ...payload, id: data?.set_id, assessments: data?.assessment };
    return AssessmentSet.update(payload)
      .then((res) => {
        handleAlert("success", "Success", "Practice Set Updated Successfully");
        router.push(`/admin/practice-sheets/`);
      })
      .catch((error) => {
        handleAlert("error", "Error", "Error in Updating Practice Set");
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (setData && reset) {
      reset({
        ...defaultValues,
        set_id: setData?.id || null,
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
        title="Update Practice Sheet Set"
        description="An investment in knowledge pays the best interest."
      />
      {!set_id || (setData && set_id) ? (
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
              {isSubmitting ? "Processing..." : "Update Set"}
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

export default EditSet;
