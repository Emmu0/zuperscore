import React from "react";
// axios configurations
import {
  setAxiosHeader,
} from "@configuration/axios-configuration";
// server cookie validations
import { getServerAuthenticationCookie, getAuthenticationToken } from "@lib/cookie";
// redirect
import redirect from "@lib/redirect";

/*
  **role**
  student/user
  admin
  tutor
  typist
  manager
  **default is student**
*/

type IProps = {
  authRequired?: boolean;
  setPasswordRequired?: boolean;
  role?: string[] | string;
  is_onboard?: boolean;
};

export const userRoleRedirection = (ctx: any, role: any, nextPath?: any) => {
  if (nextPath) redirect(ctx, nextPath);
  else {
    if (role === "admin") redirect(ctx, `/admin/dashboard`);
    else if (role === "tutor") redirect(ctx, `/admin/dashboard`);
    else if (role === "typist") redirect(ctx, `/admin/dashboard`);
    else if (role === "manager") redirect(ctx, `/admin/dashboard`);
    else redirect(ctx, `/user/dashboard`);
  }
};

const authWrapper = (
  WrappedComponent: any,
  { authRequired = false, setPasswordRequired = false, role = "admin", is_onboard = false }: IProps
) => {
  const Wrapper = (props: any) => {
    React.useEffect(() => {
      if (props?.tokenDetails && props?.tokenDetails?.access_token) {
        setAxiosHeader(props.tokenDetails.access_token);
      }
    }, [props]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: any) => {
    const { asPath } = ctx;

    let tokenDetails: any;

    let userRole = role && Array.isArray(role) ? role : [role];

    if (ctx && ctx.req) {
      tokenDetails = await getServerAuthenticationCookie(ctx);
    } else {
      tokenDetails = await getAuthenticationToken();
      tokenDetails = tokenDetails ? JSON.parse(tokenDetails) : null;
    }

    if (authRequired) {
      if (tokenDetails && tokenDetails?.user) {
        if (tokenDetails && tokenDetails?.user && tokenDetails?.user?.is_active) {
          // based on the role, redirect to the appropriate page
          let authUserRole = tokenDetails?.user?.role;

          if (userRole && userRole.length > 0 && userRole.includes(authUserRole)) {
            // mobile verification
            if (setPasswordRequired) {
              if (!tokenDetails?.user?.set_password_by_user) userRoleRedirection(ctx, authUserRole);
              else {
                const componentProps =
                  WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
                return { ...componentProps, tokenDetails };
              }
            } else {
              if (!tokenDetails?.user?.set_password_by_user) {
                if (authUserRole === "user") {
                  // user onboard process
                  // let is_user_onboard =
                  //   tokenDetails?.user?.onboard_data &&
                  //   (tokenDetails?.user?.onboard_data?.is_onboard === true ||
                  //     tokenDetails?.user?.onboard_data?.is_onboard_skipped === true)
                  //     ? true
                  //     : false;
                  // if (is_onboard && is_user_onboard) redirect(ctx, "/user/dashboard");
                  // else if (!is_onboard && !is_user_onboard) redirect(ctx, "/onboard");
                  // else {
                  // }

                  const componentProps =
                    WrappedComponent.getInitialProps &&
                    (await WrappedComponent.getInitialProps(ctx));
                  return { ...componentProps, tokenDetails };
                } else {
                  const componentProps =
                    WrappedComponent.getInitialProps &&
                    (await WrappedComponent.getInitialProps(ctx));
                  return { ...componentProps, tokenDetails };
                }
              } else {
                redirect(ctx, "/set-password");
              }
            }
          } else {
            userRoleRedirection(ctx, authUserRole);
          }
        } else {
          // redirect to deactivation request page
          redirect(ctx, "/request-site-access");
        }
      } else {
        redirect(ctx, `/signin${asPath ? `?next=${asPath}` : ``}`);
      }
    } else {
      if (tokenDetails && tokenDetails?.user) {
        if (tokenDetails?.user?.is_active) {
          // based on the role, redirect to the appropriate page
          let authUserRole = tokenDetails?.user?.role;
          userRoleRedirection(ctx, authUserRole);
        } else {
          // redirect to deactivation request page
          redirect(ctx, `/signin${asPath ? `?next=${asPath}` : ""}`);
        }
      } else {
        const componentProps: any =
          WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
        return { ...componentProps, tokenDetails };
      }
    }

    return {};
  };

  return Wrapper;
};

export default authWrapper;
