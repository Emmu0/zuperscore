import React from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// components
import Container from "@components/Container";
import SubjectCard from "@components/admin/subjects/SubjectCard";
// constants
import { SUBJECT_ENDPOINT } from "@constants/api-routes";
// layouts
import AdminLayout from "@layouts/AdminLayout";
// lib
import authWrapper from "@lib/hoc/authWrapper";
import { APIFetcher } from "@lib/services";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// swr
import useSWR from "swr";

const seoMetaInformation = {
  title: "Admin Dashboard",
};

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const { subject_node_id } = router.query;
  const { data: subjects, error: subjectsError } = useSWR(SUBJECT_ENDPOINT, APIFetcher, {
    refreshInterval: 0,
  });

  const [currentSubject, setCurrentSubject] = React.useState<any>(null);
  React.useEffect(() => {
    if (subject_node_id && subjects && subjects.length > 0) {
      if (!currentSubject || (currentSubject && currentSubject?.id != subject_node_id))
        setCurrentSubject(() => subjects.find((_subject: any) => _subject.id == subject_node_id));
    }
  }, [subject_node_id, currentSubject, subjects]);

  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div>
          <Link href={`/subjects`}>
            <a className="text-sm flex items-center space-x-3 mb-4 p-5">
              <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
              <p className="text-dark-100">Back to subjects</p>
            </a>
          </Link>
          {/* subjects view */}
          {!subjects && currentSubject && !subjectsError ? (
            <div className="text-center text-gray-500 mt-6">Loading...</div>
          ) : (
            <div className="container px-5 mx-auto">
              <SubjectCard
                subject={currentSubject}
                subjectsList={subjects}
                parentSubject={subject_node_id}
              />
            </div>
          )}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminDashboard, {
  authRequired: true,
  role: ["admin", "typist"],
});
