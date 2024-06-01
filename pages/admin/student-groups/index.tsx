//next imports
import { NextPage } from "next";
import Link from "next/link";
//react
import React from "react";
//swr
import useSWR from "swr";
//components
import AdminHeader from "@components/admin/AdminHeader";
import GroupCard from "@components/admin/test-allocation/GroupCard";
import Button from "@components/buttons";
//api routes
import { STUDENT_GROUPS } from "@constants/api-routes";
//layouts
import AdminLayout from "@layouts/AdminLayout";
//api services
import { APIFetcher } from "@lib/services";

const AssessmentSet: NextPage = () => {
  const { data: studentGroupList, error: studentGroupListError } = useSWR(
    STUDENT_GROUPS,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <AdminHeader
          title="Student Groups"
          description="An investment in knowledge pays the best interest."
        />
        <div>
          <Link href="/admin/student-groups/create-group">
            <a>
              <Button size="sm" className="my-4 mr-4 w-[150px] rounded-none">
                Add Group
              </Button>
            </a>
          </Link>
        </div>
      </div>
      {studentGroupList && !studentGroupListError ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5">
          <GroupCard studentGroupList={studentGroupList} mutateUrl={STUDENT_GROUPS} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          Loading...
        </div>
      )}
    </AdminLayout>
  );
};

export default AssessmentSet;
