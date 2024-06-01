import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
import Select, { ISelectOptions } from "@components/ui/Select";
// api services
import { User } from "@lib/services/users.service";
import { APIFetcher } from "@lib/services";

type Inputs = {
  id: string | null;
  role: string;
};
let defaultValues = {
  id: "",
  role: "user",
};

interface IAdminUserRole {
  user: any;
  handleCurrentUser: any;
  mutateUrl: any;
}

export const userRoleListOptions: ISelectOptions[] = [
  {
    key: "user",
    title: "Student",
  },
  {
    key: "admin",
    title: "Admin",
  },
  {
    key: "tutor",
    title: "Tutor",
  },
  {
    key: "typist",
    title: "Typist",
  },
  {
    key: "manager",
    title: "Manager",
  },
];

const AdminUserRole: React.FC<IAdminUserRole> = ({ user, handleCurrentUser, mutateUrl }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
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
        role: user?.user?.role,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      role: data.role,
    };

    return User.update(payload)
      .then((response) => {
        setModal(false);
        mutate(mutateUrl, APIFetcher(mutateUrl), false);
        handleCurrentUser("clear");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Modal
      title={`User role change.`}
      modal={isModal}
      setModal={() => {
        setModal(false);
        setTimeout(() => {
          handleCurrentUser(null);
        }, 500);
      }}
      onClose={() => {}}
      loading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="text-sm text-dark-100">Choose user role</div>
        {watch && (
          <Select
            placeHolder="Select user role"
            options={userRoleListOptions}
            selectedOptions={[watch("role")]}
            handleOption={(_value: any, data: any) => {
              setValue("role", _value[0]);
            }}
            multiple={false}
          />
        )}
      </div>
    </Modal>
  );
};

export default AdminUserRole;
