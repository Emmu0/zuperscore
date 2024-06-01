// import React, { useEffect, useState } from "react";
// // next imports
// import Image from "next/image";
// import Link from "next/link";
// // headless-ui imports
// import { Dialog, Listbox, Menu } from "@headlessui/react";
// //components
// import Button from "@components/buttons";
// // ui icons imports
// import DropdownIcon from "@ui/icons/dropdownIcon";
// import SearchIcon from "@ui/icons/searchIcon";
// import VerticalDotIcon from "@ui/icons/verticalDotIcon";
// import Pagination from "./Pagination";
// import { users } from "@components/data";
// import EnrollUserDialog from "./EnrollUserDialog";
// import Modal from "@components/ui/Modal";
// import { PencilIcon } from "@heroicons/react/solid";
// import { EditUserDialog } from "./CreateEditUserDialog";
// import { title } from "process";
// import Select from "@components/ui/Select";
// import { ASSESSMENT_ENDPOINT } from "@constants/api-routes";
// import useSWR from "swr";
// import { APIFetcher } from "@lib/services";
// import ReactHookInput from "@components/forms/ReactHookInput";
// import { useForm } from "react-hook-form";
// import Create from "./users/Create";
// import AdminUserCreate from "./users/Create";
// import AdminUserEdit from "./users/Edit";
// import AdminUserPasswordForm from "./users/PasswordForm";

// const students = [
//   {
//     id: 1,
//     name: "John Doe",
//   },
//   {
//     id: 2,
//     name: "Jane Doe 2",
//   },
//   {
//     id: 3,
//     name: "Jane Doe 3",
//   },
// ];

// type Inputs = {
//   curr_password: string;
//   new_password: string;
//   retype_password: string;
// };
// const testTypes = ["Full Length Mock", "Partial Length Mock", "Online Test"];

// const StudentTagListOption = ({ name }: any) => {
//   return (
//     <div className="bg-[#F9F9F9] rounded-[50px] flex justify-around  items-center p-1">
//       <div className="h-8 w-8 ">
//         <Image
//           src="https://picsum.photos/200/300"
//           alt="profile picture"
//           height={32}
//           width={32}
//           className="rounded-[50%]"
//         />{" "}
//       </div>
//       <div className="px-1">{name}</div>
//       <div>&times;</div>
//     </div>
//   );
// };

// const Table = ({ isEnrolled, userData, setUserData }: any) => {
//   const [isModal, setIsModal] = useState(false);
//   const [assessmentOptions, setassessmentOptions] = useState<any>(null);
//   const [currentAssessment, setCurrentAssessment] = useState<any>(null);
//   const [editModal, setEditModal] = useState(false);
//   const [passModal, setPassModal] = useState(false);
//   // const [userData, setUserData] = useState<any>(users);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors, isSubmitting },
//   } = useForm<Inputs>({
//     defaultValues: {
//       new_password: "",
//       retype_password: "",
//     },
//   });
//   const registerOptions = {
//     new_password: { required: "Password is required" },
//     retype_password: {
//       required: "Re-type Password is required",
//       validate: (value: string) => {
//         if (value !== watch("new_password")) {
//           return "Password does not match";
//         }
//       },
//     },
//   };
//   useEffect(() => {
//     reset({ new_password: "", retype_password: "" });
//   }, [passModal, reset]);

