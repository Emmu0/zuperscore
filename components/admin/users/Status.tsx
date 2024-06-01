import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
// api services
import { User } from "@lib/services/users.service";
import { APIFetcher } from "@lib/services";

type Inputs = {
  id: string | null;
  is_active: boolean;
};
let defaultValues = {
  id: "",
  is_active: false,
};

interface IAdminUserStatus {
  user: any;
  handleCurrentUser: any;
  mutateUrl: any;
}

const AdminUserStatus: React.FC<IAdminUserStatus> = ({
  user,
  handleCurrentUser,
  mutateUrl,
}: any) => {
  const {
    register,
    handleSubmit,
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
        is_active: user?.user?.is_active,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      is_active: !data.is_active,
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
      title={`User status change.`}
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
        Are you sure you want to
        <b className="text-violet-100">{!user?.user?.is_active ? " Activate " : " De-activate "}</b>
        the user <b>{` ${user?.user?.first_name} ${user?.user?.last_name}`}</b>.
      </div>
    </Modal>
  );
};

export default AdminUserStatus;
