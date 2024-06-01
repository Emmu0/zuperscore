import React from "react";
// next imports
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
// seo
import Container from "@components/Container";
// swr
import useSWR from "swr";
// components
import Button from "@components/buttons";
import AdminHeader from "@components/admin/AdminHeader";
import SectionCardView from "@components/admin/assessments/sections/View";
import SectionCreateEdit from "@components/admin/assessments/sections/CreateEdit";
import SectionDelete from "@components/admin/assessments/sections/Delete";
import GenerateBulkQuestionFromSubject from "@components/admin/assessments/sections/GenerateBulkQuestionFromSubject";
import DynamicSection from "@components/admin/assessments/sections/DynamicSection";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// layout
import AdminLayout from "@layouts/AdminLayout";
// api services
import { APIFetcher } from "@lib/services";
// api routes
import {
  ASSESSMENT_WITH_ID_ENDPOINT,
  ASSESSMENT_WITH_SECTIONS_ENDPOINT,
  SUBJECT_ENDPOINT,
} from "@constants/api-routes";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Dashboard",
};

const AdminSections: NextPage = () => {
  const router = useRouter();
  const assessment_id = parseInt(router.query.assessment_id as string);

  const { data: assessment, error: assessmentError } = useSWR(
    ASSESSMENT_WITH_ID_ENDPOINT(assessment_id),
    APIFetcher,
    { refreshInterval: 0 }
  );
  const { data: sections, error: sectionsError } = useSWR(
    assessment && assessment?.id
      ? [ASSESSMENT_WITH_SECTIONS_ENDPOINT(assessment?.id), assessment?.id]
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  const [currentSection, setCurrentSection] = React.useState<null | any>(null);
  const handleCurrentSection = (kind: any, section: any = null) => {
    let payload = kind === "clear" ? null : { kind: kind, section: section };
    setCurrentSection((prevData: any) => {
      return { ...payload };
    });
  };

  const { data: subjects, error: subjectsError } = useSWR(
    currentSection &&
      (currentSection.kind === "dynamic-section" || currentSection.kind === "bulk-question-create")
      ? SUBJECT_ENDPOINT
      : null,
    APIFetcher,
    { refreshInterval: 0 }
  );

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <Link href={`/assessments?kind=${assessment?.kind}`}>
          <a className="text-sm flex items-center space-x-3 mb-4">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to Assessments</p>
          </a>
        </Link>

        <AdminHeader
          title={`${assessment?.name || "..."}`}
          description={`${assessment?.description || "..."}`}
          button={
            <Button size="sm" onClick={() => handleCurrentSection("create-edit")}>
              Create Section
            </Button>
          }
        />

        <div>
          {sections?.sections && !sectionsError ? (
            <>
              {sections?.sections && sections?.sections?.length > 0 ? (
                <div className="mt-4 flex flex-col gap-3">
                  {sections?.sections?.map((section: any) => (
                    <>
                      <SectionCardView
                        key={section.id}
                        assessment_id={assessment_id}
                        section={section}
                        handleCurrentSection={handleCurrentSection}
                      />
                    </>
                  ))}
                </div>
              ) : (
                <div className="text-dark-100 text-center py-5">No sections are created.</div>
              )}
            </>
          ) : (
            <div className="text-dark-100 text-center py-5">Loading...</div>
          )}
        </div>

        {currentSection && currentSection.kind === "create-edit" && (
          <SectionCreateEdit
            assessment_id={assessment_id}
            sections={sections}
            section={currentSection}
            handleCurrentSection={handleCurrentSection}
            mutateUrl={[ASSESSMENT_WITH_SECTIONS_ENDPOINT(assessment?.id), assessment?.id]}
          />
        )}

        {currentSection && currentSection.kind === "delete" && (
          <SectionDelete
            section={currentSection}
            handleCurrentSection={handleCurrentSection}
            mutateUrl={[ASSESSMENT_WITH_SECTIONS_ENDPOINT(assessment?.id), assessment?.id]}
          />
        )}

        {currentSection && currentSection.kind === "dynamic-section" && (
          <DynamicSection
            assessment_id={assessment_id}
            subjectsList={subjects}
            section={currentSection}
            handleCurrentSection={handleCurrentSection}
            mutateUrl={[ASSESSMENT_WITH_SECTIONS_ENDPOINT(assessment?.id), assessment?.id]}
          />
        )}

        {currentSection && currentSection.kind === "bulk-question-create" && (
          <GenerateBulkQuestionFromSubject
            assessment_id={assessment_id}
            subjectsList={subjects}
            sectionId={currentSection?.section?.id}
            handleCurrentSection={handleCurrentSection}
          />
        )}
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminSections, {
  authRequired: true,
  role: ["admin", "tutor", "manager"],
});
