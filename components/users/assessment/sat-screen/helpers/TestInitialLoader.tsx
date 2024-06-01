import React from "react";
// next imports
import Image from "next/image";

interface ITestInitialLoader {}

const TestInitialLoader: React.FC<ITestInitialLoader> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 border border-gray-200 p-8 rounded shadow-lg">
        <div className="text-2xl font-semibold">We are preparing test for you. Please Wait!</div>
        <Image src="/images/uploadIcon.svg" width={60} height={60} alt="assessment Loader" />
        <div className="">
          This may take upto a minute please dont refresh the page or exit the app.
        </div>
      </div>
    </div>
  );
};

export default TestInitialLoader;
