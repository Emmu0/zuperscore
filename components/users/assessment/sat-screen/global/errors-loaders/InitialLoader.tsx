import React from "react";
// next imports
import Image from "next/image";

interface ITestInitialLoader {}

const TestInitialLoader: React.FC<ITestInitialLoader> = () => {
  return (
    <div className="w-full h-full space-y-8 flex flex-col justify-center items-center">
      <div className="text-2xl font-medium">We{"'"}re Preparing Your Test Exam</div>
      <div className="flex flex-col justify-center items-center gap-4 border border-gray-200 px-6 py-10 rounded shadow-lg">
        <Image src="/images/uploadIcon.svg" width={60} height={60} alt="assessment Loader" />
        <div className="">
          This may take upto a minute. please dont refresh the page or close the window.
        </div>
      </div>
    </div>
  );
};

export default TestInitialLoader;
