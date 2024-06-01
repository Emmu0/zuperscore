import React, { useState } from "react";
// next imports
import Image from "next/image";
// ui icons
import NotificationIcon from "@ui/icons/notificationIcon";
import SearchIcon from "@ui/icons/searchIcon";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

const AdminTopBar = ({}: any) => {
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user) {
      setUser(userToken?.user);
    }
  }, [setUser]);
  const [open, setopen] = useState(false);
  const profileHandler = (vl: any) => {
    setopen(vl);
  };

  return (
    <div className="h-full container mx-auto flex items-center gap-3 px-5">
      <div className="w-full h-full flex items-center gap-3">
        <SearchIcon width="18" height="18" />
        <input type="search" placeholder="Search" className="outline-none w-full h-full" />
      </div>

      <div className="flex-shrink-0 w-[20px] h-[20px] text-[#8F939B] text-md">
        <NotificationIcon width="18" height="18" />
      </div>

      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => profileHandler(!open)}
            type="button"
            id="menu-button"
            className="flex-shrink-0 relative w-[40px] h-[40px] collapse"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <Image
              src={user?.profile_img ? user.profile_img : "/images/default.jpg"}
              className="w-full h-full object-cover rounded-full"
              layout="fill"
              alt="user"
            />
          </button>
        </div>
        {open && (
          <div
            className="absolute right-0 z-auto mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-0"
              >
                Account settings
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-1"
              >
                Support
              </a>
              <a
                href="#"
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-2"
              >
                License
              </a>
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="flex-shrink-0 relative w-[40px] h-[40px]"></div>
    </div>
  );
};

export default AdminTopBar;
