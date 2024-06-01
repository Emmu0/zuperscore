import React, { Fragment } from "react";
// icon
import { PencilIcon } from "@heroicons/react/solid";
// recoil
import * as assessmentRecoil from "recoil/assessments/index";
import {  useRecoilState } from "recoil";
// popup
import { Popover, Transition } from "@headlessui/react";

const Annotation = () => {
  const [annotationToggle, recoilAnnotationToggle] = useRecoilState(
    assessmentRecoil.annotationToggleSelector
  );
  const [annotationSelectedText, recoilAnnotationSelectedText] = useRecoilState(
    assessmentRecoil.annotationSelectedTextSelector
  );

  const handleAnnotationToggle = () => {
    if (annotationSelectedText != null && !annotationSelectedText?.id) recoilAnnotationToggle(true);
  };

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={`${open ? "" : "text-opacity-90"}`}>
              <div
                className="flex flex-col items-center gap-1 cursor-pointer py-1.5 px-2"
                onClick={handleAnnotationToggle}
              >
                <PencilIcon height="16px" width="16px" fill="#8B8B8B" />
                <div className="text-sm font-medium text-gray-500">Annotate</div>
              </div>
            </Popover.Button>
            {annotationSelectedText === null && !annotationSelectedText?.id && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-max max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 w-fit">
                    <div className="bg-gray-50 p-4">
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Select the text for annotation
                        </span>
                      </span>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    </>
  );
};
export default Annotation;
