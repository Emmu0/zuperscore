import React from "react";
// next imports
import { NextPage } from "next";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
// components
import Button from "@components/buttons";
import AdminHeader from "@components/admin/AdminHeader";
import CalendarComponent from "@components/calendar/CalendarComponent";
import ViewToggle from "@components/calendar/ViewToggle";
import { ScheduleClassModal } from "@components/calendar/ScheduleEditClassModal";

// hoc
import authWrapper from "@lib/hoc/authWrapper";

const seoMetaInformation = {
  title: "Admin Calendar",
};

const AdminCalendar: NextPage = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [calendarView, setCalendarView] = React.useState<"month" | "week">("month");
  const [isModal, setIsModal] = React.useState<boolean>(false);
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout>
        <AdminHeader
          title={date.toLocaleString("default", { month: "long" }) + " " + date.getFullYear()}
          description="Calendar"
          button={
            <div className=" mt-8 flex justify-end items-center">
              <div className="mr-4">
                <ViewToggle calendarView={calendarView} setCalendarView={setCalendarView} />
              </div>
              <div>
                <Button onClick={() => setIsModal(true)}>Schedule Class</Button>
              </div>
            </div>
          }
        />
        <div>
          <div className="my-4">
            <CalendarComponent view={calendarView} />
          </div>
        </div>
        <ScheduleClassModal isModal={isModal} setIsModal={setIsModal} />
      </AdminLayout>
    </Container>
  );
};

export default authWrapper(AdminCalendar, { authRequired: true });
