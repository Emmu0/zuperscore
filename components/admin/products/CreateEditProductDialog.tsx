import React, { useEffect } from "react";
// headless ui
import { Dialog } from "@headlessui/react";
// compoenents
import Button from "@components/buttons";
import { useForm } from "react-hook-form";
import ReactHookInput from "@components/forms/ReactHookInput";
import ReactHookTextarea from "@components/forms/ReactHookTextarea";

type Inputs = {
  product_description: string;
  product_name: string;
  product_subjects: string;
  product_topics: string;
};

const registerOptions = {
  product_name: { required: "Product name is required" },
  product_description: { required: "Product description is required" },
  product_subjects: { required: "Product Subjects is required" },
  product_topics: { required: "Product Topics is required" },
};

export const CreateProductDialog = ({ isModal, setIsModal }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      product_name: "",
      product_description: "",
      product_subjects: "",
      product_topics: "",
    },
  });

  useEffect(() => {
    reset({ product_name: "", product_description: "" });
  }, [isModal, reset]);
  const handleCreateProduct = async (data: any) => {};

  return (
    <Dialog
      as="div"
      className="relative z-10 shadow-lg"
      open={isModal}
      onClose={() => setIsModal(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-[623px] h-full  transform overflow-hidden  bg-white p-8  shadow-xl transition-all">
            <Dialog.Title as="div" className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
              Create Product
            </Dialog.Title>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
              <div className="mt-4">
                {/* <div className="text-dark-0">Name</div> */}
                <ReactHookInput
                  label="Product Name"
                  type="text"
                  name="product_name"
                  register={register}
                  validations={registerOptions.product_name}
                  error={errors.product_name}
                />
              </div>
              <div className="mt-4">
                {/* <div className="text-dark-0">Name</div> */}
                <ReactHookInput
                  label="Product Subjects"
                  type="text"
                  name="product_subjects"
                  register={register}
                  validations={registerOptions.product_subjects}
                  error={errors.product_subjects}
                />
              </div>
              <div className="mt-4">
                {/* <div className="text-dark-0">Name</div> */}
                <ReactHookInput
                  label="Product Topics"
                  type="text"
                  name="product_topics"
                  register={register}
                  validations={registerOptions.product_topics}
                  error={errors.product_topics}
                />
              </div>
              <div className="mt-4">
                <ReactHookTextarea
                  label="Product Description"
                  type="text"
                  name="product_description"
                  rows="5"
                  register={register}
                  validations={registerOptions.product_description}
                  error={errors.product_description}
                />

                {/* <textarea
                  className="border border-border-light w-[559px] h-[110px] outline-none p-2 text-dark-0"
                  name="description"
                >
                  Enter details here...
                </textarea> */}
              </div>

              <div className="flex justify-end items-center pt-8">
                <div>
                  <Button
                    variant="secondary"
                    className="border border-border-light px-4 py-2 bg-light-100 text-dark-0 mr-8"
                    onClick={() => setIsModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium"
                  >
                    Add
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

export const EditProductDialog = ({ isModal, setIsModal, data }: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      product_name: data?.name,
      product_description: data?.description,
      product_subjects: data?.subjects,
      product_topics: data?.topics,
    },
  });

  useEffect(() => {
    reset({
      product_name: data?.name,
      product_description: data?.description,
      product_subjects: data?.subjects,
      product_topics: data?.topics,
    });
  }, [isModal]);
  const handleEditProduct = async (data: any) => {};

  return (
    <Dialog
      as="div"
      className="relative z-10 shadow-lg"
      open={isModal}
      onClose={() => setIsModal(false)}
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-[623px] h-full  transform overflow-hidden  bg-white p-8  shadow-xl transition-all">
            <Dialog.Title as="div" className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
              Edit Product
            </Dialog.Title>
            <form onSubmit={handleSubmit(handleEditProduct)}>
              <div className="mt-4">
                {/* <div className="text-dark-0">Name</div> */}
                <ReactHookInput
                  label="Product Name"
                  type="text"
                  name="product_name"
                  register={register}
                  validations={registerOptions.product_name}
                  error={errors.product_name}
                />
              </div>
              <div className="mt-4">
                {/* <div className="text-dark-0">Name</div> */}
                <ReactHookInput
                  label="Product Subjects"
                  type="text"
                  name="product_subjects"
                  register={register}
                  validations={registerOptions.product_subjects}
                  error={errors.product_subjects}
                />
              </div>
              <div className="mt-4">
                {/* <div className="text-dark-0">Name</div> */}
                <ReactHookInput
                  label="Product Topics"
                  type="text"
                  name="product_topics"
                  register={register}
                  validations={registerOptions.product_topics}
                  error={errors.product_topics}
                />
              </div>
              <div className="mt-4">
                <ReactHookTextarea
                  label="Product Description"
                  type="text"
                  name="product_description"
                  rows="5"
                  register={register}
                  validations={registerOptions.product_description}
                  error={errors.product_description}
                />

                {/* <textarea
                  className="border border-border-light w-[559px] h-[110px] outline-none p-2 text-dark-0"
                  name="description"
                >
                  Enter details here...
                </textarea> */}
              </div>

              <div className="flex justify-end items-center pt-8">
                <div>
                  <Button
                    variant="secondary"
                    className="border border-border-light px-4 py-2 bg-light-100 text-dark-0 mr-8"
                    onClick={() => setIsModal(false)}
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
