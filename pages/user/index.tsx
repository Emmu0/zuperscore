import React from "react";
// next imports
import { useRouter } from "next/router";
// redirect
import redirect from "lib/redirect";
// with auth hoc
import authWrapper from "lib/hoc/authWrapper";

const User = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/user/dashboard");
  }, [router]);

  return <></>;
};

User.getInitialProps = async (ctx: any) => {
  redirect(ctx, "/user/dashboard");
  return {};
};

export default authWrapper(User, { authRequired: true, role: "user" });
