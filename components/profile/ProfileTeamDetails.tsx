import React from "react";
import ProfileCard from "./ProfileCard";

const ProfileTeamDetails = ({ userDetail, setDisplayPage }: any) => {
  React.useEffect(() => {
    setDisplayPage("Zuperscore Team");
  }, []);
  return (
    <div className="space-y-4">
      <div className=" rounded-sm shadow-sm">
        <div className="">
          <div className="w-full space-y-3">
            {userDetail?.manager_details?.sso_managers?.length === 0 && (
              <div className="text-center text-gray-400 py-4">No Data found</div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {userDetail && userDetail?.manager_details?.sso_managers?.length > 0 && (
                <div className="flex-col space-y-2 items-center p-3 relative h-fit">
                  <div className="text-gray-600 text-sm font-medium ">Your SSO: </div>
                  <div className="flex-col space-y-4 font-medium overflow-auto">
                    {userDetail?.manager_details?.sso_managers?.map((sso: any, index: any) => (
                      <ProfileCard user={sso} key={index} />
                    ))}
                  </div>
                </div>
              )}
              {userDetail && userDetail?.manager_details?.prep_managers?.length > 0 && (
                <div className="flex-col space-y-2 items-center p-3 relative h-fit ">
                  <div className="text-gray-600 text-sm font-medium ">Your Prep Managers:</div>
                  <div className="flex-col space-y-4 font-medium overflow-auto">
                    {userDetail?.manager_details?.prep_managers?.map((prep: any, index: any) => (
                      <ProfileCard user={prep} key={index} />
                    ))}
                  </div>
                </div>
              )}
              {userDetail && userDetail?.manager_details?.ops_managers?.length > 0 && (
                <div className="flex-col space-y-2 items-center p-3 relative h-fit ">
                  <div className="text-gray-600 text-sm font-medium ">Your Ops Managers:</div>
                  <div className="flex-col space-y-4 font-medium overflow-auto">
                    {userDetail?.manager_details?.ops_managers?.map((ops: any, index: any) => (
                      <ProfileCard user={ops} key={index} />
                    ))}
                  </div>
                </div>
              )}
              {userDetail && userDetail?.manager_details?.english_tutors?.length > 0 && (
                <div className="flex-col space-y-2 items-center p-3 relative h-fit ">
                  <div className="text-gray-600 text-sm font-medium ">Your English Tutors:</div>
                  <div className="flex-col space-y-4 font-medium overflow-auto">
                    {userDetail?.manager_details?.english_tutors?.map((tutor: any, index: any) => (
                      <ProfileCard user={tutor} key={index} />
                    ))}
                  </div>
                </div>
              )}
              {userDetail && userDetail?.manager_details?.math_tutors?.length > 0 && (
                <div className="flex-col space-y-2 items-center p-3 relative h-fit ">
                  <div className="text-gray-600 text-sm font-medium ">Your Math Tutors:</div>
                  <div className="flex-col space-y-4 font-medium overflow-auto">
                    {userDetail?.manager_details?.math_tutors?.map((tutor: any, index: any) => (
                      <ProfileCard user={tutor} key={index} />
                    ))}
                  </div>
                </div>
              )}

              {userDetail && userDetail?.manager_details.escalated_matrix && (
                <div className="flex gap-2 items-center">
                  <div className="text-gray-600 text-sm font-medium ">Escalated Matrix:</div>
                  <div className="font-medium">-</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTeamDetails;
