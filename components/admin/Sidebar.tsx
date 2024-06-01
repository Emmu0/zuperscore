import React, { useState } from "react";
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
import AssessmentCreateEdit from "./assessments/CreateEdit";
import ConfigPopup from "@components/zoom@Config/ConfigPopup";

const AdminSideBar = ({}: any) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const navigationLinks = [
    {
      icon: DashboardIcon,
      key: "dashboard",
      title: "Dashboard",
      href: "/admin/dashboard",
      children: [],
    },
    {
      icon: ScheduleIcon,
      key: "Registration",
      title: "Registration",
      href: "/admin/registration",
      children: [],
    },
    // {
    //   icon: ScheduleIcon,
    //   key: "Zoom@Confiq",
    //   title: "Zoom@Confiq",
    //   href: "",
    //   children: [],
    // },
    {
      icon: SubjectIcon,
      key: "subjects",
      title: "Subjects",
      href: "/subjects",
      children: [],
    },
    {
      icon: TestIcon,
      key: "tests",
      title: "Tests",
      href: "/assessments?kind=MOCK",
      children: [
        // {
        //   icon: "",
        //   key: "assessments",
        //   title: "Assessments",
        //   href: "/admin/assessments",
        //   children: [],
        // },
        // {
        //   icon: "",
        //   key: "question-tags",
        //   title: "Question Tags",
        //   href: "/admin/question-tags",
        //   children: [],
        // },
      ],
    },
    // {
    //   icon: ScheduleIcon,
    //   key: "schedules",
    //   title: "Schedules",
    //   href: "/admin/schedules/calendar",
    //   children: [
    //     {
    //       icon: "",
    //       key: "calendar",
    //       title: "Calendar",
    //       href: "/admin/schedules/calendar",
    //       children: [],
    //     },
    //     {
    //       icon: "",
    //       key: "requests",
    //       title: "Requests",
    //       href: "/admin/schedules/requests",
    //       children: [],
    //     },
    //   ],
    // },
    // {
    //   icon: ResultIcon,
    //   key: "results",
    //   title: "Results",
    //   href: "/admin/results",
    //   children: [],
    // },
    // {
    //   icon: CommerceIcon,
    //   key: "commerce",
    //   title: "Commerce",
    //   href: "/admin/products",
    //   children: [
    //     { icon: "", key: "products", title: "Products", href: "/admin/products", children: [] },
    //     {
    //       icon: "",
    //       key: "coupons",
    //       title: "Coupons",
    //       href: "/admin/products/coupons",
    //       children: [],
    //     },
    //   ],
    // },
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
    // {
    //   icon: PlatformIcon,
    //   key: "platform",
    //   title: "Platform",
    //   href: "/admin/users",
    //   children: [
    //     {
    //       icon: "",
    //       key: "enrolled-users",
    //       title: "Enrolled Users",
    //       href: "/admin/enrolled-users",
    //       children: [],
    //     },
    //     { icon: "", key: "users", title: "Users", href: "/admin/users", children: [] },
    //     { icon: "", key: "contacts", title: "Contacts", href: "/admin/contacts", children: [] },
    //   ],
    // },
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
    {
      icon: SubjectIcon,
      key: "test-allocation",
      title: "Test Allocation",
      href: "#",
      children: [
        {
          icon: "",
          key: "allocate-test",
          title: "Allocate Test",
          href: "/admin/allocate-test",
          children: [],
        },
        {
          icon: "",
          key: "practice-sets",
          title: "Practice Sets",
          href: "/admin/practice-sheets/",
          children: [],
        },
        {
          icon: "",
          key: "student-groups",
          title: "Student Groups",
          href: "/admin/student-groups/",
          children: [],
        },
      ],
    },
    {
      icon: chartIcon,
      key: "Mother Session",
      title: "Mother Session",
      href: "#",
      children: [
        {
          icon: "",
          key: "Session",
          title: "Session",
          href: "/admin/mother-session/session",
          children: [],
        },
        {
          icon: "",
          key: "Chapters",
          title: "Chapters",
          href: "/admin/mother-session/chapter",
          children: [],
        },
        {
          icon: "",
          key: "Module",
          title: "Module",
          href: "/admin/mother-session/module_m",
          children: [],
        },
        {
          icon: "",
          key: "Topic",
          title: "Topic",
          href: "/admin/mother-session/topic",
          children: [],
        },
      ],
    },
    {
      icon: DashboardIcon,
      key: "Zoom",
      title: "Zoom",
      href: "/admin/zoom",
      children: [],
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
    // {
    //   icon: TestIcon,
    //   key: "tests",
    //   title: "Tests",
    //   href: "/assessments?search=&kind=MOCK",
    //   children: [],
    // },
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
    }

    return returnNavigation;
  };

  const handleClick = (e: any, path: any) => {
       router.push(`${path}#${e}`)
   };
 

  const currentActiveState = (href: any) => {
    let returnState = false;
    if (href === currentRoute) returnState = true;
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
      <div className="w-full h-4/5 px-5 py-5 overflow-y-auto">
        {renderNavigationLinks().map((navItem: any, index: any) => (
          <div key={navItem?.key} className="py-2" >
            {/* navigation item */}
            <div>
              <div className="flex gap-2 items-center py-1 group cursor-pointer" id={index+"main"} onClick={()=>handleClick(index+"main",navItem?.href)}>
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
            </div>

            {navItem && navItem?.children && navItem?.children.length > 0 && (
              <>
                {navItem?.children.map((navChild: any, childIndex: any) => (
                  <div key={navChild?.key}>
                    <div onClick={()=>handleClick(index+"main",navChild?.href)}>
                      <a>
                        <div className="flex gap-2 items-center py-1.5 group cursor-pointer" >
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
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      {/* bottom bar */}
  <div className="w-full px-5 py-2">
        <Link href={`/admin/my-profile`}>
          <a>
            <div className="flex gap-2 items-center py-1 group cursor-pointer">
              <div className="flex-shrink-0 w-[24px] h-[24px] flex justify-center items-center">
                <PlatformIcon width="16" height="16" fill="#CC96AE" />
              </div>
              <div
                className={`w-full text-violet-0 group-hover:text-yellow-100 ${
                  currentActiveState(`/admin/my-profile`) && `text-yellow-100`
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
          <div className={`w-full text-violet-0 group-hover:text-yellow-100`}>Logout</div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminSideBar;
