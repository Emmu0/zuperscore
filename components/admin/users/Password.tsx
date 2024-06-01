import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
import ReactHookPassword from "@components/forms/ReactHookPassword";
// api services
import { User } from "@lib/services/users.service";
import { APIFetcher } from "@lib/services";
// headless ui
import { Switch } from "@headlessui/react";

type Inputs = {
  id: string | null;
  password: string;
  confirm_password: string;
  set_password_by_user: boolean
};
let defaultValues = {
  id: "",
  password: "",
  confirm_password: "",
  set_password_by_user: false
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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
      reset({ ...defaultValues, id: user?.user?.id, set_password_by_user: user?.user?.set_password_by_user });
    }
  }, [user, reset]);

  const registerValidationOptions = {
    password: { required: "Password is required" },
    confirm_password: {
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
      id: data.id,
      password: data.password,
      confirm_password: data.confirm_password
    };

    const userPayload = {
      id: data.id,
      set_password_by_user: data.set_password_by_user
    }
    await User.update(userPayload)
    return User.updatePassword(payload)
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
      title={`Update password`}
      modal={isModal}
      setModal={() => {
        setModal(false);
        setTimeout(() => {
          handleCurrentUser(null);
        }, 500);
      }}
      onClose={() => { }}
      loading={isSubmitting}
      onSubmit={handleSubmit(userSubmit)}
    >
      <div>
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
            register={register}
            required={true}
            placeholder="Enter Password Again"
            label="Password"
            name="confirm_password"
            validations={registerValidationOptions.confirm_password}
            error={errors.confirm_password}
          />
        </div>
        <div className="mt-4">
          <div className="text-sm text-dark-100 mb-1">Set Password By User</div>
          <div className="relative">
            <Switch
              checked={true}
              onChange={() => setValue("set_password_by_user", !watch("set_password_by_user"))}
              style={{
                backgroundColor: watch("set_password_by_user") ? "#721154" : "#8B8B8B",
              }}
              className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${watch("set_password_by_user") ? "translate-x-4" : "translate-x-0"
                  } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div >
      </div>
    </Modal>
  );
};

export default AdminUserCreate;
