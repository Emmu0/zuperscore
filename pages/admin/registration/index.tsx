import Container from "@components/Container";
import GroupUserSearch from "@components/admin/test-allocation/GroupUserSearch";
import Button from "@components/buttons";
import RegistrationForm from "@components/registration-detail/RegistrationFrom";
import { XIcon } from "@heroicons/react/solid";
import AdminLayout from "@layouts/AdminLayout";
import { ArrowLeftIcon } from "@ui/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const index: React.FC<any> = () => {
    const seoMetaInformation = {
        title: "Registration | Users",
      };
    return (
        <Container meta={seoMetaInformation}>
              <AdminLayout padding={false}>
                <div className="h-full relative flex flex-col">
                  <div className="flex-shrink-0 p-5">
                    <h1 className="text-xl font-medium pb-1">Registration</h1>
                    <small className="text-dark-100">DashBoard / Registration</small>
                    {/* <Link href={`/users`}>
                      <a className="text-sm flex items-center space-x-3">
                        <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
                        <p className="text-dark-100">Back to Users</p>
                      </a>
                    </Link> */}
                  </div>
        
                  <RegistrationForm/>
                </div>
              </AdminLayout>
            </Container>
           
           
          )
}

export default index






// const registration: React.FC<any> = () => {


//     const seoMetaInformation = {
//         title: "Registration | Users",
//       };

 
//   return (
// <Container meta={seoMetaInformation}>
//       <AdminLayout padding={false}>
//         <div className="h-full relative flex flex-col">
//           <div className="flex-shrink-0 p-5">
//             <h1 className="font-semibold">Registration</h1>
//             <small className="">DashBoard / Registration</small>
//             {/* <Link href={`/users`}>
//               <a className="text-sm flex items-center space-x-3">
//                 <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
//                 <p className="text-dark-100">Back to Users</p>
//               </a>
//             </Link> */}
//           </div>

//           <RegistrationForm/>
//         </div>
//       </AdminLayout>
//     </Container>
   
   
//   )
   
// };

// export default registration;
