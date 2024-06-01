import React, { useState } from "react";
// next imports
import { NextPage } from "next";
import Link from "next/link";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Button from "@components/buttons";
import AddCourseDialog from "@components/admin/students/AddCourseDialog";
import StudentCourseTable from "@components/admin/students/StudentCourseTable";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Student Details Course At Glance",
};

const StudentCourse: NextPage = () => {
  const [tab, setTab] = useState("Mathematics");
  const [isModal, setIsModal] = useState(false);
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <Link href={`/users`}>
          <a className="text-sm flex items-center space-x-3 mb-4">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to students</p>
          </a>
        </Link>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center">
              <div>
                <div className="text-2xl font-semibold">
                  <span className="text-violet-100">Bhavesh`s</span> Course at a Glance
                </div>
              </div>

              <div className="flex justify-start items-center pt-2"></div>
            </div>

            <div className=" ">
              <Button
                className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium mr-4"
                onClick={() => setIsModal(true)}
              >
                + Add Subject{" "}
              </Button>
            </div>
          </div>
          <div className="flex justify-start items-center border-b border-border-light mt-4">
            <div
              className={`mr-8 text-violet-100 cursor-pointer ${
                tab === "Mathematics" ? "border-b-4 border-violet-100 pb-3 font-semibold" : "pb-4"
              }`}
              onClick={() => setTab("Mathematics")}
            >
              Mathematics
            </div>
            <AddCourseDialog isModal={isModal} setIsModal={setIsModal} />
            <div
              className={`text-violet-100 cursor-pointer ${
                tab === "English" ? "border-b-4 border-violet-100 pb-3 font-semibold" : "pb-4"
              }`}
            >
              English
            </div>
          </div>
          <div className="no-scrollbar">
            <div className="mt-4 h-[43px]  text-dark-0 font-semibold">
              <div className="flex justify-start items-center">
                <div className="flex justify-start items-center px-4 py-2 h-[43px]  w-3/6">
                  Topics
                </div>
                <div className="px-4 py-2 h-[43px]  w-1/6">Completed</div>
                <div className="px-4 py-2 h-[43px]  w-1/6">Dfficulty</div>
                <div className="px-4 py-2 h-[43px]  w-1/6">Remarks</div>
                <div className="px-4 py-2 h-[43px]  w-1/6">Extra</div>

                <div className="lg:w-[57px] h-[43px] px-4 py-2  flex justify-center items-center"></div>
              </div>
            </div>

            <StudentCourseTable />
            <StudentCourseTable />
            <StudentCourseTable />
          </div>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(StudentCourse, { authRequired: true });
