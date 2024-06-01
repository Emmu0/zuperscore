import React from "react";
// next imports
import { NextPage } from "next";

// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// ui icons imports
import VerticalDotIcon from "@ui/icons/verticalDotIcon";
// components
import Button from "@components/buttons";
import AdminHeader from "@components/admin/AdminHeader";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Question Tags",
};

const AdminQuestionTags: NextPage = () => {
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader
          title="Question Tags"
          description=""
          button={
            <div>
              <Button className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium">
                + New Tag
              </Button>
            </div>
          }
        />
        <div>
          <div className="mt-4">
            <div className="my-4 w-full">
              <table className="w-full border border-collapse">
                <thead className="border bg-[#F9F9F9] h-10  font-normal">
                  <tr className="border">
                    <th className="tg-0lax border text-left p-4 h-[60px] w-[257px]">Type</th>
                    <th className="tg-0lax border text-left p-4 h-[60px]">Type</th>

                    <th className="tg-0lax border text-left p-4 h-[60px] w-[57px]"></th>
                  </tr>
                </thead>
                <tbody className="bg-light-200">
                  <tr>
                    <td className="h-[60px] flex justify-start items-center border-b px-4">
                      <div className="font-semibold">Difficulty</div>
                    </td>
                    <td className="tg-0lax border p-4 ">
                      <div className="flex justify-start items-center">
                        Effortless, Easy, Meduim, Hard, Difficult
                      </div>
                    </td>

                    <td className="h-[60px] flex justify-center items-center border-t">
                      <VerticalDotIcon />
                    </td>
                  </tr>

                  <tr>
                    <td className="h-[60px] flex justify-start items-center border-b px-4">
                      <div className=" font-semibold">Subject</div>
                    </td>
                    <td className="tg-0lax border p-4 ">
                      <div className="flex justify-start items-center">
                        Physics,Chemistry,Biology,Mathematics
                      </div>
                    </td>

                    <td className="h-[60px] flex justify-center items-center border-t">
                      <VerticalDotIcon />
                    </td>
                  </tr>
                  <tr>
                    <td className="h-[60px] flex justify-start items-center border-b px-4">
                      <div className=" font-semibold">Sub-category</div>
                    </td>
                    <td className="tg-0lax border p-4 ">
                      <div className="flex justify-start items-center">Reading, Writing, Essay</div>
                    </td>

                    <td className="h-[60px] flex justify-center items-center border-t">
                      <VerticalDotIcon />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminQuestionTags, { authRequired: true });
