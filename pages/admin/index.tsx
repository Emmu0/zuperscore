import React from "react";
// next imports
import { useRouter } from "next/router";
// redirect
import redirect from "lib/redirect";
// with auth hoc
import authWrapper from "lib/hoc/authWrapper";

const Admin = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/admin/dashboard");
  }, [router]);

  return <></>;
};

Admin.getInitialProps = async (ctx: any) => {
  redirect(ctx, "/admin/dashboard");
  return {};
};

export default authWrapper(Admin, {
  authRequired: true,
  role: ["admin", "tutor", "typist", "manager"],
});
