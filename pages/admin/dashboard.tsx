import React, { useState } from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import AdminHeader from "@components/admin/AdminHeader";
import Button from "@components/buttons";
import DownloadDesktopApp from "@components/DownloadDesktopApp";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const seoMetaInformation = {
  title: "Admin Dashboard",
};

const AdminDashboard: NextPage = () => {
  const [userDetails, setUserDetails] = React.useState<any>();
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);
  const [timeOfDay, setTimeOfDay] = React.useState("");

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("Good afternoon");
    } else {
      setTimeOfDay("Good evening");
    }
  }, []);
  const [showDownload, setShowDownload] = React.useState<any>(false);
  const [open, setopen] = useState(false)
  const profileHandler =(vl: any)=>{
    setopen(vl)
  }
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        {/* <AdminHeader title="Dashboard" /> */}
        <div className="text-xl font-medium pb-4">
          {timeOfDay}, {userDetails?.user?.first_name} {userDetails?.user?.last_name}!
        </div>{" "}
       
        <div className="flex justify-end p-3 px-4">
          <Button size="sm" onClick={() => setShowDownload(!showDownload)}>
            {"Download Desktop App"}
          </Button>
        </div>
        {showDownload && <DownloadDesktopApp />}
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminDashboard, {
  authRequired: true,
  role: ["admin", "tutor", "typist", "manager"],
});
