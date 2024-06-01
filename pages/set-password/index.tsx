import React from "react";
// next imports
import { useRouter } from "next/router";
// react hook form
import { useForm } from "react-hook-form";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
// components
import Button from "@components/buttons";
import ReactHookPassword from "@components/forms/ReactHookPassword";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
import { User } from "@lib/services/users.service";
import { userRoleRedirection } from "@lib/hoc/authWrapper";
// context
import { globalContext } from "@contexts/GlobalContextProvider";
import { getAuthenticationToken, setAuthenticationToken } from "@lib/cookie";

const seoMetaInformation = {
  title: "Forgot Password",
};

type Inputs = {
  id: string | null;
  password: string;
  retype_password: string;
};

let defaultInputs: Inputs = { id: "", password: "", retype_password: "" };

const ResetPasswordView = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultInputs } });

  const inputValidations = {
    password: {
      required: "Password is required",
    },
    retype_password: {
      required: "Re-type Password is required",
    },
  };

  const [profile, setProfile] = React.useState<any>(null);
  // Getting the current user
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) {
      setProfile(() => {
        return { ...userToken?.user };
      });
      reset({
        ...defaultInputs,
        id: userToken?.user?.id,
      });
    }
  }, [reset]);

  const handleResetPasswordButton = async (data: any) => {
    if (data?.password === data?.retype_password) {
      const payload = {
        id: data.id,
        password: data.password,
        confirm_password: data.retype_password
      };

      const userPayload = {
        id: data.id,
        set_password_by_user: false
      }
      await User.update(userPayload)
      return User.updatePassword(payload)
        .then((response) => {
          handleAlert(
            "success",
            "Password changed successfully.",
            "Password has been updated successfully"
          );
          let cookieDetails: any = getAuthenticationToken();
          cookieDetails = cookieDetails ? JSON.parse(cookieDetails) : null;
          if (cookieDetails) {
            cookieDetails = {
              ...cookieDetails,
              user: { ...cookieDetails?.user, set_password_by_user: false },
            };
            setAuthenticationToken(cookieDetails);
          }
          setTimeout(() => {
            userRoleRedirection(null, profile.role);
          }, 500);
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
              <div className="text-lg">Set Your Password</div>
            </div>

            <form onSubmit={handleSubmit(handleResetPasswordButton)}>
              <div className="pb-4">
                <ReactHookPassword
                  label="New Password"
                  name="password"
                  placeholder="Enter your New Password"
                  register={register}
                  validations={inputValidations.password}
                  required={true}
                />
              </div>

              <div className="pb-4">
                <ReactHookPassword
                  label="Retype New Password"
                  name="retype_password"
                  placeholder="Enter your New Password again"
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
          </div>
        </div>
      </DefaultLayout>
    </Container>
  );
};

export default authWrapper(ResetPasswordView, { authRequired: true, setPasswordRequired: true, role: ["user", "typist", "manager", "admin", "tutor"], });
