import React from "react";
// icons
import BookmarkIcon from "@ui/icons/bookmarkIcon";
// constants
import { secondsTimerConversion } from "@constants/common";

interface IProps {
  block: any;
  result: any;
  status?: boolean;
}

const BlockPreviewHeader: React.FC<IProps> = ({ block, result, status = true }) => {
  return (
    <div>
      <div className="flex items-center text-sm gap-4 p-3 border-b border-gray-300">
        <div className="border border-violet-100 text-violet-100 rounded-sm px-1">
          {block?.type}
        </div>
        {status && (
          <>
            {result?.result?.is_visited && result?.result?.is_user_answered ? (
              <>
                {result?.result?.is_correct && result?.result?.is_user_answered ? (
                  <div className="text-sm border border-green-900 rounded-full px-2.5 py-0.5 text-green-900">
                    Correct
                  </div>
                ) : (
                  <div className="text-sm border border-red-900 rounded-full px-2.5 py-0.5 text-red-900">
                    Incorrect
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm border border-gray-600 rounded-full px-2.5 py-0.5 text-gray-600">
                Not Attempted
              </div>
            )}

            {result?.result?.time_taken && (
              <div className="font-medium text-sm border border-gray-300 rounded-full px-2.5 py-0.5">
                {secondsTimerConversion(result?.result?.time_taken?.total_time)}
              </div>
            )}

            <div className="ml-auto "></div>

            {result?.result?.is_visited && result?.result?.is_user_answered ? (
              <div className="text-sm border border-green-900 rounded-full px-2.5 py-0.5 text-green-900">
                Answered
              </div>
            ) : (
              <div className="text-sm border border-red-900 rounded-full px-2.5 py-0.5 text-red-900">
                Not Answered
              </div>
            )}

            {result?.result?.is_visited ? (
              <div className="text-sm border border-green-900 rounded-full px-2.5 py-0.5 text-green-900">
                Visited
              </div>
            ) : (
              <div className="text-sm border border-red-900 rounded-full px-2.5 py-0.5 text-red-900">
                Not Visited
              </div>
            )}
            <div>
              {result?.result?.is_bookmark ? (
                <BookmarkIcon width="18" height="18" />
              ) : (
                <BookmarkIcon width="18" height="18" fill="#808080" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlockPreviewHeader;
