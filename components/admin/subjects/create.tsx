import React, { ReactNode } from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";
// components
import Input from "@components/forms/TextInput";
import Button from "@components/buttons";
// swr
import { mutate } from "swr";
// api routes
import { SUBJECT_ENDPOINT } from "@constants/api-routes";
// api services
import { SubjectCreate } from "@lib/services/subjects.service";
import { APIFetcher } from "@lib/services";

type Props = {
  children: ReactNode;
  mutateUrl: string;
};

const SubjectCreateView = ({ children, mutateUrl }: Props) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    setButtonLoader(false);
    setFormData({ ...formData, name: "" });
  };
  const handleShow = () => setShow(true);

  const [formData, setFormData] = React.useState<any>({
    name: "",
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    createSubject();
  };

  const createSubject = () => {
    let payload: any = {
      title: formData.name,
    };

    SubjectCreate(payload)
      .then((response) => {
        setButtonLoader(false);
        mutate(mutateUrl, APIFetcher(mutateUrl), false);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
      });
  };
  console.log(mutateUrl,'mutateUrl');
  
  return (
    <>
      <div onClick={handleShow}>{children}</div>
      <Transition appear show={show} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={show}
          static={true}
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative z-10 my-8 inline-block w-full max-w-xl transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex text-lg font-medium leading-6 text-gray-900">
                  <div className="">Create Subject</div>
                  {/* <div
                    className="ml-auto cursor-pointer text-sm focus:outline-none"
                    onClick={handleClose}
                  >
                    <XIcon width="16px" />
                  </div> */}
                </div>

                <form className="py-4" onSubmit={formSubmit}>
                  <div className="flex flex-col">
                    <div className="my-2 mb-4 w-full">
                      <div className="text-gray-400">Name</div>
                      <input
                        type="text"
                        className="mt-2 w-full rounded border px-2 py-1 outline-none"
                        value={formData.name}
                        onChange={(e: any) => handleFormData("name", e.target.value)}
                      />
                    </div>
                    <div className="ml-auto mt-2 space-x-3">
                      <Button size="sm" type="button" variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button size="sm" type="submit" disabled={buttonLoader}>
                        {buttonLoader ? "Creating..." : "Create"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SubjectCreateView;
