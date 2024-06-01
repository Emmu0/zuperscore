import React from "react";
// next import
import { useRouter } from "next/router";
// components
import Button from "@components/buttons";
import SearchFilter from "@components/filters/SelectSearchFilter";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

interface IUserSearchFilter {
  assessment_id: any;
  assessmentUsers: any;
  searchUser: any;
  handleSearchUser?: any;
}

const UserSearchFilter: React.FC<IUserSearchFilter> = ({
  assessment_id,
  assessmentUsers,
  searchUser,
  handleSearchUser,
}) => {
  const router = useRouter();
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [user, setUser] = React.useState<any>(null);
  const [userListOptions, setUserListOptions] = React.useState<any>(null);

  const handleSearch = () => {
    if (user) {
      setUser(user);
      handleSearchUser(user);
      if (assessment_id)
        router.replace(`/assessments/${assessment_id}/sessions?user_id=${user}`, undefined, {
          shallow: true,
        });
    } else {
      handleAlert("warning", "Empty User", "Please select the user to continue searching.");
    }
  };
  const handleClear = () => {
    setUser(null);
    handleSearchUser(null);
    if (assessment_id)
      router.replace(`/assessments/${assessment_id}/sessions`, undefined, {
        shallow: true,
      });
  };

  React.useEffect(() => {
    if (assessmentUsers && assessmentUsers.length > 0) {
      let assessmentPayload: any = [];
      assessmentUsers.map((_user: any) => {
        assessmentPayload.push({
          key: _user?.id,
          title: `${_user?.first_name} ${_user?.last_name}`,
          data: _user,
        });
      });
      setUserListOptions(assessmentPayload);
    }
  }, [assessmentUsers]);

  React.useEffect(() => {
    if (searchUser && user === null) setUser([searchUser]);
  }, [searchUser, user]);

  return (
    <>
      {userListOptions && userListOptions.length > 0 && (
        <div className="flex items-center gap-2">
          <div>
            <SearchFilter
              placeHolder="Select User"
              options={userListOptions}
              selectedOptions={user ? [user] : null}
              handleOption={(_value: any, data: any) => {
                setUser(_value[0]);
              }}
              multiple={false}
              position="left"
            />
          </div>
          <div>
            <Button size={"xs"} onClick={handleSearch}>
              Search
            </Button>
          </div>
          <div>
            <Button variant="secondary" size={"xs"} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSearchFilter;
