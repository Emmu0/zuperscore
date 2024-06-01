import React from "react";
// seo
import Container from "@components/Container";
// layout
import AdminLayout from "@layouts/AdminLayout";
import { GlobeIcon } from "@heroicons/react/solid";

const seoMetaInformation = {
  title: "Admin Dashboard",
};

const Design = () => {
  return (
    <Container meta={seoMetaInformation}>
      <AdminLayout padding={false}>
        <div className="p-5">
          <h2 className="text-xl font-medium mb-4">Availability Settings</h2>
          <section className="p-8 bg-white border border-gray-300">
            <h4 className="font-medium">Date Range</h4>
            <p className="text-sm text-gray-400">
              Set a range of dates when you can accept meetings
            </p>
            <div className="mt-4">
              <h6 className="text-sm font-medium">Students can schedule...</h6>
              <div className="mt-3">
                <div className="flex items-center">
                  <input type="radio" name="schedule" />
                  <input
                    type="text"
                    className="border border-gray-300 outline-none ml-2 text-center w-8 text-xs p-1 rounded"
                  />
                  <select className="border border-gray-300 outline-none ml-2 text-xs p-1 rounded">
                    <option value="calendar days">calendar days</option>
                  </select>
                  <span className="ml-2 text-xs">into the future</span>
                </div>
                <div className="flex items-center mt-3">
                  <input type="radio" name="schedule" />
                  <span className="ml-2 text-xs">Within a date range</span>
                </div>
                <div className="flex items-center mt-3">
                  <input type="radio" name="schedule" />
                  <span className="ml-2 text-xs">Indefinitely into the future</span>
                </div>
              </div>
            </div>
          </section>
          <section className="p-8 bg-white border border-gray-300 border-t-0">
            <h4 className="font-medium">Duration</h4>
            <p className="text-sm text-gray-400">
              Define how long your event will be. It can be as long as 12 hours.
            </p>
            <div className="mt-4">
              <select className="border border-gray-300 outline-none text-xs p-2 w-4/12 rounded">
                <option value="">Choose an option</option>
              </select>
            </div>
          </section>
          <section className="p-8 bg-white border border-gray-300 border-t-0">
            <h4 className="font-medium">
              How do you want to offer your availability for this event type?
            </h4>
            <p className="text-sm text-gray-400">
              Select one of your schedules or define custom hours specific to this type of event.
            </p>
            <div>Hello</div>
            <h4 className="font-medium mt-8">
              Which schedule do you want to use for this event type?
            </h4>
            <select className="border border-gray-300 outline-none text-xs p-2 w-4/12 rounded mt-2">
              <option value="">Working Hours</option>
            </select>
            <div className="mt-8 text-sm flex items-center">
              <GlobeIcon className="h-5 w-5 mr-1" />
              Indian Standard Time
            </div>
            <div className="grid grid-cols-12 border border-gray-300 mt-2">
              <div className="col-span-7 py-4 px-5">
                <h6 className="text-xs font-medium">WEEKLY HOURS</h6>
                <div className="mt-6 grid grid-cols-[5rem_auto] gap-y-3 items-center text-xs">
                  <span className="font-medium">SUN</span>
                  <span className="text-gray-400">Unavailable</span>
                  <span className="font-medium">MON</span>
                  <span>9:00am - 5:00pm</span>
                  <span className="font-medium">TUE</span>
                  <span>9:00am - 5:00pm</span>
                  <span className="font-medium">WED</span>
                  <span>9:00am - 5:00pm</span>
                  <span className="font-medium">THU</span>
                  <span>9:00am - 5:00pm</span>
                  <span className="font-medium">FRI</span>
                  <span>9:00am - 5:00pm</span>
                  <span className="font-medium">SAT</span>
                  <span className="text-gray-400">Unavailable</span>
                </div>
              </div>
              <div className="col-span-5 border border-l-gray-300 border-y-0 border-r-0 py-4 px-5">
                <h6 className="text-xs font-medium">DATE OVERRIDES</h6>
                <p className="mt-6 text-xs text-gray-400">
                  To override your hours on specific dates, update your schedule under Availability
                </p>
              </div>
            </div>
          </section>
          <section className="p-8 bg-white border border-gray-300 border-t-0">
            <h4 className="font-medium">Want to add time before or after your events?</h4>
            <p className="text-sm text-gray-400">
              Give yourself some buffer time to prepare for or wrap up from booked Calendly events.
            </p>
            <div className="mt-4">
              <div className="flex items-start">
                <input type="checkbox" className="mt-1" />
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-400 mb-2">Before event</div>
                  <select className="border border-gray-300 outline-none text-xs p-2 w-[20rem] rounded">
                    <option value="">Choose an option</option>
                  </select>
                </div>
              </div>
              <div className="flex items-start mt-8">
                <input type="checkbox" className="mt-1" />
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-400 mb-2">After event</div>
                  <select className="border border-gray-300 outline-none text-xs p-2 w-[20rem] rounded">
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      </AdminLayout>
    </Container>
  );
};

export default Design;