//   const { data: assessmentList, error: assessmentListError } = useSWR(
//     ASSESSMENT_ENDPOINT,
//     APIFetcher,
//     {
//       refreshInterval: 0,
//     }
//   );
//   // console.log("list------>", assessmentList);
//   React.useEffect(() => {
//     let assessmentPayload: any = [];
//     assessmentList?.map((_assessment: any) => {
//       console.log("_assessment", _assessment);
//       assessmentPayload.push({
//         key: _assessment?.id,
//         title: _assessment?.name,
//         data: _assessment,
//       });
//     });
//     setassessmentOptions(assessmentPayload);
//   }, [assessmentList]);
//   // console.log("options----> ", assessmentOptions);
//   return (
//     <div className="my-4 w-full">
//       <table className="w-full border border-collapse">
//         <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
//           <tr className="border">
//             <th className="tg-0lax border text-left p-4  lg:w-[57px]"></th>
//             <th className="tg-0lax border text-left p-4 ">Student Name</th>
//             <th className="tg-0lax border text-left p-4 ">Email</th>
//             <th className="tg-0lax border text-left p-4 ">Product</th>
//             <th className="tg-0lax border text-left p-4 lg:w-[205px]"></th>
//             <th className="tg-0lax border text-left p-4 lg:w-[57px]"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {userData
//             .filter((user: any) => (isEnrolled ? user.is_enrolled === isEnrolled : true))
//             .map((user: any) => {
//               return (
//                 <tr key={user._id}>
//                   <td className="tg-0lax border p-4 ">
//                     <div className="flex justify-center items-center cursor-pointer">
//                       <input type="checkbox" className="accent-violet-100" />
//                     </div>
//                   </td>
//                   <td className="tg-0lax border p-4 ">
//                     <Link
//                       href={{
//                         pathname: "/admin/students/[student_id]/course-at-glance",
//                         query: { student_id: user._id },
//                       }}
//                     >
//                       <a>
//                         <div className="flex justify-start items-center cursor-pointer">
//                           <div className="h-[26px] w-[26px] rounded-[50%]">
//                             <Image
//                               src={user.image_url}
//                               height={26}
//                               width={26}
//                               className="rounded-[50%]"
//                               alt="profile picture"
//                             />
//                           </div>
//                           <div className="font-semibold ml-4">{`${user.first_name} ${user.last_name}`}</div>
//                         </div>
//                       </a>
//                     </Link>
//                   </td>
//                   <td className="tg-0lax border p-4">
//                     {" "}
//                     <div>{user.email}</div>
//                   </td>
//                   <td className="tg-0lax border p-4">
//                     {user.products?.map((product: any, index: any) => {
//                       return <div key={product._id}>{product.name}</div>;
//                     })}
//                   </td>
//                   <td className="tg-0lax border p-4">
//                     <Button
//                       onClick={() => {
//                         setIsModal(true);
//                       }}
//                     >
//                       Attach Assessments
//                     </Button>
//                     <Modal
//                       modal={isModal}
//                       setModal={setIsModal}
//                       onClose={() => {}}
//                       title={"Attach Assessments"}
//                     >
//                       <div>
//                         <div className="text-sm text-dark-100 mb-2">Choose Assessment</div>
//                         <Select
//                           placeHolder="Select Assessment"
//                           options={assessmentOptions}
//                           selectedOptions={currentAssessment}
//                           handleOption={(_value: any, data: any) => {
//                             setCurrentAssessment(_value);
//                           }}
//                           multiple={true}
//                         />
//                       </div>
//                     </Modal>
//                   </td>
//                   <AdminUserEdit
//                     editModal={editModal}
//                     setEditModal={setEditModal}
//                     editData={{
//                       first_name: user?.first_name,
//                       last_name: user?.last_name,
//                       email: user?.email,
//                     }}
//                     setUserData={setUserData}
//                   />
//                   <AdminUserPasswordForm></AdminUserPasswordForm>
//                   <td className=" tg-0lax border p-4 ">
//                     <Menu>
//                       <Menu.Button>
//                         <VerticalDotIcon />
//                       </Menu.Button>
//                       <Menu.Items
//                         className={
//                           "border border-border-light shadow-lg absolute right-0 flex flex-col justify-start items-start  px-2 py-2 bg-light-0"
//                         }
//                       >
//                         <Menu.Item>
//                           {({ active }) => (
//                             <div
//                               onClick={() => setEditModal(true)}
//                               className={`${
//                                 active && " "
//                               } px-4 py-2 cursor-pointer flex justify-start items-center`}
//                             >
//                               <PencilIcon /> <div className="ml-2">Edit</div>
//                             </div>
//                           )}
//                         </Menu.Item>

//                         <Menu.Item>
//                           {({ active }) => (
//                             <div
//                               className={`${
//                                 active && " "
//                               } px-4 py-2 cursor-pointer flex justify-start items-center`}
//                               onClick={() => setPassModal(true)}
//                             >
//                               <div className="ml-2">Update Password</div>
//                             </div>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Menu>
//                   </td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const EnrollUser = ({ isEnrolled = true }: any) => {
//   const [isModal, setIsModal] = useState(false);
//   const [showCreateUserModal, setShowCreateUserModal] = useState(false);
//   const [userData, setUserData] = useState<any>(users);
//   return (
//     <div className=" my-4">
//       <div className="flex justify-between items-center">
//         <div className="flex jsutify-start items-center">
//           <div className="text-3xl font-semibold mr-8">
//             {isEnrolled ? "Enrolled Users" : "Users"}
//           </div>
//           <div className=" relative flex justify-start items-center">
//             <SearchIcon className=" mx-2 absolute my-2 z-100" width="18" height="18" />
//             <input
//               type="search"
//               placeholder="Search"
//               className="px-4 py-2 pl-8 outline-none border border-border-light"
//             />
//           </div>
//         </div>
//         <div className="flex justify-end items-center">
//           <div className="mr-8">
//             <Button
//               variant="secondary"
//               className="border border-border-light px-4 py-2 bg-light-100 text-dark-0"
//             >
//               + Add filter
//             </Button>
//           </div>
//           {/* <div className="ml-8">
//             <Button
//               className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium"
//               onClick={() => setIsModal(true)}
//             >
//               Assign Test{" "}
//             </Button>

//             <EnrollUserDialog isModal={isModal} setIsModal={setIsModal} />
//           </div> */}
//           <div className="ml-8">
//             <Button
//               className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium"
//               onClick={() => {
//                 setShowCreateUserModal(true);
//               }}
//             >
//               Create User{" "}
//             </Button>
//             <AdminUserCreate
//               isModal={showCreateUserModal}
//               setIsModal={setShowCreateUserModal}
//               userData={userData}
//               setUserData={setUserData}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mt-4 w-full">
//         <Table isEnrolled={isEnrolled} userData={userData} setUserData={setUserData} />
//       </div>
//       <Pagination />
//     </div>
//   );
// };

// export default EnrollUser;

const EnrollUser = () => {
  return (
    <div>
      <div>EnrollUser</div>
    </div>
  );
};

export default EnrollUser;
