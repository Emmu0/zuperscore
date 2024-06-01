import React from "react";
// next imports
import Link from "next/link";
import dynamic from "next/dynamic";
// react hook form
import { useForm, Controller } from "react-hook-form";
// seo
import Container from "@components/Container";
// components
import Button from "@components/buttons";
import ReactHookInput from "@components/forms/ReactHookInput";
import ReactHookPassword from "@components/forms/ReactHookPassword";
const IntlInput = dynamic(() => import("@components/IntlTelInput"), {
  ssr: false,
});
// cookie
import { setAuthenticationToken } from "@lib/cookie";
// api services
import { Authentication } from "@lib/services/authenticate.service";
// hoc
import authWrapper, { userRoleRedirection } from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

const seoMetaInformation = {
  title: "SignUp",
};

type Inputs = {
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  password: string;
  retype_password: string;
};

let defaultInputs: Inputs = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  email: "",
  password: "",
  retype_password: "",
};

const inputValidations = {
  first_name: { required: "First Name is required" },
  last_name: { required: "Last Name is required" },
  country_code: { required: "Country Code is required" },
  mobile_number: { required: "Mobile Number is required" },
  email: { required: "Email is required" },
  password: { required: "Password is required" },
  retype_password: {
    required: "Retype Password is required",
  },
};

const SignUpView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultInputs } });

  const handleSignUpButton = async (data: any) => {
    const payload = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      mobile_number: data?.mobile_number,
      password: data?.password,
    };

    if (data?.password === data?.retype_password) {
      return Authentication.emailSignUp(payload)
        .then((response) => {
          if (response) return redirectToAdmin(response);
        })
        .catch((error) => {
          handleAlert(
            "error",
            "Error Signing Up",
            "There was an error while Signing Up, please try again."
          );
          console.log(error);
        });
    } else {
      handleAlert("error", "Password match error.", "Please check the password and try again.");
    }
  };

  const redirectToAdmin = async (tokenDetails: any) => {
    setAuthenticationToken(tokenDetails);
      let authUserRole = tokenDetails?.user?.role;
      if (authUserRole) {
        userRoleRedirection(null, authUserRole);
        handleAlert("success", "Logged In successfully", "You have successfully Logged in");
      }
      return;
  };

  return (
    <>
      <Container meta={seoMetaInformation}>
        <>
          <div className="flex relative w-[100vw] h-[100vh] overflow-hidden">
            <div className="bg-signup w-full h-[100vh] hidden md:block">
              <div className="px-16 py-16 text-yellow-0 text-2xl font-semibold z-100">
                Zuperscore
              </div>
              <div className="pt-24 pr-12 pl-16 text-yellow-0 text-3xl text-left">
                Prep to be the best with us.
              </div>
              <div className="bg-light-200 w-[48px] h-[1px] mx-16 mt-10"></div>
              <div className="text-light-200 px-16 py-8 text-left">
                We at Zuperscore provide the best courses for you to prepare for your SAT and clear
                it as easily as possible. We understand that knowing is not enough but what we
                assure is the coaching led results.
              </div>
            </div>

            <div className="flex justify-center items-center w-full h-[100vh] overflow-y-auto">
              <div className="space-y-4 p-5">
                <div>
                  <div className="text-4xl text-violet-100 font-semibold pb-1">
                    Create an account
                  </div>
                  <div className="text-dark-0">
                    Lets get you all set up so that you can begin your journey towards finishing
                    your goal
                  </div>
                </div>

                <form onSubmit={handleSubmit(handleSignUpButton)}>
                  <div className="flex justify-center items-center gap-2 pb-4">
                    <div className="w-full">
                      <ReactHookInput
                        label="First Name"
                        type="text"
                        name="first_name"
                        placeholder="Enter your first name"
                        register={register}
                        validations={inputValidations.first_name}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <ReactHookInput
                        label="Last Name"
                        type="text"
                        name="last_name"
                        placeholder="Enter your last name"
                        register={register}
                        validations={inputValidations.last_name}
                        required={true}
                      />
                    </div>
                  </div>

                  <div className="w-full pb-4">
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

                  <div className="w-full pb-4">
                    <div className="text-sm text-dark-100 mb-2">
                      Mobile Number
                      <span className="text-red-600 ml-1">*</span>
                    </div>
                    <Controller
                      control={control}
                      rules={{
                        required: "This field is required.",
                        minLength: {
                          value: 6,
                          message: "Enter a valid OTP that sent to your mobile number.",
                        },
                      }}
                      name="mobile_number"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <div>
                          <IntlInput
                            value={value}
                            onChange={(value: any) => {
                              onChange(value);
                            }}
                            required={true}
                          />
                          {errors?.mobile_number?.message && (
                            <div className="text-sm text-red-500 mt-2">
                              {errors?.mobile_number?.message}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex justify-center items-center gap-2 pb-4">
                    <div className="w-full">
                      <ReactHookPassword
                        label="Password"
                        name="password"
                        placeholder="Enter your Password"
                        register={register}
                        validations={inputValidations.password}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <ReactHookPassword
                        label="Retype Password"
                        name="retype_password"
                        placeholder="Enter your Password again"
                        register={register}
                        validations={inputValidations.retype_password}
                        required={true}
                      />
                    </div>
                  </div>

                  <div>
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Signing Up..." : "Sign Up"}
                    </Button>
                  </div>
                </form>

                <div className="mt-5 flex justify-between items-center">
                  <div className="bg-dark-100/40 w-[173px] h-[1px]"></div>
                  <div className="text-dark-100">OR</div>
                  <div className="bg-dark-100/40 w-[173px] h-[1px] "></div>
                </div>

                <div className="mt-5 flex justify-center items-center">
                  <div className="text-dark-100">
                    Already have an account?{" "}
                    <Link href="/signin">
                      <a>
                        <span className="text-violet-100 font-medium cursor-pointer">Sign In</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Container>
    </>
  );
};

export default authWrapper(SignUpView, { authRequired: false });
