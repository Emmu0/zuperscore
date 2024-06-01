import React from "react";
// next imports
import { NextPage } from "next";
import dynamic from "next/dynamic";
// react hook form
import { useForm, Controller } from "react-hook-form";
// react-otp
import OTPInput from "react-otp-input";
// seo
import Container from "@components/Container";
// layout
import MobileLayout from "@layouts/MobileLayout";
// components
import Button from "@components/buttons";
const IntlInput = dynamic(() => import("@components/IntlTelInput"), {
  ssr: false,
});
// api services
import { Authentication } from "@lib/services/authenticate.service";
import { User } from "@lib/services/users.service";
// cookie
import {
  getAuthenticationToken,
  setAuthenticationToken,
} from "@lib/cookie";
// hoc
import authWrapper, { userRoleRedirection } from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

const seoMetaInformation = {
  title: "Mobile Verification",
};

type Inputs = {
  id: string | null | number;
  mobile_number: string;
  token_toggle: boolean;
  token: string;
};

let defaultInputs: Inputs = {
  id: null,
  mobile_number: "",
  token_toggle: false,
  token: "",
};

const MobileVerificationView: NextPage = () => {
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
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultInputs } });

  const [profile, setProfile] = React.useState<any>(null);
  const [otpConfirmationToggle, setOtpConfirmationToggle] = React.useState(false);
  const [otpConfirmation, setOtpConfirmation] = React.useState(false);

  // Getting the current user
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) {
      setOtpConfirmationToggle(false);
      setOtpConfirmation(false);
      setProfile(() => {
        return { ...userToken?.user };
      });
      console.log("userToken?.user?.mobile_number", userToken?.user?.mobile_number);
      reset({
        ...defaultInputs,
        id: userToken?.user?.id,
        mobile_number: userToken?.user?.mobile_number,
      });
    }
  }, [reset]);

  // updating the mobile number in the user data
  const handleMobileNumberConfirmation = async (data: any) => {
    if (data?.mobile_number && data?.mobile_number.length >= 10) {
      if (profile?.mobile_number === data?.mobile_number) return sendMobileOTPRequest();
      else {
        let payload = {
          id: data?.id,
          mobile_number: data?.mobile_number,
        };
        return User.update(payload)
          .then((response) => {
            // reset the mobile number
            reset({ ...data, mobile_number: data.mobile_number });
            // update the mobile number in cookie
            let cookieDetails: any = getAuthenticationToken();
            cookieDetails = cookieDetails ? JSON.parse(cookieDetails) : null;
            if (cookieDetails) {
              cookieDetails = {
                ...cookieDetails,
                user: { ...cookieDetails?.user, mobile_number: payload.mobile_number },
              };
              setAuthenticationToken(cookieDetails);
            }
            return sendMobileOTPRequest();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      handleAlert("error", "Mobile number.", "Please enter the valid mobile number and try again.");
    }
  };

  // Sending mobile OTP request
  const sendMobileOTPRequest = async () => {
    return await Authentication.sendMobileOtp()
      .then((response) => {
        if (response && response?.message && response?.message === "success") {
          handleAlert(
            "success",
            "OTP send to mobile number",
            "Otp sent to your mobile number successfully."
          );
          setOtpConfirmationToggle(true);
          setOtpConfirmation(false);
        } else {
          handleAlert(
            "error",
            "Error sending OTP to mobile number",
            "There was an error sending OTP to mobile number, please try again."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        handleAlert(
          "error",
          "Error sending OTP to mobile number",
          "There was an error sending OTP to mobile number, please try again."
        );
      });
  };

  const confirmMobileOTPRequest = async (data: any) => {
    let payload = { token: data.token };
    return await Authentication.verifyMobileOtp(payload)
      .then((response) => {
        if (response && response?.message && response?.message === "success") {
          handleAlert("success", "OTP verified successfully.", "Otp verified successfully.");
          // update the mobile number in cookie
          let cookieDetails: any = getAuthenticationToken();
          cookieDetails = cookieDetails ? JSON.parse(cookieDetails) : null;
          if (cookieDetails) {
            cookieDetails = {
              ...cookieDetails,
              user: { ...cookieDetails?.user, mobile_verified: true },
            };
            setAuthenticationToken(cookieDetails);
          }
          setOtpConfirmation(true);
          setTimeout(() => {
            userRoleRedirection(null, profile.role);
          }, 500);
        } else {
          handleAlert(
            "error",
            "Error verifying your OTP",
            "There was an error verifying OTP, please enter a valid OTP or try again later."
          );
        }
      })
      .catch((error) => {
        console.log(error);
        handleAlert(
          "error",
          "Error verifying your OTP",
          "There was an error verifying OTP, please try again."
        );
      });
  };

  return (
    <Container meta={seoMetaInformation}>
      <MobileLayout>
        <div className="container mx-auto h-full flex justify-center items-center">
          <div className="border border-gray-100 m-5 p-5 rounded-sm w-full max-w-[540px] shadow-lg">
            <div className="text-lg mb-3">Verifying mobile number</div>
            {profile ? (
              <>
                {!otpConfirmationToggle ? (
                  <form onSubmit={handleSubmit(handleMobileNumberConfirmation)}>
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

                    <div>
                      <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Continue"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    {!otpConfirmation ? (
                      <div className="space-y-4">
                        <form onSubmit={handleSubmit(confirmMobileOTPRequest)}>
                          <div className="pb-4">
                            <div className="text-sm text-dark-100 mb-2">
                              Enter OTP here
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
                              name="token"
                              render={({ field: { onChange, onBlur, value, ref } }) => (
                                <div id="otp" className="px-2">
                                  <OTPInput
                                    value={value}
                                    onChange={(_value: any) => onChange(_value)}
                                    numInputs={6}
                                    inputStyle="inputStyle"
                                    containerStyle="containerStyle"
                                    isInputNum={true}
                                  />
                                  {errors?.token?.message && (
                                    <div className="text-sm text-red-500 mt-2">
                                      {errors?.token?.message}
                                    </div>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          <div>
                            <Button className="w-full" type="submit" disabled={isSubmitting}>
                              {isSubmitting ? "Processing..." : "Continue"}
                            </Button>
                          </div>
                        </form>

                        <div
                          className="text-sm cursor-pointer inline-block hover:text-violet-100"
                          onClick={() => setOtpConfirmationToggle(!otpConfirmationToggle)}
                        >
                          Entered a wrong Mobile Number?
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-gray-500">
                          OTP verified successfully. Please stay in the page it will redirect.
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="text-center text-gray-400">Loading...</div>
            )}
          </div>
        </div>
      </MobileLayout>
    </Container>
  );
};

export default authWrapper(MobileVerificationView, {
  authRequired: true,
  // mobileRequired: true,
  role: ["admin", "tutor", "typist", "manager", "user"],
});
