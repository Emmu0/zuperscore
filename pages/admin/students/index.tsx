import React from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Students Details",
};

const AdminStudentsDetail: NextPage = () => {
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <div>Students Details</div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminStudentsDetail, { authRequired: true });
