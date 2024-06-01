import React, { useState } from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
// seo
import Container from "@components/Container";
// swr
import useSWR from "swr";
// layout
import AdminLayout from "@layouts/AdminLayout";
import StudentDetailLayout from "@layouts/StudentDetailLayout";
//components
import AssessmentItem from "@components/admin/AssessmentItem";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// api routes
import { ASSESSMENT_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Student Details Upcoming Test",
};

const StudentUpcomingTest: NextPage = () => {
  const [tab, setTab] = useState("Upcoming Tests");
  const { data: assessments, error: assessmentsError } = useSWR(ASSESSMENT_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <Link href={`/users`}>
          <a className="text-sm flex items-center space-x-3 mb-4">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to students</p>
          </a>
        </Link>
        <StudentDetailLayout tab={tab} setTab={setTab}>
          <div className="no-scrollbar">
            <div className="mt-4 text-2xl font-semibold flex justify-start items-center ">
              Upcoming Tests
            </div>
            <div className="mt-4 border">
              {assessments && !assessmentsError ? (
                <>
                  {assessments && assessments.length > 0 ? (
                    <>
                      {assessments.map((assessment: any, index: any) => (
                        <AssessmentItem
                          key={assessment.id}
                          studentDetail={true}
                          marks={"189/300"}
                          upcoming={true}
                          assessment={assessment}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="text-center text-2xl font-semibold">
                      No assessments are created
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-2xl font-semibold">Loading assessments...</div>
              )}
            </div>
          </div>
        </StudentDetailLayout>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(StudentUpcomingTest, { authRequired: true });
