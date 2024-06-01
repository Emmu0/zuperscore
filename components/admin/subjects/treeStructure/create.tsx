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
import { addNodeAsChild, addNodeAsSibling } from "./helpers/nodeOperations";
// api routes
import { SUBJECT_ENDPOINT, SUBJECT_WITH_NODE_ENDPOINT } from "@constants/api-routes";
// api services
import { SubjectNodeOperation } from "@lib/services/subjects.service";
import { APIFetcher } from "@lib/services";

type Props = {
  data: any;
  handleData: any;
  add_to: string;
  subject: any;
};

const TreeCreate = ({ data, handleData, add_to, subject }: Props) => {
  const [show, setShow] = React.useState(false);
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const handleClose = () => {
    setShow(false);
    setButtonLoader(false);
    if (handleData) handleData(null);
    setFormData({ ...formData, storeType: "children", name: "" });
  };
  const handleShow = () => setShow(true);
  React.useEffect(() => {
    if (data) handleShow();
  }, [data]);

  const [formData, setFormData] = React.useState<any>({
    storeType: "children",
    name: "",
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    setButtonLoader(true);
    createTree();
  };

  const createTree = () => {
    let payload: any = null;
    if (add_to === "children") {
      payload = addNodeAsChild(data.id, formData.name, "SECTION");
    } else {
      payload = addNodeAsSibling(data.id, "right", formData.name, "SECTION");
    }

    SubjectNodeOperation(payload)
      .then((response) => {
        setButtonLoader(false);
        mutate(
          [SUBJECT_WITH_NODE_ENDPOINT(subject?.id), subject?.id],
          APIFetcher(SUBJECT_WITH_NODE_ENDPOINT(subject?.id)),
          false
        );
        if (data?.is_subject) mutate(SUBJECT_ENDPOINT, APIFetcher(SUBJECT_ENDPOINT), false);
        handleClose();
      })
      .catch((error) => {
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
                <div className="flex text-lg font-medium leading-6 text-gray-900">
                  <div className="">Create Folder</div>
                  {/* <div
                    className="ml-auto cursor-pointer text-sm focus:outline-none"
                    onClick={handleClose}
                  >
                    <XIcon width="16px" />
                  </div> */}
                </div>

                <form className="py-4"  onSubmit={formSubmit} >
                  <div className="flex flex-col">
                    <div className="my-2 mb-4 w-full">
                      <div className="text-gray-400">Name</div>
                      <input
                        type="text"
                        className="mt-2 w-full rounded border px-2 py-1 outline-none"
                        value={formData.name}
                        onChange={(e) => handleFormData("name", e.target.value)}
                      />
                    </div>
                    <div className="ml-auto mt-2 space-x-3">
                      <Button type="button" size="sm" variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button size="sm" variant="primary" type="submit" disabled={buttonLoader}>
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

export default TreeCreate;
