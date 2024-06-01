//react
import React from "react";
//next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
//components
import AdminHeader from "@components/admin/AdminHeader";
import Button from "@components/buttons";
import CreateGroupForm from "@components/admin/test-allocation/CreateGroupForm";
//api routes
import { STUDENT_GROUPS_WITH_ID } from "@constants/api-routes";
//layouts
import AdminLayout from "@layouts/AdminLayout";
//api services
import { APIFetcher } from "@lib/services";
import { Group, GroupUser } from "@lib/services/test.allocation.service";
//react hook form
import { useForm } from "react-hook-form";
//swr
import useSWR from "swr";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
//hero icons
import { ArrowLeftIcon } from "@heroicons/react/solid";

type Inputs = {
  group_name: string;
  target_date: any;
  status: boolean;
  students: any;
  data: any;
  id: any;
};

let defaultValues: Inputs = {
  id: null,
  group_name: "",
  target_date: "",
  status: false,
  students: [],
  data: null,
};
const CreateGroup: NextPage = () => {
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
  const { id } = router.query as { id: any };
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const { data: groupData, error: groupDataError } = useSWR(
    id ? STUDENT_GROUPS_WITH_ID(id) : null,
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
      name: data?.group_name,
      target_date: data?.target_date,
      status: data?.status,
    };
    return Group.create(payload)
      .then((res) => {
        const groupPayload = {
          group: res?.id,
          users: data?.students,
        };
        GroupUser.create(groupPayload).then(() => {
          handleAlert("success", "Success", "Student Group Created Successfully");
          router.push(`/admin/student-groups/`);
        });
      })
      .catch((error) => {
        console.log(error);
        handleAlert("error", "Error", "Error in Creating Student Group");
      });
  };

  React.useEffect(() => {
    if (groupData && reset) {
      reset({
        ...defaultValues,
        id: groupData?.id || null,
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
        title="Create Group"
        description="An investment in knowledge pays the best interest."
      />
      {!id || (groupData && id) ? (
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
              {isSubmitting ? "Processing..." : "Create Group"}
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

export default CreateGroup;
