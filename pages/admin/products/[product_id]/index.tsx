import React, { useState } from "react";
// next imports
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
//components
import Button from "@components/buttons";
import ProductSubject from "@components/admin/products/ProductSubject";
// ui icons
import { ArrowLeftIcon } from "@ui/icons";
// hoc
import authWrapper from "@lib/hoc/authWrapper";

// image imports
const SAT_IMG_URL = "/images/SAT.png";

const seoMetaInformation = {
  title: "Admin Product Details",
};

const AdminProductDetails: NextPage = () => {
  const [tab, setTab] = useState("Mathematics");
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <Link href={`/admin/products`}>
          <a className="text-sm flex items-center space-x-3 mb-4">
            <ArrowLeftIcon height="14px" width="16px" fill="#8B8B8B" />
            <p className="text-dark-100">Back to products</p>
          </a>
        </Link>
        <div>
          <div className=" flex justify-between items-center bg-light-200">
            <div className=" flex justify-start items-center">
              <div className="mr-8">
                <Image src={SAT_IMG_URL} alt="SAT" height={100} width={180} />
              </div>
              <div>
                <div className="text-xl font-semibold">Scholastic Assessment Test (SAT)</div>
                <div className="flex justify-start items-center mt-4">
                  <div className="mr-8">Subjects: 6</div>
                  <div>Topics: 240</div>
                </div>
              </div>

              <div className="flex justify-start items-center pt-2"></div>
            </div>

            <div className="flex justify-start items-center ">
              <Button className="px-4  py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium mr-4 flex justify-center items-center">
                <div className="whitespace-nowrap">+ Create Subject </div>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center  border-b border-border-light mt-4">
          <div
            className={`mr-8 text-violet-100 cursor-pointer ${
              tab === "Mathematics" ? "border-b-4 border-violet-100 pb-3 font-semibold" : "pb-4"
            }`}
            onClick={() => setTab("Mathematics")}
          >
            Mathematics
          </div>
          <div
            className={`text-violet-100 cursor-pointer ${
              tab === "English" ? "border-b-4 border-violet-100 pb-3 font-semibold" : "pb-4"
            }`}
            onClick={() => setTab("English")}
          >
            English
          </div>
        </div>
        <div className=" no-scrollbar">
          <ProductSubject />
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminProductDetails, { authRequired: true });
