import React from "react";
// headless ui
import { Dialog, Transition } from "@headlessui/react";
// icons
import { XIcon } from "@heroicons/react/solid";
// swr
import { mutate } from "swr";
// components
import Button from "@components/buttons";
// node operations
import { deleteNode } from "./helpers/nodeOperations";
// api routes
import { SUBJECT_WITH_NODE_ENDPOINT, SUBJECT_ENDPOINT } from "@constants/api-routes";
// api services
import { SubjectNodeOperation } from "@lib/services/subjects.service";
import { APIFetcher } from "@lib/services";

type Props = {
  data: any;
  handleData: any;
  subject: any;
};

const SubjectDelete = ({ data, handleData, subject }: Props) => {
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    if (handleData) handleData(null);
  };
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    if (data) handleShow();
  }, [data]);

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    deleteSubject();
    handleClose;
  };

  const deleteSubject = () => {
    const payload: any = deleteNode(data.id);
    SubjectNodeOperation(payload)
      .then((response: any) => {
        setButtonLoader(false);
        mutate(
          [SUBJECT_WITH_NODE_ENDPOINT(subject?.id), subject?.id],
          APIFetcher(SUBJECT_WITH_NODE_ENDPOINT(subject?.id)),
          false
        );
        if (subject?.is_subject) mutate(SUBJECT_ENDPOINT, APIFetcher(SUBJECT_ENDPOINT), false);
        handleClose();
      })
      .catch((error: any) => {
        console.log(error);
        setButtonLoader(false);
      });
  };

  return (
    <>
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
                <div className="flex items-center text-lg font-medium leading-6 text-gray-900">
                  <div className="text-xl font-medium">Delete</div>
                  <div
                    className="ml-auto cursor-pointer text-sm focus:outline-none"
                    onClick={handleClose}
                  >
                    <XIcon width="16px" />
                  </div>
                </div>

                <div className="py-4">
                  {data && (
                    <div className="py-6 text-xl">
                      Are you sure to delete <strong>{data?.title}</strong>
                    </div>
                  )}
                  <div>
                    <form onSubmit={formSubmit}>
                      <div className="flex float-right">
                        <Button type="submit" disabled={buttonLoader} variant="secondary">
                          {buttonLoader ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SubjectDelete;
