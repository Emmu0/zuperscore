import Button from "@components/buttons";
import { Authentication } from "@lib/services/authenticate.service";
import React, { useEffect, useState } from "react";

const MotherSessionTable = ({ type }: any) => {
  return (
    <div>
      {type == "session" ? (
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              <th className="border px-3 p-2 text-center">#</th>
              <th className="border text-left px-3 p-2">Title</th>
              <th className="border text-left px-3 p-2">SubjectId</th>
            </tr>
          </thead>

          <tbody>
            {/*  {GetZoomData?.data?.map((vl: any, ky: any) => ( */}
            <tr key={1} className="text-sm font-semibold">
              <td className="border text-center"> 1</td>
              <td className="border px-3 p-2">
                <a className="hover:underline">Test</a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline">2313123123</a>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      ) : type == "chapter" ? (
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              <th className="border px-3 p-2 text-center">#</th>
              <th className="border text-left px-3 p-2">Title</th>
              <th className="border text-left px-3 p-2">SessionId</th>
              <th className="border text-left px-3 p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {/*  {GetZoomData?.data?.map((vl: any, ky: any) => ( */}
            <tr key={1} className="text-sm font-semibold">
              <td className="border text-center"> 1</td>
              <td className="border px-3 p-2">
                <a className="hover:underline">Test</a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline">122233</a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline">Active</a>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      ) : type == "module_mother" ? (
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              <th className="border px-3 p-2 text-center">#</th>
              <th className="border text-left px-3 p-2">Title</th>
              <th className="border text-left px-3 p-2">Time</th>
              <th className="border text-left px-3 p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr key={1} className="text-sm font-semibold">
              <td className="border text-center"> 1</td>
              <td className="border px-3 p-2">
                <a className="hover:underline">Test</a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline">12:00 pm</a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline">Active</a>
              </td>
            </tr>
          </tbody>
        </table>
      ) : type == "topic" ? (
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              <th className="border px-3 p-2 text-center">#</th>
              <th className="border text-left px-3 p-2">ModuleId</th>
              <th className="border text-left px-3 p-2">Title</th>
              <th className="border text-left px-3 p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr key={1} className="text-sm font-semibold">
              <td className="border text-center"> 1</td>
              <td className="border px-3 p-2">
                <a className="hover:underline">21312323</a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline"> Test </a>
              </td>
              <td className="border px-3 p-2">
                <a className="hover:underline">Active</a>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default MotherSessionTable;
