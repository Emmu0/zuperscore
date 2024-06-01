import React from "react";
// next imports
import Image from "next/image";
// recoil
import { useRecoilValue } from "recoil";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

interface IGlobalInstructions {}

const GlobalInstructions: React.FC<IGlobalInstructions> = () => {
  const assessment = useRecoilValue(assessmentRecoil.assessmentSelector);
  const profile = useRecoilValue(assessmentRecoil.profileSelector);
  return (
    <div>
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        <div className="flex-grow overflow-y-auto px-5">
          <div className="h-full w-full flex flex-col justify-center items-center gap-4">
            <div className="text-3xl font-semibold">{assessment?.name || "SAT"} Practice Test</div>

            <div className="shadow-lg flex flex-col justify-center items-center px-16 py-8 w-[800px]">
              <div className="py-2">
                <div className="w-full text-xl font-bold py-2">Timing</div>
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente laborum
                  cupiditate possimus labore, hic temporibus velit dicta earum suscipit commodi eum
                  enim atque at? Et perspiciatis dolore iure voluptatem.
                </div>
              </div>

              <div className="py-2">
                <div className="w-full text-xl font-bold py-2">Scores</div>
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente laborum
                  cupiditate possimus labore, hic temporibus velit dicta earum suscipit commodi eum
                  enim atque at? Et perspiciatis dolore iure voluptatem.
                </div>
              </div>
              <div className="py-2">
                <div className="w-full text-xl font-bold py-2">Assistive Technology</div>
                <div className="flex justify-between items-center">
                  <div className=" py-2 mr-4">
                    <Image height="100" width="100" src="/images/uploadIcon.svg" />
                  </div>
                  <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente laborum
                    cupiditate possimus labore, hic temporibus velit dicta earum suscipit commodi
                    eum enim atque at? Et perspiciatis dolore iure voluptatem.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[70px] flex-shrink-0 border-0 px-5 gap-4">
        <div className="  flex gap-4 py-4 px-16">
          {profile?.user?.first_name || "First"} {profile?.user?.last_name || "Last"}
        </div>
      </div>
    </div>
  );
};

export default GlobalInstructions;
