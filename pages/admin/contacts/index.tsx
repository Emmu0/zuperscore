import React from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// ui icons imports
import { SearchIcon } from "@ui/icons";
// components
import Button from "@components/buttons";
// import Pagination from "@components/admin/Pagination";
import ContactsTable from "@components/admin/contacts/ContactsTable";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Contacts",
};

const AdminContacts: NextPage = () => {
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <div className=" my-4">
          <div className="flex justify-between items-center">
            <div className="flex jsutify-start items-center">
              <div className="text-3xl font-semibold mr-8">
                {/* {isEnrolled ? "Enrolled Users" : "Users"} */}
                Contacts
              </div>
              <div className=" relative flex justify-start items-center">
                <SearchIcon className=" mx-2 absolute my-2 z-100" width="18" height="18" />
                <input
                  type="search"
                  placeholder="Search"
                  className="px-4 py-2 pl-8 outline-none border border-border-light"
                />
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div>
                <Button
                  variant="secondary"
                  className="border border-border-light lg:px-4 px-2 py-2 bg-light-100 text-dark-0"
                >
                  + Add Filter
                </Button>
              </div>
              <div className="ml-8">
                <Button className="lg:px-4 px-2 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium">
                  + New Student{" "}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full">
            <ContactsTable />
          </div>
          {/* <Pagination /> */}
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminContacts, { authRequired: true });
