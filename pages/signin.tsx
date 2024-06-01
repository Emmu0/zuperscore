import React from "react";
// next imports
import Link from "next/link";
// react hook form
import { useForm } from "react-hook-form";
// seo
import Container from "@components/Container";
// components
import Button from "@components/buttons";
import ReactHookInput from "@components/forms/ReactHookInput";
import ReactHookPassword from "@components/forms/ReactHookPassword";
// cookie
import { setAuthenticationToken } from "@lib/cookie";
// api services
import { Authentication } from "@lib/services/authenticate.service";
// hoc
import authWrapper, { userRoleRedirection } from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
import { useRouter } from "next/router";

const seoMetaInformation = {
  title: "SignIn",
};

type Inputs = {
  email: string;
  password: string;
  medium: "email";
};

let defaultInputs: Inputs = { email: "", password: "", medium: "email" };

const inputValidations = {
  email: { required: "Email is required" },
  password: {
    required: "Password is required",
  },
};

const SignInView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const router = useRouter();
  const { next } = router.query;

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultInputs } });

  const handleSignInButton = async (data: any) => {
    return Authentication.emailLogin(data)
      .then((response) => {
        if (response) return redirectToAdmin(response);
      })
      .catch((error) => {
        handleAlert(
          "error",
          "Error Logging In",
          "There was an error while Logging In, please try again."
        );
        console.log(error);
      });
  };

  const redirectToAdmin = async (tokenDetails: any) => {
    setAuthenticationToken(tokenDetails);
      let authUserRole = tokenDetails?.user?.role;
      if (authUserRole) {
        userRoleRedirection(null, authUserRole, next);
        handleAlert("success", "Logged In successfully", "You have successfully Logged in");
      }
      return;
  };

  return (
    <Container meta={seoMetaInformation}>
      <>
        <div className="flex relative w-[100vw] h-[100vh] overflow-hidden">
          <div className="bg-signin w-full h-[100vh] hidden md:block">
            <div className="px-16 py-16 text-yellow-0 text-2xl font-semibold z-100">Zuperscore</div>
            <div className="pt-24 pr-12 pl-16 text-yellow-0 text-3xl text-left">
              Let us guide the aspirant in you
            </div>
            <div className="bg-light-200 w-[48px] h-[1px] mx-16 mt-10"></div>
            <div className="text-light-200 px-16 py-8 text-left">
              We at Zuperscore provide the best courses for you to prepare for your SAT and clear it
              as easily as possible. We understand that knowing is not enough but what we assure is
              the coaching led results.
            </div>
          </div>

          <div className="flex justify-center items-center w-full h-[100vh] overflow-y-auto">
            <div className="space-y-4 p-5">
              <div>
                <div className="text-4xl text-violet-100 font-semibold pb-1">Welcome back</div>
                <div className="text-dark-0">
                  We missed you ! Please enter your details and join us again
                </div>
              </div>

              <form onSubmit={handleSubmit(handleSignInButton)}>
                <div className="pb-4">
                  <ReactHookInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    register={register}
                    validations={inputValidations.email}
                    required={true}
                  />
                </div>
                <div className="pb-4">
                  <ReactHookPassword
                    label="Password"
                    name="password"
                    placeholder="Enter your Password"
                    register={register}
                    validations={inputValidations.password}
                    required={true}
                  />
                </div>

                <div className="pb-4 text-dark-200 text-sm flex justify-between items-center">
                  <Link href="/reset-password">
                    <a>Forgot Password?</a>
                  </Link>
                </div>

                <div>
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </Container>
  );
};

export default authWrapper(SignInView, { authRequired: false });
