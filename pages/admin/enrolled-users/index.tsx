import React from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import EnrollUser from "@components/admin/EnrollUser";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Enroll User",
};

const AdminAssessmentEnrollUser: NextPage = () => {
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <EnrollUser />
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminAssessmentEnrollUser, { authRequired: true });
