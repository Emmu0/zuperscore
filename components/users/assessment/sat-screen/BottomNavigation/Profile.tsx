import React from "react";
// recoil
import { useRecoilValue} from "recoil";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const Profile = () => {
  const profile = useRecoilValue(assessmentRecoil.profileSelector);

  return (
    <div className="text-xl font-medium">
      {profile?.first_name} {profile?.last_name}
    </div>
  );
};

export default Profile;
