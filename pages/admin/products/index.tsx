import React, { useState } from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Button from "@components/buttons";
import Product from "@components/admin/products/Product";

import AdminHeader from "@components/admin/AdminHeader";
// hoc
import authWrapper from "@lib/hoc/authWrapper";
import { CreateProductDialog } from "@components/admin/products/CreateEditProductDialog";

const seoMetaInformation = {
  title: "Admin Product",
};
const products = [
  {
    id: 1,
    name: "Scholastic Assessment Test (SAT)",
    image_url: "/images/SAT.png",
    subjects: "6",
    topics: "240",
    description: "Added description",
  },
  {
    id: 2,
    name: "Scholastic Assessment Test (SAT)",
    image_url: "/images/SAT.png",
    subjects: "6",
    topics: "240",
    description: "Added description",
  },
  {
    id: 1,
    name: "American College Testing (ACT)",
    image_url: "/images/SAT.png",
    subjects: "3",
    topics: "240",
    description: "Added description",
  },
];
const AdminProduct: NextPage = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader
          title="Products"
          button={
            <Button
              className="px-4 py-2 border border-violet-100 text-yellow-0 bg-violet-100 font-medium "
              onClick={() => setIsModal(true)}
            >
              + New Product
            </Button>
          }
        />
        <div>
          <div>
            <CreateProductDialog isModal={isModal} setIsModal={setIsModal} />
          </div>
          <div className="my-8 grid grid-cols-3 gap-2">
            {products.map((product: any, index: any) => {
              return <Product product={product} key={`product-${index}`} />;
            })}
          </div>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminProduct, { authRequired: true });
