import React from "react";
// next imports
import dynamic from "next/dynamic";
// react hook form
import { useForm, Controller } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import ReactHookInput from "@components/forms/ReactHookInput";
import Modal from "@components/ui/Modal";
import ReactHookPassword from "@components/forms/ReactHookPassword";
const IntlInput = dynamic(() => import("@components/IntlTelInput"), {
  ssr: false,
});
// api services
import { User } from "@lib/services/users.service";
import { APIFetcher } from "@lib/services";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

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

interface IAdminUserCreate {
  user: any;
  handleCurrentUser: any;
  mutateUrl: any;
}

const AdminUserCreate: React.FC<IAdminUserCreate> = ({
  user,
  handleCurrentUser,
  mutateUrl,
}: any) => {
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
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultInputs,
    },
  });

  const [isModal, setModal] = React.useState<any>(false);

  React.useEffect(() => {
    if (user && reset) {
      setModal(true);
      reset({ ...defaultInputs });
    }
  }, [user, reset]);

  const registerValidationOptions = {
    first_name: { required: "First Name is required" },
    last_name: { required: "Last Name is required" },
    mobile_number: { required: "Mobile Number is required" },
    email: { required: "Email is required" },
    password: { required: "Password is required" },
    retype_password: {
      required: "Re-type Password is required",
      validate: (value: string) => {
        if (value !== watch("password")) {
          return "Password does not match";
        }
      },
    },
  };

  const userSubmit = async (data: any) => {
    const payload = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      mobile_number: data?.mobile_number,
      password: data?.password,
    };
    const aplhabets = /[a-zA-Z]/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!aplhabets.test(payload.mobile_number) && (!specialChars.test(payload.mobile_number))) {
      if (data?.password === data?.retype_password) {
        return User.create(payload)
          .then((response) => {
            setModal(false);
            mutate(mutateUrl, APIFetcher(mutateUrl), false);
            handleCurrentUser("clear");
            handleAlert(
              "success",
              "User Created successfully",
              "You have successfully created an user."
            );
          })
          .catch((error) => {
            console.log(error);
            handleAlert(
              "error",
              "Error Signing Up",
              "There was an error while Signing Up, please try again."
            );
          });
      } else {
        handleAlert("error", "Password match error.", "Please check the password and try again.");
      }
    } else {
      handleAlert(
        "error",
        "Invalid Mobile Number",
        "Enter a valid mobile number."
      );
    }
  };

  return (
    <Modal
      title={`Create a user`}
      modal={isModal}
      setModal={() => {
        setModal(false);
        setTimeout(() => {
          handleCurrentUser(null);
        }, 500);
      }}
      onClose={() => {}}
      loading={isSubmitting}
      onSubmit={handleSubmit(userSubmit)}
    >
      <div>
        <div className="mt-4">
          <ReactHookInput
            label="First Name"
            type="text"
            name="first_name"
            register={register}
            validations={registerValidationOptions.first_name}
            error={errors.first_name}
            required={true}
          />
        </div>
        <div className="mt-4">
          <ReactHookInput
            label="Last Name"
            type="text"
            name="last_name"
            register={register}
            validations={registerValidationOptions.last_name}
            error={errors.last_name}
            required={true}
          />
        </div>
        <div className="mt-4">
          <ReactHookInput
            label="Email"
            type="text"
            name="email"
            register={register}
            validations={registerValidationOptions.email}
            error={errors.email}
            required={true}
          />
        </div>

        <div className="w-full mt-4">
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
                  <div className="text-sm text-red-500 mt-2">{errors?.mobile_number?.message}</div>
                )}
              </div>
            )}
          />
        </div>

        <div className="mt-4">
          <ReactHookPassword
            label="Password"
            name="password"
            placeholder="Enter Password"
            register={register}
            validations={registerValidationOptions.password}
            required={true}
            error={errors.password}
          />
        </div>
        <div className="mt-4">
          <ReactHookPassword
            label="Retype Password"
            name="retype_password"
            placeholder="Enter Password Again"
            register={register}
            validations={registerValidationOptions.retype_password}
            required={true}
            error={errors.retype_password}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AdminUserCreate;
