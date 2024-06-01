import React, { useState } from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import AdminHeader from "@components/admin/AdminHeader";
// import Pagination from "@components/admin/Pagination";
import CouponsTable from "@components/admin/products/CouponsTable";
import CreateCouponDialog from "@components/admin/products/CreateCouponDialog";
import Button from "@components/buttons";
// ui icons imports
import { SearchIcon } from "@ui/icons";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Users",
};

const AdminUsers: NextPage = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader
          title="Coupons"
          button={
            <Button
              className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium "
              onClick={() => setIsModal(true)}
            >
              + New Coupon
            </Button>
          }
        />
        <div>
          <div>
            <CreateCouponDialog isModal={isModal} setIsModal={setIsModal} />
          </div>

          <div className=" mt-4 bg-light-200 border border-border-light px-8 py-4 ">
            <div className="flex justify-between items-center ">
              <div className="w-full flex justify-start items-center  p-2 pb-4">
                <div className="w-1/4 m-2  border-r">
                  <div className="text-2xl text-[#000000B2] font-bold p-2">122</div>
                  <div className="text-md text-[#000000B2]">Total Coupons</div>
                </div>
                <div className="w-1/4 m-2 border-r">
                  {" "}
                  <div className="text-2xl text-[#000000B2] font-bold p-2">5</div>
                  <div className="text-md text-[#000000B2]">Total Redemptions</div>
                </div>
                <div className="w-1/4 m-2 border-r">
                  {" "}
                  <div className="text-2xl  text-[#000000B2] font-bold p-2">54</div>
                  <div className="text-md text-[#000000B2]">New Redemptions</div>
                </div>
                <div className="w-1/4 m-2  ">
                  {" "}
                  <div className="text-2xl  text-[#000000B2] font-bold p-2">Rs.23,023</div>
                  <div className="text-md text-[#000000B2]">Redemption amount</div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <div className="flex justify-between items-center">
              <div className="flex jsutify-start items-center">
                <div className="text-3xl font-semibold mr-8">All Coupons</div>
                <div className=" relative flex justify-start items-center">
                  <SearchIcon className=" mx-2 absolute my-2" width="18" height="18" />
                  <input
                    type="search"
                    placeholder="Search"
                    className="px-4 py-2 pl-8 outline-none border border-border-light"
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                <div>
                  <Button
                    variant="secondary"
                    className="border border-border-light px-4 py-2 bg-light-100 text-dark-0"
                  >
                    + Add filter
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full">
              <CouponsTable />
            </div>
            {/* <Pagination /> */}
          </div>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminUsers, { authRequired: true });
