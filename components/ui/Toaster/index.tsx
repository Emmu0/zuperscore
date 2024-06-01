// import { CheckIcon, ExclamationCircleIcon, ExclamationIcon, XIcon } from "@heroicons/react/solid";
// import { useEffect, useContext } from "react";
// // import { ContextWrapper } from "@contexts/index";

// type ToasterProps = {
//   position: "top-left" | "top-right" | "bottom-right" | "bottom-left";
// };

// const Toaster = (props: ToasterProps) => {
//   // Define the toaster position
//   let position, animation: string;

//   // Set position of toaster container
//   if (props.position === "top-left") position = "top-[1rem] left-[1rem]";
//   if (props.position === "top-right") position = "top-[1rem] right-[1rem]";
//   if (props.position === "bottom-right") position = "bottom-[1rem] right-[1rem]";
//   if (props.position === "bottom-left") position = "bottom-[1rem] left-[1rem]";

//   // Set animation for each toaster
//   if (props.position === "top-left" || props.position === "bottom-left")
//     animation = "animate-[leftToaster_0.1s_linear_forwards]";
//   else animation = "animate-[rightToaster_0.1s_linear_forwards]";

//   // const { list, setList } = useContext<any>(ContextWrapper);

//   // Remove toaster from the list
//   // const removeToaster = (item: any) => {
//   //   const index: number = list.findIndex((e: any) => e === item);
//   //   setList([...list.slice(0, index), ...list.slice(index + 1)]);
//   // };

//   // useEffect(() => {
//   //   const interval: any = setInterval(() => {
//   //     if (list.length >= 1) removeToaster(list[0]);
//   //   }, 3000);

//   //   return () => clearInterval(interval);
//   // }, [list, removeToaster]);

//   return (
//     <>
//       <div className={`fixed ${position} z-10`}>
//         {/* {list.map((item: any, index: number) => {
//           // Set the colors based on the type
//           const [color, borderColor, bgColor]: string[] =
//             item.type === "success"
//               ? ["text-green-500", "border-green-500", "bg-[#d1ecf1]"]
//               : item.type === "danger"
//               ? ["text-red-500", "border-red-500", "bg-red-100"]
//               : item.type === "warning"
//               ? ["text-orange-500", "border-orange-500", "bg-yellow-100"]
//               : [];

//           return (
//             <div
//               key={index}
//               className={`relative flex px-3 py-5 mb-3 ${color} rounded-md w-80 ${bgColor} ${animation}`}
//             >
//               <span
//                 className="absolute top-2 right-2 cursor-pointer"
//                 onClick={() => removeToaster(item)}
//               >
//                 <XIcon className={`h-3 w-3`} />
//               </span>
//               <div
//                 className={`border-2 ${borderColor} h-12 w-12 rounded-md grid place-items-center mr-3`}
//               >
//                 {item.type === "success" ? (
//                   <CheckIcon className="h-6 w-6" />
//                 ) : item.type === "danger" ? (
//                   <ExclamationIcon className="h-6 w-6" />
//                 ) : item.type === "warning" ? (
//                   <ExclamationCircleIcon className="h-6 w-6" />
//                 ) : null}
//               </div>
//               <div className="">
//                 <h4 className="font-bold">{item.title}</h4>
//                 <p className="text-xs mt-0.5">{item.description}</p>
//               </div>
//             </div>
//           );
//         })} */}
//       </div>
//     </>
//   );
// };

// Toaster.defaultProps = {
//   position: "top-right",
// };

// export default Toaster;



import React from "react";
// headless ui
import { Transition } from "@headlessui/react";
// icons
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/solid";

interface IToastAlert {
  content?: string;
  title?: string;
  type?: "success" | "error" | "warning" | "info";
  interval?: number;
  closeButton?: boolean;
  show?: boolean;
  handleButtonClick?: any;
}

const Toast: React.FC<IToastAlert> = ({
  content,
  title = "Success",
  type = "success",
  closeButton = true,
  show,
  handleButtonClick,
}) => {
  return (
    <>
      <Transition
        show={show}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className="w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {type === "success" && (
                  <CheckCircleIcon className="h-8 w-8 text-green-600" aria-hidden="true" />
                )}
                {type === "error" && (
                  <XCircleIcon className="h-8 w-8 text-red-600" aria-hidden="true" />
                )}
                {type === "warning" && (
                  <ExclamationCircleIcon className="h-8 w-8 text-orange-400" aria-hidden="true" />
                )}
                {type === "info" && (
                  <InformationCircleIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p
                  className={`text-sm font-medium ${type === "success"
                    ? "text-green-600"
                    : type === "error"
                      ? "text-red-500"
                      : type === "warning"
                        ? "text-orange-400"
                        : "text-blue-600"
                    }`}
                >
                  {title}
                </p>
                <p className="mt-1 text-sm text-gray-500">{content}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                {closeButton && (
                  <button
                    type="button"
                    className="bg-white hover:bg-gray-100 rounded-md p-1 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    onClick={handleButtonClick}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
export default Toast;
