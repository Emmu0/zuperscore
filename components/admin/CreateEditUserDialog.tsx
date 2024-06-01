import React, { useEffect } from "react";
// headless ui
import { Dialog } from "@headlessui/react";
// components
import Button from "@components/buttons";
import { useForm } from "react-hook-form";
import ReactHookInput from "@components/forms/ReactHookInput";

type Inputs = {
  image_url: string;
  first_name: string;
  last_name: string;
  password: string;
  retype_password: string;
  email: string;
  products: [];
};

export const EditUserDialog = ({ editModal, setEditModal, userData, setUserData }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      email: userData?.email,
    },
  });

  useEffect(() => {
    reset({
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      email: userData?.email,
    });
  }, [editModal, reset]);
  const handleEditUser = async (data: any) => {
    const payload = { ...userData, image_url: "/images/default.jpg", products: [] };
    setUserData([...userData, payload]);
    setEditModal(false);
  };

  return (
    <Dialog
      as="div"
      className="relative z-10 shadow-lg"
      open={editModal}
      onClose={() => setEditModal(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-[623px] h-full  transform overflow-hidden  bg-white p-8  shadow-xl transition-all">
            <Dialog.Title as="div" className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
              Edit User
            </Dialog.Title>
            <form onSubmit={handleSubmit(handleEditUser)}>
              <div className="mt-4">
                <ReactHookInput
                  label="First Name"
                  type="text"
                  name="first_name"
                  register={register}
                />
              </div>
              <div className="mt-4">
                <ReactHookInput
                  label="Last Name"
                  type="text"
                  name="last_name"
                  register={register}
                />
              </div>
              <div className="mt-4">
                <ReactHookInput label="Email" type="text" name="email" register={register} />
              </div>
              <div className="flex justify-end items-center pt-8">
                <div>
                  <Button
                    variant="secondary"
                    className="border border-border-light px-4 py-2 bg-light-100 text-dark-0 mr-8"
                    onClick={() => setEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
