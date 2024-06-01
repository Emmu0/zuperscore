import React from "react";

const GeneralInstructions: React.FC = () => {
  return (
    <div className="md:px-0 container mx-auto w-full py-20 px-5">
      <div className="mx-auto w-[460px] space-y-6 flex flex-col justify-center">
        <div className="text-3xl font-medium text-center">SAT Practice Test</div>

        <div className="border border-gray-200 shadow bg-white rounded p-6 py-12 space-y-5">
          <div className="flex gap-5">
            <div className="flex-shrink-0 border-gray-200 rounded-full bg-gray-200 w-[40px] h-[40px]"></div>
            <div>
              <div className="text-xl font-medium mb-2">Timing</div>
              <div className="text-sm">
                This full-length practice test is timed like the real SAT, but you can pause any
                time by selecting <b>Save and Exit</b> from the <b>More</b> menu. You can also move
                from one section to the next before time expires.
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 border-gray-200 rounded-full bg-gray-200 w-[40px] h-[40px]"></div>
            <div>
              <div className="text-xl font-medium mb-2">Scores</div>
              <div className="text-sm">
                When you finish the practice test, go to <b>My SAT</b> to see your scores and get
                personalized study tips.
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 border-gray-200 rounded-full bg-gray-200 w-[40px] h-[40px]"></div>
            <div>
              <div className="text-xl font-medium mb-2">Assistive Technology</div>
              <div className="text-sm">
                If you use assistive technology, you should try it out on the practice test so you
                know what to expect on test day.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInstructions;
