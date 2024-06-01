import React from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Button from "@components/buttons";
import SubjectCreateView from "@components/admin/subjects/create";
import TreeEditView from "@components/admin/subjects/treeStructure/edit";
import SubjectArchive from "@components/admin/subjects/SubjectArchive";
import Dropdown from "@components/utilities/Dropdown";
// ui icons
import { BinIcon, PlusIcon } from "@ui/icons";
import { ArchiveIcon, DotsVerticalIcon, TrashIcon, PencilIcon } from "@heroicons/react/outline";
// api routes
import { SUBJECT_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Dashboard",
};

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const { subject_id } = router.query;

  const [currentSubject, setCurrentSubject] = React.useState<any>(null);
  const [subjectState, setSubjectState] = React.useState<any>(false);

  const { data: subjects, error: subjectsError } = useSWR(
    `${SUBJECT_ENDPOINT}?state=${subjectState ? "ARCHIVED" : "ACTIVE"}`,
    APIFetcher,
    {
      refreshInterval: 0,
    }
  );

  const handleCurrentSubject = (type: any, sub: any) => {
    let subject;
    if (sub) subject = { id: sub?.id, ...sub };
    else subject = { id: sub?.id, title: sub?.title };
    setCurrentSubject({ type: type, data: subject });
  };
  const subjectOptions = (subject: any) => {
    return [
      {
        icon: <PencilIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: "Edit",
        on_click: () => {
          handleCurrentSubject("edit", subject);
        },
      },
      {
        icon: <ArchiveIcon height="14px" width="14px" fill="#8b8b8b" />,
        label: `${subject?.state === "ACTIVE" ? "Archive" : "Unarchive"}`,
        on_click: () => {
          handleCurrentSubject("archive", subject);
        },
      },
    ];
  };

  const handleSubjectClick = (subjectId: string) => {
    const clickedSubject = subjects.find((_subject: any) => _subject.id === subjectId);
    setCurrentSubject(clickedSubject);
  };

  const handleSubjectStateToggle = () => {
    setSubjectState((prevState: any) => !prevState);
  };
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        {subjects && !subjectsError ? (
          <div className="py-5">
            <div className="container mx-auto px-5 flex justify-between items-center">
              <div className="text-2xl font-medium pb-1">
                {subjectState ? "Archived Subjects" : "Subjects"}
              </div>

              <div className="flex gap-2">
                {!subjectState && (
                  <SubjectCreateView
                    mutateUrl={`${SUBJECT_ENDPOINT}?state=${subjectState ? "ARCHIVED" : "ACTIVE"}`}
                  >
                    <Button size="sm" className="flex items-center gap-2">
                      <PlusIcon width="14" height="14" fill="#F3E4B1" /> Create Subject
                    </Button>
                  </SubjectCreateView>
                )}
                <Button
                  size="sm"
                  variant={subjectState ? "danger" : "secondary"}
                  onClick={handleSubjectStateToggle}
                >
                  <BinIcon fill="#FFFFFF" />
                </Button>
              </div>
            </div>

            {subjects && subjects.length <= 0 ? (
              <div className="py-5 text-center text-gray-400">No subjects are available.</div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full p-5 justify-normal items-center">
                {subjects.map((subject: any, subjectIndex: number) => (
                  <div
                    key={subjectIndex}
                    className="flex rounded shadow bg-white px-2 items-center justify-between hover:bg-violet-0 hover:bg-opacity-30"
                  >
                    <Link href={`/subjects/${subject.id}`}>
                      <a onClick={() => handleSubjectClick(subject.id)}>
                        <div
                          className={`p-3 text-lg capitalize cursor-pointer hover:text-violet-100 ${
                            subject_id == subject?.id
                              ? `border-violet-100 text-violet-100 font-bold`
                              : `border-transparent font-medium`
                          }`}
                        >
                          {subject?.title}
                        </div>
                      </a>
                    </Link>
                    <Dropdown
                      options={subjectOptions(subject)}
                      button={<DotsVerticalIcon height="14px" width="14px" fill="#8B8B8B" />}
                    />
                  </div>
                ))}
              </div>
            )}
            {currentSubject && currentSubject?.type === "archive" && (
              <SubjectArchive
                data={currentSubject}
                handleData={handleCurrentSubject}
                subject={currentSubject}
                mutateUrl={`${SUBJECT_ENDPOINT}?state=${subjectState ? "ARCHIVED" : "ACTIVE"}`}
              />
            )}
            {currentSubject && currentSubject?.type === "edit" && (
              <TreeEditView
                data={currentSubject}
                handleData={handleCurrentSubject}
                subject={currentSubject}
                mutateUrl={`${SUBJECT_ENDPOINT}?state=${subjectState ? "ARCHIVED" : "ACTIVE"}`}
              />
            )}
          </div>
        ) : (
          <div className="mt-5 mb-5 text-center text-gray-400">Loading...</div>
        )}
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminDashboard, {
  authRequired: true,
  role: ["admin", "typist"],
});
