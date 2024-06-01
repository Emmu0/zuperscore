import React from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// seo
import Container from "@components/Container";
// layouts
import AdminLayout from "@layouts/AdminLayout";
// icons
import { ArrowLeftIcon } from "@ui/icons";
// components
import ProfileAllotedForm from "@components/profile/ProfileAllottedForm";
// api routes
import { USER_WITH_ID_ENDPOINT, USER_WITHOUT_PAGINATION_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";

const ManagerAllocation: NextPage = () => {
  const seoMetaInformation = {
    title: "Manager Allocation | Users",
  };

  const router = useRouter();
  const { user_id, assessment } = router.query as { user_id: string; assessment: string };

  const { data: userDetail, error: userDetailError } = useSWR(
    user_id ? [USER_WITH_ID_ENDPOINT(user_id), `user-${user_id}`] : null,
    APIFetcher,
    { refreshInterval: 0 }
  );
  const { data: users, error: usersError } = useSWR(
    [USER_WITHOUT_PAGINATION_ENDPOINT, `manager-allocation-users`],
    APIFetcher
  );

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div className="h-full relative flex flex-col">
          <div className="flex-shrink-0 p-5">
            <Link href={`/users`}>
              <a className="text-sm flex items-center space-x-3">
                <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
                <p className="text-dark-100">Back to Users</p>
              </a>
            </Link>
          </div>

          {userDetail && !userDetailError && users && !usersError ? (
            <div className="px-5">
              <ProfileAllotedForm user={userDetail} mutateUrl={user_id ? [USER_WITH_ID_ENDPOINT(user_id), `user-${user_id}`] : null} />
            </div>
          ) : (
            <div className="text-sm text-dark-100 text-center">loading...</div>
          )}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default ManagerAllocation;
