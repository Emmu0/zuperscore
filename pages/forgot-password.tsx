import React from "react";
// next imports
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
import ReactHookInput from "@components/forms/ReactHookInput";
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
  email: string;
};

let defaultInputs: Inputs = { email: "" };

const inputValidations = {
  email: { required: "Email is required" },
};

const ForgotPasswordView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [otpSuccess, setOtpSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultInputs } });

  const handleResetPasswordButton = async (data: any) => {
    return Authentication.forgotPassword(data)
      .then((response) => {
        handleAlert(
          "success",
          "OTP send ",
          "Please check your email and reset your password by using the link in the email."
        );
        setOtpSuccess(true);
      })
      .catch((error) => {
        handleAlert(
          "error",
          "Error sending OTP Request.",
          "There was an error sending OTP request, please try again."
        );
        console.log(error);
      });
  };

  return (
    <Container meta={seoMetaInformation}>
      <DefaultLayout>
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="space-y-5 border border-gray-100 m-5 p-5 rounded-sm w-full max-w-[540px] shadow-lg">
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <a>
                  <div className="border border-gray-100 bg-gray-100 hover:border-gray-200 hover:bg-gray-200 cursor-pointer w-[26px] h-[26px] rounded-sm flex justify-center items-center ">
                    <ChevronLeftIcon className="w-4 h-4" />
                  </div>
                </a>
              </Link>
              <div className="text-lg">Reset Password</div>
            </div>

            {otpSuccess ? (
              <div className="space-y-3">
                <div className="text-gray-500">
                  An email was sent to your email. Please check and update your password by using
                  the link given you in the email.
                </div>
                <div
                  className="text-sm cursor-pointer inline-block hover:text-violet-100"
                  onClick={() => setOtpSuccess(!otpSuccess)}
                >
                  Entered a wrong Email?
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleResetPasswordButton)}>
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

export default authWrapper(ForgotPasswordView, { authRequired: false });
