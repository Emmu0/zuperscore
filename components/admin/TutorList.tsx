import React from "react";

const TutorList = () => {
  return (
    <div className="flex-col border border-gray-200 bg-white w-[60%] p-2 mt-3">
      <div className="ml-2 text-xl font-medium">Tutors</div>
      <div className="flex items-center px-4 py-2 bg-white">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src="/images/default.jpg" alt="Profile Picture" />
        </div>
        <div className="ml-4 flex-grow">
          <div className="text-lg font-semibold text-gray-800">John Doe</div>
          <div className="text-gray-600">Subject Name</div>
        </div>
        <div className="flex-col">
          <div className="text-violet-100 font-medium">100</div>
          <div className="text-gray-600 text-sm font-normal ">Students</div>
        </div>
      </div>
    </div>
  );
};

export default TutorList;
