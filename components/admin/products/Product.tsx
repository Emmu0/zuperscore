import React from "react";
// next imports
import Image from "next/image";
import Link from "next/link";
// components
import { BinIcon, PencilIcon } from "@ui/icons";
import { EditProductDialog } from "./CreateEditProductDialog";

const Product = ({ product }: any) => {
  const [isModal, setIsModal] = React.useState(false);
  return (
    <div className="border border-border-light lg:m-2 m-2 lg:w-[260px] w-[220px] bg-light-200">
      <div className="lg:w-[260px] w-[220px]">
        <Image
          src={product.image_url}
          alt="sat"
          className="lg:w-[323px] w-[220px]"
          height={155}
          width={323}
        />
      </div>
      <div className="p-4">
        <Link
          href={{ pathname: "/admin/products/[product_id]", query: { product_id: product.id } }}
        >
          <a className="cursor-pointer">
            <div className="text-xl font-semibold mt-2">{product.name}</div>
          </a>
        </Link>
        <div className="text-sm mt-2">Subjects : {product.subjects}</div>
        <div className="text-sm mt-2">Topics : {product.topics}</div>
      </div>
      <div className="p-4 flex justify-start items-center">
        <div className="cursor-pointer" onClick={() => setIsModal(true)}>
          <PencilIcon className="mr-4" />
        </div>
        <div className="cursor-pointer">
          <BinIcon />
        </div>
      </div>
      <EditProductDialog isModal={isModal} setIsModal={setIsModal} data={product} />
    </div>
  );
};

export default Product;
