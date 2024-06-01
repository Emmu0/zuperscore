import Button from "@components/buttons";
import { Authentication } from "@lib/services/authenticate.service";
import React, { useEffect, useState } from "react";

const UserSchedule = ({ type }: any) => {
  const [GetZoomData, setGetZoomData] = useState<any>();
  useEffect(() => {
    Authentication.getAdminZoom(type === "admin" ? "admin" : "student")
      .then((result) => {
        setGetZoomData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(GetZoomData, "GetZoomData");

  return (
    <div>
      {type == "admin" ? (
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              <th className="border px-3 p-2 text-center">#</th>
              <th className="border text-left px-3 p-2">Host</th>
              <th className="border text-left px-3 p-2">Subject</th>
              <th className="border text-left px-3 p-2">Title</th>
              <th className="border text-left px-3 p-2">Start Time</th>
              <th className="border text-left px-3 p-2">Attendees</th>
              <th className="border text-left px-3 p-2">Duration</th>
            </tr>
          </thead>

          <tbody>
            {GetZoomData?.data?.map((vl: any, ky: any) => (
              <tr key={ky} className="text-sm font-semibold">
                <td className="border text-center"> {ky + 1}</td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.host}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.subject}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.title}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.start_time}</a>
                </td>
                {vl?.attendees?.map((Avl: any, ky: any) => (
                  <td className="border px-3 p-2">
                    <a className="hover:underline">
                      {Avl?.user_details?.first_name} {Avl?.user_details?.last_name}
                    </a>
                  </td>
                ))}
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.duration}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full border border-collapse whitespace-nowrap">
          <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
            <tr className="border">
              <th className="border px-3 p-2 text-center">#</th>
              <th className="border text-left px-3 p-2">Subject</th>
              <th className="border text-left px-3 p-2">Teacher</th>
              <th className="border text-left px-3 p-2">Title</th>
              <th className="border text-left px-3 p-2">Start Date</th>
              <th className="border text-left px-3 p-2">Duration</th>
            </tr>
          </thead>

          <tbody>
            {GetZoomData?.data?.appointments?.map((vl: any, ky: any) => (
              <tr key={ky} className="text-sm font-semibold">
                <td className="border text-center"> {ky+1}</td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.subject}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.host}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.title}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.start_time}</a>
                </td>
                <td className="border px-3 p-2">
                  <a className="hover:underline">{vl?.duration}</a>
                </td>
              </tr>
            ))}

            {/* );
           })} */}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserSchedule;
