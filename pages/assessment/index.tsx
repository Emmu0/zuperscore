import React from "react";
// next imports
import { useRouter } from "next/router";
// redirect
import redirect from "lib/redirect";
// with auth hoc
import authWrapper from "lib/hoc/authWrapper";

const Assessments = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/assessment/mock?type=upcoming");
  }, [router]);

  return <></>;
};

Assessments.getInitialProps = async (ctx: any) => {
  redirect(ctx, "/assessment/mock?type=upcoming");
  return {};
};

export default authWrapper(Assessments, { authRequired: true, role: ["manager", "tutor", "user"] });
