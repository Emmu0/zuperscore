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
const IntlInput = dynamic(() => import("@components/IntlTelInput"), {
  ssr: false,
});
// api services
import { User } from "@lib/services/users.service";
import { APIFetcher } from "@lib/services";

type Inputs = {
  id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
};
let defaultValues = {
  id: null,
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
};

interface IAdminUserEdit {
  user: any;
  handleCurrentUser: any;
  mutateUrl: any;
}

const AdminUserEdit: React.FC<IAdminUserEdit> = ({ user, handleCurrentUser, mutateUrl }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const [isModal, setModal] = React.useState<any>(false);

  React.useEffect(() => {
    if (user && reset) {
      setModal(true);
      reset({
        ...defaultValues,
        id: user?.user?.id,
        first_name: user?.user?.first_name,
        last_name: user?.user?.last_name,
        email: user?.user?.email,
        mobile_number: user?.user?.mobile_number,
      });
    }
  }, [user, reset]);

  const registerValidationOptions = {
    first_name: { required: "First Name is required" },
    last_name: { required: "Last Name is required" },
    email: { required: "Email is required" },
    mobile_number: {},
  };

  const userSubmit = async (data: any) => {
    const payload = {
      id: user?.user?.id,
      first_name: data?.first_name,
      last_name: data?.last_name,
      mobile_number: data?.mobile_number,
    };

    return User.update(payload)
      .then((response) => {
        setModal(false);
        mutate(mutateUrl, APIFetcher(mutateUrl), false);
        handleCurrentUser("clear");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      title={`Edit a user`}
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
            disabled={true}
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
      </div>
    </Modal>
  );
};

export default AdminUserEdit;
