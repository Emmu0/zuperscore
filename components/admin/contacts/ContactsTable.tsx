import React from "react";
// next imports
import Image from "next/image";
// ui icons
import { VerticalDotIcon } from "@ui/icons";

const ContactsTable = () => {
  return (
    <div className="my-4 w-full">
      <table className="w-full border border-collapse">
        <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
          <tr className="border">
            {/* <th className="tg-0lax border text-left p-4 h-[60px] w-[57px]"></th> */}
            <th className="tg-0lax border text-left p-4 h-[60px]">Name</th>
            <th className="tg-0lax border text-left p-4 h-[60px]">Email</th>
            <th className="tg-0lax border text-left p-4 h-[60px]">Mobile</th>
            <th className="tg-0lax border text-left p-4 h-[60px] lg:w-[205px]"></th>
            <th className="tg-0lax border text-left p-4 h-[60px] lg:w-[57px]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tg-0lax border p-4 ">
              <div className="flex justify-start items-center">
                <div className="h-[26px] w-[26px] rounded-[50%]">
                  <Image
                    src="/images/default.jpg"
                    className="h-[26px] w-[26px] rounded-[50%]"
                    height={26}
                    width={26}
                    alt="profilepic"
                  />
                </div>
                <div className="font-semibold ml-4">Bhavesh Raja</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>raj@gmail.com</div>
            </td>
            <td className="tg-0lax border p-4">+91 1234567890</td>
            <td className="tg-0lax border p-4"></td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="tg-0lax border p-4 ">
              <div className="flex justify-start items-center">
                <div className="h-[26px] w-[26px] rounded-[50%]">
                  <Image
                    src="/images/default.jpg"
                    className="h-[26px] w-[26px] rounded-[50%]"
                    height={26}
                    width={26}
                    alt="profilepic"
                  />
                </div>
                <div className="font-semibold ml-4">Bhavesh Raja</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>raj@gmail.com</div>
            </td>
            <td className="tg-0lax border p-4">+91 1234567890</td>
            <td className="tg-0lax border p-4"></td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="tg-0lax border p-4 ">
              <div className="flex justify-start items-center">
                <div className="h-[26px] w-[26px] rounded-[50%]">
                  <Image
                    src="/images/default.jpg"
                    className="h-[26px] w-[26px] rounded-[50%]"
                    height={26}
                    width={26}
                    alt="profilepic"
                  />
                </div>
                <div className="font-semibold ml-4">Bhavesh Raja</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              {" "}
              <div>raj@gmail.com</div>
            </td>
            <td className="tg-0lax border p-4">+91 1234567890</td>
            <td className="tg-0lax border p-4"></td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>

          <tr>
            <td className="tg-0lax border p-4 ">
              <div className="flex justify-start items-center">
                <div className="h-[26px] w-[26px] rounded-[50%]">
                  <Image
                    src="/images/default.jpg"
                    className="h-[26px] w-[26px] rounded-[50%]"
                    height={26}
                    width={26}
                    alt="profilepic"
                  />
                </div>
                <div className="font-semibold ml-4">Bhavesh Raja</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              <div>raj@gmail.com</div>
            </td>
            <td className="tg-0lax border p-4">+91 1234567890</td>
            <td className="tg-0lax border p-4"></td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="tg-0lax border p-4 ">
              <div className="flex justify-start items-center">
                <div className="h-[26px] w-[26px] rounded-[50%]">
                  <Image
                    src="/images/default.jpg"
                    className="h-[26px] w-[26px] rounded-[50%]"
                    height={26}
                    width={26}
                    alt="profilepic"
                  />
                </div>
                <div className="font-semibold ml-4">Bhavesh Raja</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              <div>raj@gmail.com</div>
            </td>
            <td className="tg-0lax border p-4">+91 1234567890</td>
            <td className="tg-0lax border p-4"></td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
          <tr>
            <td className="tg-0lax border p-4 ">
              <div className="flex justify-start items-center">
                <div className="h-[26px] w-[26px] rounded-[50%]">
                  <Image
                    src="/images/default.jpg"
                    className="h-[26px] w-[26px] rounded-[50%]"
                    height={26}
                    width={26}
                    alt="profilepic"
                  />
                </div>
                <div className="font-semibold ml-4">Bhavesh Raja</div>
              </div>
            </td>
            <td className="tg-0lax border p-4">
              <div>raj@gmail.com</div>
            </td>
            <td className="tg-0lax border p-4">+91 1234567890</td>
            <td className="tg-0lax border p-4"></td>
            <td className="h-[60px] flex justify-center items-center border-t">
              <VerticalDotIcon />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ContactsTable;
