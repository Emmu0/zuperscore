import React from "react";
// next imports
import Link from "next/link";
import { useRouter } from "next/router";
// ui icons imports
import DashboardIcon from "@ui/icons/dashboardIcon";
import TestIcon from "@ui/icons/testIcon";
import ScheduleIcon from "@ui/icons/scheduleIcon";
import ResultIcon from "@ui/icons/resultIcon";
import CommerceIcon from "@ui/icons/commerceIcon";
import PlatformIcon from "@ui/icons/platformIcon";
import SubjectIcon from "@ui/icons/subjectIcon";
import { LogoutIcon } from "@ui/icons";
import chartIcon from "@ui/icons/chartIcon";
// cookie
import { getAuthenticationToken, logout } from "@lib/cookie";
// constants
import { version } from "@constants/common";

const UserSideBar = ({}: any) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const navigationLinks = [
    {
      icon: DashboardIcon,
      key: "dashboard",
      title: "Dashboard",
      href: "/user/dashboard",
      children: [],
    },
    {
      icon: TestIcon,
      key: "tests",
      title: "Tests",
      href: "#",
      children: [
        {
          icon: "",
          key: "mock",
          title: "Mock",
          href: "/assessment/mock?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "sectional",
          title: "Sectional",
          href: "/assessment/sectional?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "micro",
          title: "Micro",
          href: "/assessment/micro?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "practice-sheet",
          title: "Practice Sheet",
          href: "/assessment/practice-sheet?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "diagnostic",
          title: "Diagnostic",
          href: "/assessment/diagnostic?type=upcoming",
          children: [],
        },
      ],
    },
    {
      icon: chartIcon,
      key: "my-performance",
      title: "My Performance",
      href: "#",
      children: [
        {
          icon: "",
          key: "strength-analytics",
          title: "Strength Analytics",
          href: "/user/strength-analytics",
          children: [],
        },
        {
          icon: "",
          key: "mistake-analytics",
          title: "Mistake Analytics",
          href: "/user/mistake-analytics",
          children: [],
        },
        {
          icon: "",
          key: "mistake-analysis",
          title: "Review Mistakes",
          href: "/user/mistake-analysis?assessment=last_five",
          children: [],
        },
      ],
    },
  ];
  const typistNavigationLinks = [
    {
      icon: DashboardIcon,
      key: "dashboard",
      title: "Dashboard",
      href: "/admin/dashboard",
      children: [],
    },
    {
      icon: SubjectIcon,
      key: "subjects",
      title: "Subjects",
      href: "/subjects",
      children: [],
    },
  ];

  const tutorNavigationLinks = [
    {
      icon: DashboardIcon,
      key: "dashboard",
      title: "Dashboard",
      href: "/admin/dashboard",
      children: [],
    },
    {
      icon: TestIcon,
      key: "tests",
      title: "Tests",
      href: "/assessment",
      children: [
        {
          icon: "",
          key: "mock",
          title: "Mock",
          href: "/assessment/mock?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "sectional",
          title: "Sectional",
          href: "/assessment/sectional?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "micro",
          title: "Micro",
          href: "/assessment/micro?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "practice-sheet",
          title: "Practice Sheet",
          href: "/assessment/practice-sheet?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "diagnostic",
          title: "Diagnostic",
          href: "/assessment/diagnostic?type=upcoming",
          children: [],
        },
      ],
    },
    {
      icon: PlatformIcon,
      key: "Users",
      title: "Users",
      href: "/users",
      children: [],
    },
    {
      icon: SubjectIcon,
      key: "test-report",
      title: "Test Report",
      href: "/report",
      children: [],
    },
    {
      icon: chartIcon,
      key: "my-performance",
      title: "Student Performance",
      href: "#",
      children: [
        {
          icon: "",
          key: "strength-analytics",
          title: "Strength Analytics",
          href: "/user-performance/strength-analytics",
          children: [],
        },
        {
          icon: "",
          key: "mistake-analytics",
          title: "Mistake Analytics",
          href: "/user-performance/mistake-analytics",
          children: [],
        },
        {
          icon: "",
          key: "mistake-analysis",
          title: "Review Mistakes",
          href: "/user-performance/mistake-analysis",
          children: [],
        },
      ],
    },
  ];

  const managerNavigationLinks = [
    {
      icon: DashboardIcon,
      key: "dashboard",
      title: "Dashboard",
      href: "/admin/dashboard",
      children: [],
    },
    {
      icon: TestIcon,
      key: "tests",
      title: "Tests",
      href: "/assessment",
      children: [
        {
          icon: "",
          key: "mock",
          title: "Mock",
          href: "/assessment/mock?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "sectional",
          title: "Sectional",
          href: "/assessment/sectional?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "micro",
          title: "Micro",
          href: "/assessment/micro?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "practice-sheet",
          title: "Practice Sheet",
          href: "/assessment/practice-sheet?type=upcoming",
          children: [],
        },
        {
          icon: "",
          key: "diagnostic",
          title: "Diagnostic",
          href: "/assessment/diagnostic?type=upcoming",
          children: [],
        },
      ],
    },
    {
      icon: TestIcon,
      key: "tests",
      title: "Tests",
      href: "/assessments?search=&kind=MOCK",
      children: [],
    },
    {
      icon: PlatformIcon,
      key: "Users",
      title: "Users",
      href: "/users",
      children: [],
    },
    {
      icon: SubjectIcon,
      key: "test-report",
      title: "Test Report",
      href: "/report",
      children: [],
    },
    {
      icon: chartIcon,
      key: "my-performance",
      title: "Student Performance",
      href: "#",
      children: [
        {
          icon: "",
          key: "strength-analytics",
          title: "Strength Analytics",
          href: "/user-performance/strength-analytics",
          children: [],
        },
        {
          icon: "",
          key: "mistake-analytics",
          title: "Mistake Analytics",
          href: "/user-performance/mistake-analytics",
          children: [],
        },
        {
          icon: "",
          key: "mistake-analysis",
          title: "Review Mistakes",
          href: "/user-performance/mistake-analysis",
          children: [],
        },
      ],
    },
  ];

  const renderNavigationLinks = () => {
    let returnNavigation: any = navigationLinks;

    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    if (userToken && userToken?.user && userToken?.user?.role) {
      let role = userToken?.user?.role;
      if (role === "typist") returnNavigation = typistNavigationLinks;
      if (role === "tutor") returnNavigation = tutorNavigationLinks;
      if (role === "manager") returnNavigation = managerNavigationLinks;
      return returnNavigation;
    }
    return navigationLinks;
  };
  const currentActiveState = (href: any) => {
    let returnState = false;
    if (href.includes(currentRoute)) returnState = true;
    return returnState;
  };

  const LinkWrapper = ({ children, element, href }: any) => {
    return (
      <>
        {element && element?.children && element?.children.length > 0 ? (
          <>{children}</>
        ) : (
          <Link href={href}>
            <a>{children}</a>
          </Link>
        )}
      </>
    );
  };

  return (
    <div className="w-full h-full bg-violet-100 flex flex-col overflow-y-auto">
      {/* header */}
      <div className="flex-shrink-0 h-[60px] px-5 flex items-center text-yellow-0 font-medium text-2xl">
        Zuperscore
      </div>

      {/* navigation items */}
      <div className="w-full h-full px-5 py-5">
        {renderNavigationLinks().map((navItem: any, index: any) => (
          <div key={index} className="py-2">
            {/* navigation item */}

            <LinkWrapper element={navItem} href={navItem?.href}>
              <div className="flex gap-2 items-center py-1 group cursor-pointer">
                <div className="flex-shrink-0 w-[24px] h-[24px] flex justify-center items-center">
                  {navItem.icon && <navItem.icon width="16" height="16" fill="#CC96AE" />}
                </div>
                <div
                  className={`w-full text-violet-0 group-hover:text-yellow-100 ${
                    currentActiveState(navItem?.href) && `text-yellow-100`
                  }`}
                >
                  {navItem?.title}
                </div>
              </div>
            </LinkWrapper>

            {navItem && navItem?.children && navItem?.children.length > 0 && (
              <>
                {navItem?.children.map((navChild: any, childIndex: any) => (
                  <div key={childIndex}>
                    <Link href={navChild?.href}>
                      <a>
                        <div className="flex gap-2 items-center py-1.5 group cursor-pointer">
                          <div className="flex-shrink-0 w-[24px] h-[24px] flex justify-center items-center">
                            {navChild.icon && (
                              <navChild.icon width="10" height="10" fill="#000000" />
                            )}
                          </div>
                          <div
                            className={`w-full text-violet-0 group-hover:text-yellow-100 ${
                              currentActiveState(navChild?.href) && `text-yellow-100`
                            }`}
                          >
                            {navChild?.title}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div className="w-full px-5 py-2">
        <Link href={`/user/my-profile`} className="hover:underline">
          <a>
            <div className="flex gap-2 items-center py-1 group cursor-pointer">
              <div className="flex-shrink-0 w-[24px] h-[24px] flex justify-center items-center">
                <PlatformIcon width="16" height="16" fill="#CC96AE" />
              </div>
              <div
                className={`w-full text-violet-0 group-hover:text-yellow-100 ${
                  currentActiveState(`/user/my-profile`) && `text-yellow-100`
                }`}
              >
                Profile
              </div>
            </div>
          </a>
        </Link>
      </div>
      <div className="w-full px-5 py-2">
        <div className="flex gap-2 items-center py-1 group cursor-pointer" onClick={() => logout()}>
          <div className="flex-shrink-0 w-[24px] h-[24px] flex justify-center items-center rotate-90">
            <LogoutIcon width="16" height="16" fill="#CC96AE" />
          </div>
          <div
            className={`w-full text-violet-0 group-hover:text-yellow-100 flex justify-between items-center`}
          >
            <div className="">Logout</div>
            <div className="text-xs">V {version}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
