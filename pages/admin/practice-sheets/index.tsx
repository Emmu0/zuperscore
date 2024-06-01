//next imports
import { NextPage } from "next";
import Link from "next/link";
//react
import React from "react";
//swr
import useSWR from "swr";
//components
import AdminHeader from "@components/admin/AdminHeader";
import SetCard from "@components/admin/test-allocation/SetCard";
import Button from "@components/buttons";
//api routes
import { PRACTICE_SETS } from "@constants/api-routes";
//layouts
import AdminLayout from "@layouts/AdminLayout";
//api services
import { APIFetcher } from "@lib/services";

const AssessmentSet: NextPage = () => {
  const { data: assessmentSetList, error: assessmentSetListError } = useSWR(
    PRACTICE_SETS,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <AdminHeader
          title="Assessment Sets"
          description="An investment in knowledge pays the best interest."
        />
        <Link href="/admin/practice-sheets/create-set">
          <a>
            <Button size="sm" className="my-4 mr-4 w-[150px] rounded-none">
              Add Set
            </Button>
          </a>
        </Link>
      </div>
      {assessmentSetList && !assessmentSetListError ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5">
          <SetCard assessmentSetList={assessmentSetList} mutateUrl={PRACTICE_SETS} />
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
