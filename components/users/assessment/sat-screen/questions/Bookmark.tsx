import React from "react";
// recoil
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// icons
import BookmarkIcon from "@ui/icons/bookmarkIcon";
// recoil state management
import * as assessmentRecoil from "recoil/assessments/index";

const Bookmark = () => {
  const recoilAttemptSet = useSetRecoilState(assessmentRecoil.attemptSelector);

  const [currentAttempt, recoilCurrentAttemptSet] = useRecoilState(
    assessmentRecoil.currentAttemptSelector
  );

  const handleIsBookmark = () => {
    recoilCurrentAttemptSet({
      ...currentAttempt,
      is_bookmark: !currentAttempt?.is_bookmark,
    });

    recoilAttemptSet({
      type: "update",
      data: {
        ...currentAttempt,
        is_bookmark: !currentAttempt?.is_bookmark,
      },
    });
  };
  return (
    <div
      className="flex items-center gap-2 whitespace-nowrap cursor-pointer"
      onClick={() => handleIsBookmark()}
    >
      {currentAttempt?.is_bookmark ? (
        <BookmarkIcon width="20" height="24" />
      ) : (
        <BookmarkIcon width="20" height="24" fill="#808080" />
      )}
      <div className={`${currentAttempt?.is_bookmark ? `font-semibold` : ``}`}>Mark for Review</div>
    </div>
  );
};

export default Bookmark;
