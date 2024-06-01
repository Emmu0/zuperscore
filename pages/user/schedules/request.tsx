import React from "react";
// next imports
import { NextPage } from "next";
// hoc
import authWrapper from "lib/hoc/authWrapper";

const ScheduleRequest: NextPage = () => {
  return <div></div>;
};

export default authWrapper(ScheduleRequest, { authRequired: true, role: "user" });
