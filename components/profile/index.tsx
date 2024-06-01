import React from "react";
// headless ui
import { Tab } from "@headlessui/react";
// components
import AddressForm from "./ProfileAddress";
import TestDetails from "./ProfileTestResults";
import ParentDetailsForm from "./ProfileParentDetails";
import ProfileInformationForm from "./ProfileInformation";
import SchoolDetailsForm from "./ProfileSchoolDetails";
import ProfileReferenceForm from "./ProfileReference";
import ProfileSpecialRequests from "./ProfileSpecialRequests";
import ProfileGoalPostsAndDeadlines from "./ProfileGoalPostsAndDeadlines";
import ProfileHelp from "./ProfileHelp";
import ProfileTeamDetails from "./ProfileTeamDetails";
import ProfilePrepNavigationGuidelines from "./ProfilePrepNavigationGuidelines";

interface ISectionForm {
  register: any;
  setValue: any;
  watch: any;
  validations: any;
  errors: any;
  control: any;
  userDetail: any;
  reset: any;
  getValues: any;
  setDisplayPage: any;
  disabled?: boolean;
}

const ProfileForm: React.FC<ISectionForm> = ({
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
  let components = [
    {
      key: "profile",
      title: "Profile",
      component: (
        <ProfileInformationForm
          register={register}
          setValue={setValue}
          watch={watch}
          validations={validations}
          errors={errors}
          control={control}
          reset={reset}
          userDetail={userDetail}
          setDisplayPage={setDisplayPage}
          disabled={disabled}
        />
      ),
    },
    {
      key: "address",
      title: "Address",
      component: (
        <AddressForm
          register={register}
          setValue={setValue}
          watch={watch}
          validations={validations}
          errors={errors}
          control={control}
          reset={reset}
          userDetail={userDetail}
          setDisplayPage={setDisplayPage}
          disabled={disabled}
        />
      ),
    },
    {
      key: "school-details",
      title: "School Details",
      component: (
        <SchoolDetailsForm
          register={register}
          setValue={setValue}
          watch={watch}
          validations={validations}
          errors={errors}
          control={control}
          reset={reset}
          userDetail={userDetail}
          getValues={getValues}
          setDisplayPage={setDisplayPage}
          disabled={disabled}
        />
      ),
    },
    {
      key: "referred-by",
      title: "Referred By",
      component: (
        <ProfileReferenceForm
          register={register}
          setValue={setValue}
          watch={watch}
          validations={validations}
          errors={errors}
          control={control}
          reset={reset}
          userDetail={userDetail}
          setDisplayPage={setDisplayPage}
          disabled={disabled}
        />
      ),
    },
  ];
  if (userDetail.role === "user") {
    components.push(
      {
        key: "parent-details",
        title: "Parent Details",
        component: (
          <ParentDetailsForm
            register={register}
            setValue={setValue}
            watch={watch}
            validations={validations}
            errors={errors}
            control={control}
            reset={reset}
            userDetail={userDetail}
            setDisplayPage={setDisplayPage}
            disabled={disabled}
          />
        ),
      },
      {
        key: "test-score",
        title: "Test Score",
        component: (
          <TestDetails
            register={register}
            setValue={setValue}
            watch={watch}
            validations={validations}
            errors={errors}
            control={control}
            reset={reset}
            userDetail={userDetail}
            getValues={getValues}
            setDisplayPage={setDisplayPage}
            disabled={disabled}
          />
        ),
      },

      {
        key: "special-requests",
        title: "Special Requests",
        component: (
          <ProfileSpecialRequests
            register={register}
            setValue={setValue}
            watch={watch}
            validations={validations}
            errors={errors}
            control={control}
            reset={reset}
            userDetail={userDetail}
            setDisplayPage={setDisplayPage}
            disabled={disabled}
          />
        ),
      },
      {
        key: "prep-navigation-guidelines",
        title: "Prep navigation guidelines",
        component: (
          <ProfilePrepNavigationGuidelines
            register={register}
            setValue={setValue}
            watch={watch}
            validations={validations}
            errors={errors}
            control={control}
            reset={reset}
            userDetail={userDetail}
            getValues={getValues}
            setDisplayPage={setDisplayPage}
            disabled={disabled}
          />
        ),
      },
      {
        key: "goal-posts-and-deadlines",
        title: "Goal posts and Deadlines",
        component: (
          <ProfileGoalPostsAndDeadlines
            register={register}
            setValue={setValue}
            watch={watch}
            validations={validations}
            errors={errors}
            control={control}
            reset={reset}
            userDetail={userDetail}
            getValues={getValues}
            setDisplayPage={setDisplayPage}
            disabled={disabled}
          />
        ),
      },
      {
        key: "team-zuperscore",
        title: "Team Zuperscore",
        component: <ProfileTeamDetails userDetail={userDetail} setDisplayPage={setDisplayPage} />,
      },
      {
        key: "help",
        title: "Help",
        component: <ProfileHelp setDisplayPage={setDisplayPage} />,
      }
    );
  }
  return (
    <div className="w-full space-y-6">
      <Tab.Group defaultIndex={0}>
        <Tab.List className="flex flex-wrap gap-1 bg-white">
          {components.map((item) => (
            <Tab
              key={item.key}
              className={({ selected }) =>
                `px-3 py-1.5 text-sm uppercase font-medium rounded-sm focus:outline-none border border-gray-100 ${
                  selected
                    ? `border-violet-100 bg-violet-100 text-yellow-0`
                    : `hover:bg-violet-0 hover:border-violet-0 hover:text-violet-100`
                }`
              }
            >
              {item.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {components.map((item, idx) => (
            <Tab.Panel key={idx} className={`space-y-2`}>
              <div>{item.component}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProfileForm;
