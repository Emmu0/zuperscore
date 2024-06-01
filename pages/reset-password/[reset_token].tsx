import React from "react";
// next imports
import { useRouter } from "next/router";
import Link from "next/link";
// icons
import { ChevronLeftIcon } from "@heroicons/react/outline";
// react hook form
import { useForm } from "react-hook-form";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
// components
import Button from "@components/buttons";
import ReactHookPassword from "@components/forms/ReactHookPassword";
// api services
import { Authentication } from "@lib/services/authenticate.service";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

const seoMetaInformation = {
  title: "Forgot Password",
};

type Inputs = {
  password: string;
  retype_password: string;
};

let defaultInputs: Inputs = { password: "", retype_password: "" };

const ResetPasswordView = () => {
  const router = useRouter();
  const { reset_token } = router.query;

  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [passwordSuccess, setPasswordSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultInputs } });

  const inputValidations = {
    password: {
      required: "Password is required",
    },
    retype_password: {
      required: "Re-type Password is required",
      // validate: (value: string) => {
      //   if (value !== watch("password")) {
      //     return "Password does not match";
      //   }
      // },
    },
  };

  const handleResetPasswordButton = async (data: any) => {
    console.log("data", data);
    if (data?.password === data?.retype_password) {
      let payload = {
        token: reset_token,
        password: data?.password,
      };

      return Authentication.resetPassword(payload)
        .then((response) => {
          setPasswordSuccess(true);
          handleAlert(
            "success",
            "Password changed successfully.",
            "Password has been updated successfully. please login again."
          );
        })
        .catch((error) => {
          handleAlert(
            "error",
            "Error changing the password.",
            "There was an error to change the password, please try again."
          );
          console.log(error);
        });
    } else {
      handleAlert("error", "Password match error.", "Please check the password and try again.");
    }
  };

  return (
    <Container meta={seoMetaInformation}>
      <DefaultLayout>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="space-y-5 border border-gray-100 m-5 p-5 rounded-sm w-full max-w-[540px] shadow-lg">
            <div className="flex items-center gap-2">
              <Link href="/forgot-password">
                <a>
                  <div className="border border-gray-100 bg-gray-100 hover:border-gray-200 hover:bg-gray-200 cursor-pointer w-[26px] h-[26px] rounded-sm flex justify-center items-center ">
                    <ChevronLeftIcon className="w-4 h-4" />
                  </div>
                </a>
              </Link>
              <div className="text-lg">Update Password</div>
            </div>

            {passwordSuccess ? (
              <div className="space-y-3">
                <div className="text-gray-500">Password changed successfully.</div>
                <Button
                  className="text-sm cursor-pointer inline- hover:text-violet-100"
                  onClick={() => {
                    setPasswordSuccess(!passwordSuccess);
                    router.push("/signin");
                  }}
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleResetPasswordButton)}>
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

                <div className="pb-4">
                  <ReactHookPassword
                    label="Retype Password"
                    name="retype_password"
                    placeholder="Enter your Password again"
                    register={register}
                    validations={inputValidations.retype_password}
                    required={true}
                  />
                </div>

                <div>
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Continue"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DefaultLayout>
    </Container>
  );
};

export default authWrapper(ResetPasswordView, { authRequired: false });
