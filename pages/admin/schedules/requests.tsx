import React from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// components
import AdminHeader from "@components/admin/AdminHeader";
import RequestCard from "@components/admin/schedules/RequestCard";
// layout
import AdminLayout from "@layouts/AdminLayout";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Requests",
};

const AdminRequests: NextPage = () => {
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader title="Requests" />
        <div>
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminRequests, { authRequired: true });
