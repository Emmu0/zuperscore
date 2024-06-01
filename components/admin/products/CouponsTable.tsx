import React from "react";
// compoents
import { GreenCircle, RedCircle } from "@components/ui/AlertCirlce";
// ui icons imports
import { VerticalDotIcon } from "@ui/icons";

const CouponsTable = () => {
  return (
    <div className="my-4 w-full">
      <table className="w-full border border-collapse">
        <thead className="border bg-yellow-0 h-10 text-[#721154] font-normal">
          <tr className="border">
            <th className="tg-0lax border text-left p-4 h-[60px] ">Name</th>
            <th className="tg-0lax border text-left p-4 h-[60px]">Code</th>
            <th className="tg-0lax border text-left p-4 h-[60px]">Product</th>
            <th className="tg-0lax border text-left p-4 h-[60px]">Amount</th>
            <th className="tg-0lax border text-left p-4 h-[60px] lg:w-[205px]">Redemption</th>
            <th className="tg-0lax border text-left p-4 h-[60px] lg:w-[57px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="h-[60px] flex justify-start items-center border-b">
              <div className="flex justify-start items-center ml-4">
                <GreenCircle /> <div className="ml-2 font-semibold">Diwali</div>
              </div>
            </td>
            <td className="tg-0lax border h-[60px]">
              <div className="flex justify-start items-center ml-4">
                <div className="bg-[#CC96AE59] px-4 py-2">Diwali 50</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>SAT</div>
            </td>
            <td className="tg-0lax border p-4">50%</td>
            <td className="tg-0lax border p-4">343</td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="h-[60px] flex justify-start items-center border-b">
              <div className="flex justify-start items-center ml-4">
                <GreenCircle /> <div className="ml-2 font-semibold">Diwali</div>
              </div>
            </td>
            <td className="tg-0lax border h-[60px]">
              <div className="flex justify-start items-center ml-4">
                <div className="bg-[#CC96AE59] px-4 py-2">Diwali 50</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>SAT</div>
            </td>
            <td className="tg-0lax border p-4">50%</td>
            <td className="tg-0lax border p-4">343</td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="h-[60px] flex justify-start items-center border-b">
              <div className="flex justify-start items-center ml-4">
                <GreenCircle /> <div className="ml-2 font-semibold">Diwali</div>
              </div>
            </td>
            <td className="tg-0lax border h-[60px]">
              <div className="flex justify-start items-center ml-4">
                <div className="bg-[#CC96AE59] px-4 py-2">Diwali 50</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>SAT</div>
            </td>
            <td className="tg-0lax border p-4">50%</td>
            <td className="tg-0lax border p-4">343</td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="h-[60px] flex justify-start items-center border-b">
              <div className="flex justify-start items-center ml-4">
                <GreenCircle /> <div className="ml-2 font-semibold">Diwali</div>
              </div>
            </td>
            <td className="tg-0lax border h-[60px]">
              <div className="flex justify-start items-center ml-4">
                <div className="bg-[#CC96AE59] px-4 py-2">Diwali 50</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>SAT</div>
            </td>
            <td className="tg-0lax border p-4">50%</td>
            <td className="tg-0lax border p-4">343</td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="h-[60px] flex justify-start items-center border-b">
              <div className="flex justify-start items-center ml-4">
                <RedCircle /> <div className="ml-2 font-semibold">Last Chance</div>
              </div>
            </td>
            <td className="tg-0lax border h-[60px]">
              <div className="flex justify-start items-center ml-4">
                <div className="bg-[#CC96AE59] px-4 py-2">Diwali 50</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>SAT</div>
            </td>
            <td className="tg-0lax border p-4">50%</td>
            <td className="tg-0lax border p-4">343</td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="h-[60px] flex justify-start items-center border-b">
              <div className="flex justify-start items-center ml-4">
                <GreenCircle /> <div className="ml-2 font-semibold">Diwali</div>
              </div>
            </td>
            <td className="tg-0lax border h-[60px]">
              <div className="flex justify-start items-center ml-4">
                <div className="bg-[#CC96AE59] px-4 py-2">Diwali 50</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>SAT</div>
            </td>
            <td className="tg-0lax border p-4">50%</td>
            <td className="tg-0lax border p-4">343</td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default CouponsTable;
