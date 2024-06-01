import React from "react";
import Image from "next/image";

const ProfileCard = ({ user }: any) => {
  return (
    <div className="flex border border-gray-200 bg-white rounded-md shadow-sm p-3 gap-4">
      <div className="w-32 h-32">
        <Image
          src={user?.profile_img ? user.profile_img : "/default_image.png"}
          className="rounded-lg"
          alt="brand-logo"
          width="200"
          height="200"
        />
      </div>

      <div className="flex-1 w-full space-y-2">
        <div className="flex gap-2 items-center ">
          <div className=" font-medium">Name :</div>
          <div className=" text-gray-600 capitalize">{user?.name}</div>
        </div>
        {user?.about && (
          <div className="gap-2 items-start">
            <div className="font-medium">Bio :</div>
            <div className=" text-gray-600 text-xs pt-0.5 text-justify ">{user?.about}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
