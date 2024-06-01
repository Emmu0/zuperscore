import React from "react";
// recoil
import { useRecoilState } from "recoil";
// components
import Button from "../helpers/button";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const GlobalBottomNavigation = () => {
  const [loaders, recoilLoaders] = useRecoilState(assessmentRecoil.loadersSelector);
  const [assessmentDefault, recoilAssessmentDefault] = useRecoilState(
    assessmentRecoil.assessmentDefaultSelector
  );

  const handleOnlineCurrentView = () => {
    recoilAssessmentDefault({
      type: "update",
      data: {
        routeRestriction: false,
        onlineCurrentView: "TEST",
      },
    });
  };

  return (
    <div className="container mx-auto flex h-full w-full items-center justify-end px-10">
      <Button
        variant="primary"
        onClick={handleOnlineCurrentView}
        disabled={loaders?.sectionLoader || false}
      >
        Next
      </Button>
    </div>
  );
};

export default GlobalBottomNavigation;
