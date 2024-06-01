import React from "react";
// next imports
import Image from "next/image";
// react hook form
import { Controller, useForm } from "react-hook-form";
// icons
import { XIcon } from "@heroicons/react/solid";
// components
import Button from "@components/buttons";
import { User } from "@lib/services/users.service";
import GroupUserSearch from "@components/admin/test-allocation/GroupUserSearch";
import { APIFetcher } from "@lib/services";
import { USER_ENDPOINT, USER_WITH_ID_ENDPOINT } from "@constants/api-routes";
import useSWR, { mutate } from "swr";
import { globalContext } from "@contexts/GlobalContextProvider";

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

const ProfileAllotedForm: React.FC<any> = ({ user, mutateUrl }) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });
  let selectedEnglishTutorStudent: any = watch("english_tutors");
  let selectedMathTutorStudent: any = watch("math_tutors");
  let prepManager = watch("prep_managers");
  let opsmanager = watch("ops_managers");
  let ssoManager = watch("sso_managers");

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  const { data: userDetail, error: userDetailError } = useSWR(
    user && user?.id ? [USER_WITH_ID_ENDPOINT(user?.id), `user-${user?.id}`] : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const [ssoManagerStudents, setSelectedSSoManagerStudents] = React.useState<any>(userDetail?.manager_details?.sso_managers || []);
  const [prepManagerStudents, setSelectedPrepManagerStudents] = React.useState<any>(userDetail?.manager_details?.prep_managers || []);
  const [opsManagerStudents, setSelectedOpsManagerStudents] = React.useState<any>(userDetail?.manager_details?.ops_managers || []);
  const [englishTutorStudents, setSelectedEnglishTutorStudents] = React.useState<any>(userDetail?.manager_details.english_tutors || []);
  const [mathTutorStudents, setSelectedMathTutorStudents] = React.useState<any>(userDetail?.manager_details.math_tutors || []);

  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const { data: users, error: usersError } = useSWR(
    debouncedQuery.length >= 3
      ? `${USER_ENDPOINT}?search=${debouncedQuery}&role=manager`
      : `${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}&role=manager`,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const { data: tutorsList, error: tutorsListError } = useSWR(
    debouncedQuery.length >= 3
      ? `${USER_ENDPOINT}?search=${debouncedQuery}&role=tutor`
      : `${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}&role=tutor`,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const usersData = users?.results?.map((user: any) => ({
    key: user.id,
    title: `${user.first_name} ${user.last_name}`,
  }));

  const tutors = tutorsList?.results?.map((user: any) => ({
    key: user.id,
    title: `${user.first_name} ${user.last_name}`,
  }));

  const handleRemoveOpsManagerStudents = (studentId: number) => {
    setValue(
      "ops_managers",
      opsmanager.filter((id: any) => id !== studentId)
    );
    const users = [...opsManagerStudents].filter((user: any) => user.id !== studentId);
    setSelectedOpsManagerStudents(users);
  };

  const handleRemovePrepManagerStudent = (studentId: number) => {
    setValue(
      "prep_managers",
      prepManager.filter((id: any) => id !== studentId)
    );
    const users = [...prepManagerStudents].filter((user: any) => user.id !== studentId);
    setSelectedPrepManagerStudents(users);
  };

  const handleRemoveEnglishTutorsStudent = (studentId: number) => {
    setValue(
      "english_tutors",
      selectedEnglishTutorStudent.filter((id: any) => id !== studentId)
    );
    const users = [...englishTutorStudents].filter((user: any) => user.id !== studentId);
    setSelectedEnglishTutorStudents(users);
  };
  const handleRemoveMathTutorsStudent = (studentId: number) => {
    setValue(
      "math_tutors",
      selectedMathTutorStudent.filter((id: any) => id !== studentId)
    );
    const users = [...mathTutorStudents].filter((user: any) => user.id !== studentId);
    setSelectedMathTutorStudents(users);
  };

  const handleRemoveSsoManagerStudent = (studentId: number) => {
    setValue(
      "sso_managers",
      ssoManager.filter((id: any) => id !== studentId)
    );
    const users = [...ssoManagerStudents].filter((user: any) => user.id !== studentId);
    setSelectedSSoManagerStudents(users);
  };

  const checkId = (idToCheck: any) => {
    const allIds = [prepManager, opsmanager, ssoManager, selectedEnglishTutorStudent, selectedMathTutorStudent].flatMap((array) => array).map((id) => id);
    let checker = false;
    if (allIds && allIds.length > 0) checker = allIds.includes(idToCheck);

    return !checker;
  };

  React.useEffect(() => {
    if (userDetail && reset) {
      reset({
        ...defaultValues,
        id: userDetail?.id || "",
        prep_managers: userDetail?.prep_managers.map((id: any) => id),
        sso_managers: userDetail?.sso_managers.map((id: any) => id),
        ops_managers: userDetail?.ops_managers.map((id: any) => id),
        english_tutors: userDetail?.english_tutors?.map((id: any) => id),
        math_tutors: userDetail?.math_tutors?.map((id: any) => id),
      });
    }
  }, [userDetail, reset]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const onSubmit = async (data: any) => {
    let payload: any = {
      id: data?.id,
      prep_managers: data?.prep_managers,
      sso_managers: data?.sso_managers,
      ops_managers: data?.ops_managers,
      english_tutors: data?.english_tutors,
      math_tutors: data?.math_tutors,
    };

    return User.update(payload)
      .then((response) => {
        mutate(mutateUrl);
        handleAlert("success", "Success.", "User updated successfully.");
      })
      .catch((error) => {
        handleAlert("error", "Something went wrong.", "Error updating user. Please try again.");
      });
  };

  return (
    <div className="bg-white w-full border border-gray-200 p-5 space-y-5">
      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0 relative w-[55px] h-[55px] rounded-full overflow-hidden">
          <Image
            src={user?.profile_img ? user.profile_img : "/images/default.jpg"}
            className="w-full h-full object-cover rounded-full"
            layout="fill"
            alt="user"
          />
        </div>
        <div className="w-full">
          <div className="font-medium text-lg capitalize">
            {user?.first_name} {user?.last_name}
          </div>
          <div className="text-gray-600 text-sm">{user?.email}</div>
        </div>
      </div>

      <div className="flex-col space-y-5">
        <div className="flex-col">
          <div className="text-lg font-medium">Manager Allocation</div>
          <div className="flex gap-4">
            <div className="w-full space-y-2">
              <div className="pt-4 space-y-3">
                <div className="text-base text-dark-100 mb-3">Select SSO Manager</div>
                <div className="mt-3 flex justify-start items-center">
                  <Controller
                    control={control}
                    name="sso_managers"
                    render={({ field: { onChange, value, ref } }) => (
                      <div className="w-[326px]">
                        <GroupUserSearch
                          placeHolder="Select SSO Manager"
                          options={usersData}
                          selectedOptions={value || null}
                          handleOption={(_value: any, data: any, title: string) => {
                            APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                              .then((res) => {
                                if (checkId(res.id)) {
                                  onChange(_value, title);
                                  const users = [...ssoManagerStudents];
                                  users.push({
                                    id: res.id,
                                    name: `${res.first_name} ${res.last_name}`,
                                  });
                                  setSelectedSSoManagerStudents(users);
                                } else {
                                  handleAlert("error", "Error", "Manager is already assigned.");
                                }
                              })
                              .catch((e) => console.log("error", e));
                          }}
                          multiple={true}
                          query={query}
                          setQuery={setQuery}
                          error={errors?.students?.message ? errors?.students?.message : null}
                        />
                        {/* {errors?.students?.message && ( */}
                        {/* <div className="text-sm text-red-500 mt-2">{errors?.students?.message}</div>
                      )} */}
                      </div>
                    )}
                  // rules={registerValidationOptions.students}
                  />
                </div>
                {ssoManagerStudents && ssoManagerStudents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {ssoManagerStudents?.map((user: any) => (
                      <div
                        key={user.id}
                        className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                      >
                        <div className="pl-2 pr-1">{user.name}</div>
                        <div
                          className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                          onClick={() => handleRemoveSsoManagerStudent(user.id)}
                        >
                          <XIcon className="h-4 w-4" aria-hidden="true" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="pt-4 space-y-3">
                <div className="text-base text-dark-100 mb-3">Select Ops Manager</div>

                <div className="mt-3 flex justify-start items-center">
                  <Controller
                    control={control}
                    name="ops_managers"
                    render={({ field: { onChange, value, ref } }) => (
                      <div className="w-[326px]">
                        <GroupUserSearch
                          placeHolder="Select Ops Manager"
                          options={usersData}
                          selectedOptions={value || null}
                          handleOption={(_value: any, data: any, title: string) => {
                            APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                              .then((res) => {
                                if (checkId(res.id)) {
                                  onChange(_value, title);
                                  const users = [...opsManagerStudents];
                                  users.push({
                                    id: res.id,
                                    name: `${res.first_name} ${res.last_name}`,
                                  });
                                  setSelectedOpsManagerStudents(users);
                                } else {
                                  handleAlert("error", "Error", "Manager is already assigned.");
                                }
                              })
                              .catch((e) => console.log("error", e));
                          }}
                          multiple={true}
                          query={query}
                          setQuery={setQuery}
                          error={errors?.students?.message ? errors?.students?.message : null}
                        />
                        {/* {errors?.students?.message && ( */}
                        {/* <div className="text-sm text-red-500 mt-2">{errors?.students?.message}</div>
                      )} */}
                      </div>
                    )}
                  // rules={registerValidationOptions.students}
                  />
                </div>
                {opsManagerStudents && opsManagerStudents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {opsManagerStudents?.map((user: any) => (
                      <div
                        key={user.id}
                        className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                      >
                        <div className="pl-2 pr-1">{user.name}</div>
                        <div
                          className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                          onClick={() => handleRemoveOpsManagerStudents(user.id)}
                        >
                          <XIcon className="h-4 w-4" aria-hidden="true" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="pt-4 space-y-3">
                <div className="text-base text-dark-100 mb-3">Select Prep Manager</div>

                <div className="mt-3 flex justify-start items-center">
                  <Controller
                    control={control}
                    name="prep_managers"
                    render={({ field: { onChange, value, ref } }) => (
                      <div className="w-[326px]">
                        <GroupUserSearch
                          placeHolder="Select Prep Manager"
                          options={usersData}
                          selectedOptions={value || null}
                          handleOption={(_value: any, data: any, title: string) => {
                            APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                              .then((res) => {
                                if (checkId(res.id)) {
                                  onChange(_value, title);
                                  const users = [...prepManagerStudents];
                                  users.push({
                                    id: res.id,
                                    name: `${res.first_name} ${res.last_name}`,
                                  });
                                  setSelectedPrepManagerStudents(users);
                                } else {
                                  handleAlert("error", "Error", "Manager is already assigned.");
                                }
                              })
                              .catch((e) => console.log("error", e));
                          }}
                          multiple={true}
                          query={query}
                          setQuery={setQuery}
                          error={errors?.students?.message ? errors?.students?.message : null}
                        />
                        {/* {errors?.students?.message && ( */}
                        {/* <div className="text-sm text-red-500 mt-2">{errors?.students?.message}</div>
                      )} */}
                      </div>
                    )}
                  // rules={registerValidationOptions.students}
                  />
                </div>
                {prepManagerStudents && prepManagerStudents.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {prepManagerStudents?.map((user: any) => (
                      <div
                        key={user.id}
                        className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                      >
                        <div className="pl-2 pr-1">{user.name}</div>
                        <div
                          className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                          onClick={() => handleRemovePrepManagerStudent(user.id)}
                        >
                          <XIcon className="h-4 w-4" aria-hidden="true" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col pt-3">
          <div className="text-lg font-medium">Tutor Allocation</div>
          <div className="flex gap-4">
            <div className="w-full space-y-2">
              <div className="w-full space-y-2">
                <div className="pt-4 space-y-3">
                  <div className="mt-3 flex justify-start gap-8 items-center">
                    <div>
                      <div className="text-base text-dark-100 mb-3">Select English Tutor</div>
                      <Controller
                        control={control}
                        name="english_tutors"
                        render={({ field: { onChange, value, ref } }) => (
                          <div className="w-[326px]">
                            <GroupUserSearch
                              placeHolder="Select English Tutor"
                              options={tutors}
                              selectedOptions={value || null}
                              handleOption={(_value: any, data: any, title: string) => {
                                onChange(_value, title);
                                APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                                  .then((res) => {
                                    if (checkId(res.id)) {
                                    const users = [...englishTutorStudents];
                                    users.push({
                                      id: res.id,
                                      name: `${res.first_name} ${res.last_name}`,
                                    });
                                    setSelectedEnglishTutorStudents(users);
                                  } else {
                                    handleAlert("error", "Error", "Tutor is already assigned.");
                                  }
                                  })
                                  .catch((e) => console.log("error", e));
                              }}
                              multiple={true}
                              query={query}
                              setQuery={setQuery}
                              error={errors?.students?.message ? errors?.students?.message : null}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {englishTutorStudents && englishTutorStudents.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {englishTutorStudents?.map((user: any) => (
                        <div
                          key={user.id}
                          className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                        >
                          <div className="pl-2 pr-1">{user.name}</div>
                          <div
                            className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                            onClick={() => handleRemoveEnglishTutorsStudent(user.id)}
                          >
                            <XIcon className="h-4 w-4" aria-hidden="true" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="w-full space-y-2">
                <div className="pt-4 space-y-3">
                  <div className="mt-3 flex justify-start gap-8 items-center">
                    <div>
                      <div className="text-base text-dark-100 mb-3">Select Math Tutor</div>
                      <Controller
                        control={control}
                        name="math_tutors"
                        render={({ field: { onChange, value, ref } }) => (
                          <div className="w-[326px]">
                            <GroupUserSearch
                              placeHolder="Select Math Tutor"
                              options={tutors}
                              selectedOptions={value || null}
                              handleOption={(_value: any, data: any, title: string) => {
                                onChange(_value, title);
                                APIFetcher(USER_WITH_ID_ENDPOINT(_value[_value.length - 1]))
                                  .then((res) => {
                                    if (checkId(res.id)) {
                                    const users = [...mathTutorStudents];
                                    users.push({
                                      id: res.id,
                                      name: `${res.first_name} ${res.last_name}`,
                                    });
                                    setSelectedMathTutorStudents(users);
                                  } else {
                                    handleAlert("error", "Error", "Manager is already assigned.");
                                  }
                                  })
                                  .catch((e) => console.log("error", e));
                              }}
                              multiple={true}
                              query={query}
                              setQuery={setQuery}
                              error={errors?.students?.message ? errors?.students?.message : null}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {mathTutorStudents && mathTutorStudents.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {mathTutorStudents?.map((user: any) => (
                        <div
                          key={user.id}
                          className="bg-[#FDEDF4] border-[#CC96AE] border-2 text-sm rounded-sm flex items-center bg-opacity-70"
                        >
                          <div className="pl-2 pr-1">{user.name}</div>
                          <div
                            className="w-[28px] h-[28px] flex justify-center items-center cursor-pointer hover:bg-violet-0"
                            onClick={() => handleRemoveMathTutorsStudent(user.id)}
                          >
                            <XIcon className="h-4 w-4" aria-hidden="true" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Button size="sm" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Allocating..." : "Allocate Now"}
        </Button>
      </div>
    </div>
  );
};
export default ProfileAllotedForm;
