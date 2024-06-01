import React, { useEffect, useState } from "react";
// next imports
import { NextPage } from "next";
// swr
import useSWR from "swr";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Pagination from "@components/utilities/Pagination";
import Button from "@components/ui/Button";
import AdminHeader from "@components/admin/AdminHeader";
import AdminUserView from "@components/admin/users/View";
import AdminUserCreate from "@components/admin/users/Create";
import AdminUserEdit from "@components/admin/users/Edit";
import AdminUserRole from "@components/admin/users/Role";
import AdminUserStatus from "@components/admin/users/Status";
import AdminUserPassword from "@components/admin/users/Password";
import AdminSearch from "@components/admin/users/Search";
import AdminUserAssessment from "@components/admin/users/AssessmentEnroll";
// api routes
import { USER_ENDPOINT, ASSESSMENT_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// cookie
import { getAuthenticationToken } from "@lib/cookie";
// react-hook-form
import { useForm } from "react-hook-form";

const seoMetaInformation = {
  title: "Admin Users",
};

type Inputs = {
  search: string;
};
let defaultValues: Inputs = {
  search: "",
};

const AdminUsers: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
    },
  });
  const [userDetails, setUserDetails] = React.useState<any>();
  const [tutorId, setTutorId] = useState()
  const [managerId, setManagerId] = useState()
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);
  const [query,setQuery] = useState("")

  const { data: users, error: usersError } = useSWR(
    `${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}${tutorId ? `&tutor_id=${tutorId}` : ""}${managerId ? `&manager_id=${managerId}` : ""}${query ? `&search=${query}` : ""}`,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const [currentUser, setCurrentUser] = React.useState<any | null>(null);
  const handleCurrentUser = (kind: any, value: any = null) => {
    if (kind === "clear") setCurrentUser(null);
    else
      setCurrentUser((prevData: any) => {
        return { kind: kind, user: value };
      });
  };

  const { data: assessments, error: assessmentsError } = useSWR(
    currentUser && currentUser.kind === "assessment-enroll" ? ASSESSMENT_ENDPOINT : null,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (userDetails && userDetails.user && userDetails.user.role === "tutor") {
      setTutorId(userDetails?.user?.id);
    }
    if (userDetails && userDetails.user && userDetails.user.role === "manager") {
      setManagerId(userDetails?.user?.id);
    }
  }, [userDetails])

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader
          title="Users"
          button={
            <Button type="button" size="xs" onClick={() => handleCurrentUser("create", null)}>
              Create a user
            </Button>
          }
        />

        <div>
          {users && !usersError ? (
            <>
              <div className="space-y-3">
                <div className="flex items-center gap-2 justify-between">
                  <div>
                    <Pagination
                      count={perPage}
                      totalPages={users?.total_pages}
                      currentPage={parseInt(cursor?.split(":")[1]) + 1}
                      onPageChange={setCursor}
                    />
                  </div>
                  <div>
                    <AdminSearch
                      register={register}
                      setValue={setValue}
                      handleSubmit={handleSubmit}
                      errors={errors}
                      setQuery={setQuery}
                      mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  {users && users.results && users.results.length > 0 ? (
                    <AdminUserView
                      users={users}
                      handleCurrentUser={handleCurrentUser}
                      cursor={cursor}
                      userDetails={userDetails}
                    />
                  ) : (
                    <div className="text-sm text-dark-100 text-center">No users are available.</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-sm text-dark-100 text-center">loading...</div>
          )}
        </div>

        {currentUser && currentUser.kind === "create" && (
          <AdminUserCreate
            user={currentUser}
            handleCurrentUser={handleCurrentUser}
            mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
          />
        )}

        {currentUser && currentUser.kind === "edit" && (
          <AdminUserEdit
            user={currentUser}
            handleCurrentUser={handleCurrentUser}
            mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
          />
        )}

        {currentUser && currentUser.kind === "role" && (
          <AdminUserRole
            user={currentUser}
            handleCurrentUser={handleCurrentUser}
            mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
          />
        )}

        {currentUser && currentUser.kind === "status" && (
          <AdminUserStatus
            user={currentUser}
            handleCurrentUser={handleCurrentUser}
            mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
          />
        )}

        {currentUser && currentUser.kind === "password" && (
          <AdminUserPassword
            user={currentUser}
            handleCurrentUser={handleCurrentUser}
            mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
          />
        )}

        {currentUser && currentUser.kind === "assessment-enroll" && (
          <AdminUserAssessment
            user={currentUser}
            handleCurrentUser={handleCurrentUser}
            mutateUrl={`${USER_ENDPOINT}?per_page=${perPage}&cursor=${cursor}`}
            assessments={assessments}
          />
        )}
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminUsers, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
