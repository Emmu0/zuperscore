import React from "react";
// next imports
import { useRouter } from "next/router";
// redirect
import redirect from "lib/redirect";
// with auth hoc
import authWrapper from "lib/hoc/authWrapper";

const ResetPasswordView = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/forgot-password");
  }, [router]);

  return <></>;
};

ResetPasswordView.getInitialProps = async (ctx: any) => {
  redirect(ctx, "/forgot-password");
  return {};
};

export default authWrapper(ResetPasswordView, { authRequired: false });
