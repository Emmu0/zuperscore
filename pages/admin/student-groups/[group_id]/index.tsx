import React from "react";
//next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
//swr
import useSWR from "swr";
//components
import AdminHeader from "@components/admin/AdminHeader";
import CreateGroupForm from "@components/admin/test-allocation/CreateGroupForm";
import Button from "@components/buttons";
//api routes
import { STUDENT_GROUPS_WITH_ID } from "@constants/api-routes";
//context
import { globalContext } from "@contexts/GlobalContextProvider";
//layouts
import AdminLayout from "@layouts/AdminLayout";
//hero icons
import { ArrowLeftIcon } from "@heroicons/react/solid";
//api services
import { APIFetcher } from "@lib/services";
import { Group } from "@lib/services/test.allocation.service";
//react hook form
import { useForm } from "react-hook-form";

type Inputs = {
  group_name: string;
  target_date: any;
  status: boolean;
  students: any;
  data: any;
  group_id: any;
};

let defaultValues: Inputs = {
  group_id: null,
  group_name: "",
  target_date: "",
  status: false,
  students: [],
  data: null,
};

const EditGroup: NextPage = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  const router = useRouter();
  const { group_id } = router.query;
  const [selectedStudents, setSelectedStudents] = React.useState<any>();
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const { data: groupData, error: groupDataError } = useSWR(
    group_id ? STUDENT_GROUPS_WITH_ID(group_id) : null,
    group_id ? APIFetcher : null,
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
      name: data?.group_name,
      target_date: data?.target_date,
      status: data?.status,
    };

    payload = {
      ...payload,
      id: data?.group_id,
      target_date: data?.target_date,
      users: data?.students,
    };
    return Group.update(payload)
      .then((res) => {
        handleAlert("success", "Success", "Student Group Updated Successfully");
        router.push(`/admin/student-groups/`);
      })
      .catch((error) => {
        console.log(error);
        handleAlert("error", "Error", "Error in Updating Student Group");
      });
  };

  React.useEffect(() => {
    if (groupData && reset) {
      reset({
        ...defaultValues,
        group_id: groupData?.id || null,
        group_name: groupData?.name,
        target_date: groupData?.target_date,
        status: groupData?.status,
        data: groupData?.data ?? null,
        students: groupData?.users.map((user: any) => user.id) ?? [],
      });
    }
  }, [groupData, reset]);
  return (
    <AdminLayout>
      <Link href={`/admin/student-groups`}>
        <a className="text-sm flex items-center space-x-3 pb-5">
          <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
          <p className="text-dark-100">Back to Student Groups</p>
        </a>
      </Link>
      <AdminHeader
        title={`${group_id ? "Update" : "Create"} Group`}
        description="An investment in knowledge pays the best interest."
      />
      {!group_id || (groupData && group_id) ? (
        <div className="flex-col bg-white space-y-5 mt-6 p-2">
          <CreateGroupForm
            register={register}
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            groupData={groupData}
            getValues={getValues}
          />
          <div className="flex justify-end border-t-2 border-r-2 border-l-2 border-b-0 shadow-md rounded-none w-full h-15">
            <Button size="sm" className="my-4 mr-4" onClick={handleSubmit(onSubmit)}>
              {isSubmitting ? "Processing..." : `${group_id ? "Update" : "Create"} Group`}
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

export default EditGroup;
