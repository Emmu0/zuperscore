import React from "react";
// components
import ReactHookTextarea from "@components/forms/ReactHookTextarea";
// cookie
import { getAuthenticationToken } from "@lib/cookie";

interface ISectionForm {
  register: any;
  setValue?: any;
  watch?: any;
  validations?: any;
  errors?: any;
  control?: any;
  reset?: any;
  userDetail?: any;
  getValues?: any;
  setDisplayPage: any;
  disabled?: boolean;
}

const ProfileSpecialRequests: React.FC<ISectionForm> = ({
  register,
  setValue,
  watch,
  validations,
  reset,
  errors,
  control,
  userDetail,
  getValues,
  setDisplayPage,
  disabled = false,
}) => {
  const [userDetails, setUserDetails] = React.useState<any>();
  React.useEffect(() => {
    let userToken: any = getAuthenticationToken();
    userToken = userToken ? JSON.parse(userToken) : null;
    setUserDetails(userToken);
  }, []);

  React.useEffect(() => {
    setDisplayPage(null)
  }, [])
  return (
    <div className="border border-gray-200 bg-white py-3 px-4" >
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <ReactHookTextarea
            label="Student Comments"
            type="text-area"
            name="student_comments"
            rows="2"
            register={register}
            disabled={disabled}
          />
        </div>
        {userDetails?.user?.role != "user" && (<>
          <div className="w-full">
            <ReactHookTextarea
              label="Parents Comments — SSO"
              type="text"
              rows="2"
              name="parents_comments"
              register={register}
              disabled={disabled}
            />
          </div>
          <div className="w-full">
            <ReactHookTextarea
              label="SSO Comments — SSO"
              type="email"
              name="sso_comments"
              rows="2"
              register={register}
              disabled={disabled}
            />
          </div>
          <div className="w-full">
            <ReactHookTextarea
              label="BD Comments — Enquiry"
              type="email"
              name="bd_comments_enquiry"
              rows="2"
              register={register}
              disabled={disabled}
            />
          </div>
        </>)}
      </div>
    </div>
  );
};
export default ProfileSpecialRequests;
