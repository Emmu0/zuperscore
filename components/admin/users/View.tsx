import React from "react";
// next imports
import Link from "next/link";
// components
import Button from "@components/ui/Button";
// data
import { userRoleListOptions } from "./Role";

interface IAdminUserView {
  users: any;
  handleCurrentUser: any;
  cursor: any;
  userDetails: any;
}

const AdminUserView: React.FC<IAdminUserView> = ({
  users,
  handleCurrentUser,
  cursor,
  userDetails,
}) => {
  const startIndex = parseInt(cursor?.split(":"[0])) * parseInt(cursor?.split(":")[1]);

  const filterRoleTitle = (role: string) => {
    let userRole = "Student";
    let currentRole = userRoleListOptions.find((_userRole: any) => _userRole.key === role);
    if (currentRole) {
      userRole = currentRole?.title;
    }
    return userRole;
  };

  return (
    <>
      <table className="w-full border border-collapse whitespace-nowrap">
        <thead className="border bg-yellow-100 h-10 text-violet-100 font-normal">
          <tr className="border">
            <th className="border px-3 p-2 text-center">#</th>
            <th className="border text-left px-3 p-2">Student Name</th>
            <th className="border text-left px-3 p-2">Email</th>
            <th className="border text-left px-3 p-2">Status</th>
            <th className="border text-left px-3 p-2">Role</th>
            <th className="border text-left px-3 p-2">Assessment</th>
            {userDetails?.user?.role !== "tutor" && (
              <>
                <th className="border text-left px-3 p-2">Manager</th>
                <th className="border text-left px-3 p-2">Edit</th>
              </>
            )}
            {userDetails?.user?.role === "admin" && (
              <th className="border text-left px-3 p-2">Password</th>
            )}
          </tr>
        </thead>

        <tbody>
          {users &&
            users.results.map((user: any, userIndex: any) => {
              return (
                <tr key={user.id} className="text-sm font-semibold">
                  <td className="border text-center">{startIndex + userIndex + 1}</td>
                  <td className="border px-3 p-2">
                    <Link href={`users/${user?.id}/profile`} className="hover:underline">
                      <a className="hover:underline">{`${user.first_name} ${user.last_name}`}</a>
                    </Link>
                  </td>
                  <td className="border px-3 p-2">
                    <Link href={`users/${user?.id}/profile`}>
                      <a className="hover:underline">{user.email}</a>
                    </Link>
                  </td>
                  <td className="border px-3 p-2">
                    {userDetails?.user?.role === "admin" ? (
                      <Button
                        variant={user?.is_active ? "danger-outline" : "success-outline"}
                        type="button"
                        size="xs"
                        onClick={() => {
                          if (userDetails?.user?.role === "admin")
                            handleCurrentUser("status", user);
                        }}
                      >
                        {user?.is_active ? "De-activate" : "Activate"}
                      </Button>
                    ) : (
                      <Button
                        variant={user?.is_active ? "success-outline" : "danger-outline"}
                        type="button"
                        size="xs"
                      >
                        {user?.is_active ? "Active" : "Inactive"}
                      </Button>
                    )}
                  </td>
                  <td className="border px-3 p-2">
                    <Button
                      variant="secondary"
                      type="button"
                      size="xs"
                      onClick={() => {
                        if (userDetails?.user?.role === "admin") handleCurrentUser("role", user);
                      }}
                      className="capitalize"
                    >
                      {filterRoleTitle(user?.role)}
                    </Button>
                  </td>
                  {/* <td className="border px-3 p-2">
                    <Button
                      variant="secondary"
                      type="button"
                      size="xs"
                      onClick={() => handleCurrentUser("assessment-enroll", user)}
                    >
                      Enroll
                    </Button>
                  </td> */}
                  <td className="border px-3 p-2">
                    <Link href={`/users/${user?.id}/assessment-enroll`}>
                      <a>
                        <Button variant="secondary" size="xs">
                          Enroll
                        </Button>
                      </a>
                    </Link>
                  </td>
                  {userDetails?.user?.role !== "tutor" && (
                    <>
                      {" "}
                      <td className="border px-3 p-2">
                        {user?.role === "user" ? (
                          <Link href={`/users/${user?.id}/manager-allocation`}>
                            <a>
                              <Button variant="secondary" size="xs">
                                Allocate
                              </Button>
                            </a>
                          </Link>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="border px-3 p-2">
                        <Button
                          variant="secondary"
                          type="button"
                          size="xs"
                          onClick={() => handleCurrentUser("edit", user)}
                        >
                          Edit
                        </Button>
                      </td>
                    </>
                  )}
                  {userDetails?.user?.role === "admin" && (
                    <td className="border px-3 p-2">
                      <Button
                        variant="secondary"
                        type="button"
                        size="xs"
                        onClick={() => handleCurrentUser("password", user)}
                      >
                        Update
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default AdminUserView;
