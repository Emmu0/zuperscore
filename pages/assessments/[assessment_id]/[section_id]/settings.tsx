import React, { useState } from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// seo
import Container from "@components/Container";
// swr
import useSWR from "swr";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import AdminHeader from "@components/admin/AdminHeader";

// api routes
import { ASSESSMENT_WITH_ID_ENDPOINT, SECTION_WITH_ID_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Assessment Settings",
};

const AdminAssessmentSettings: NextPage = () => {
  const [tab, setTab] = useState("Settings");
  const router = useRouter();

  const section_id = parseInt(router.query.section_id as string);
  const assessment_id = parseInt(router.query.assessment_id as string);
  const { data: assessment, error: assessmentError } = useSWR(
    ASSESSMENT_WITH_ID_ENDPOINT(assessment_id),
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  const { data: section, error: sectionError } = useSWR(
    SECTION_WITH_ID_ENDPOINT(section_id),
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        {/* <AdminHeader title="Admin Assessment Settings" /> */}
        <AdminHeader
          title={assessment?.name}
          description={assessment?.description?.assessment}
          button={<div className=" "></div>}
        />

        <div className="flex justify-start items-center pt-2">
          <div className={"bg-[#FE903433] py-1 px-4 rounded-[40px] mr-1 text-[#434343]"}>
            Medium
          </div>
          <div className={"bg-[#7059FF1A] py-1 px-4 rounded-[40px] mr-1 text-[#434343]"}>
            Mathematics
          </div>
        </div>
        <div>
          <div className={`flex justify-start items-center  border-b border-border-light mt-4`}>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/[section_id]",
                query: {
                  assessment_id: assessment_id || 1,
                  section_id: section?.id || 1,
                },
              }}
            >
              <a>
                <div
                  className={`mr-8 text-violet-100 cursor-pointer ${
                    tab === "Questions" || tab == "Empty"
                      ? "border-b-4 border-violet-100 pb-3"
                      : "pb-4"
                  }`}
                >
                  Questions
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/[section_id]/submissions",
                query: { assessment_id: assessment_id, section_id: section?.id || 1 },
              }}
            >
              <a>
                <div
                  className={`text-violet-100 cursor-pointer mr-8 ${
                    tab === "Submissions" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                  }`}
                >
                  Submissions
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/[section_id]/results",
                query: { assessment_id: assessment_id, section_id: section?.id || 1 },
              }}
            >
              <a>
                <div
                  className={`text-violet-100 cursor-pointer mr-8 ${
                    tab === "Results" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                  }`}
                >
                  Results
                </div>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/assessments/[assessment_id]/[section_id]/settings",
                query: { assessment_id: assessment_id, section_id: section?.id || 1 },
              }}
            >
              <a>
                <div
                  className={`text-violet-100 cursor-pointer mr-8 ${
                    tab === "Settings" ? "border-b-4 border-violet-100 pb-3" : "pb-4"
                  }`}
                >
                  Settings
                </div>
              </a>
            </Link>
          </div>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminAssessmentSettings, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
