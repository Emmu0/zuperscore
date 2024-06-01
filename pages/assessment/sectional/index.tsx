import React from "react";
// next imports
import { NextPage } from "next";
import { useRouter } from "next/router";
// swr
import useSWR from "swr";
// layouts
import UserDefaultLayout from "@layouts/UserDefaultLayout";
// components
import Pagination from "@components/utilities/Pagination";
import SessionTab from "@components/users/assessment/Cards/SessionTab";
import SessionCard from "@components/users/assessment/Cards/SessionCard";
import Button from "@components/buttons";
import ReactHookInput from "@components/forms/ReactHookInput";
// common
import { datePreview, calendarMonths, calendarDays, bindZero } from "@constants/common";
// api routes
import { USER_ASSESSMENT_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
// hoc
import authWrapper from "lib/hoc/authWrapper";
// hook
import { useForm } from "react-hook-form";

type Inputs = {
  search: string;
};
let defaultValues: Inputs = {
  search: "",
};
const Assessments: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
    },
  });
  const { type: assessmentType } = router.query;
  const [query, setQuery] = React.useState<any>();

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const [buttonClearLoader, setButtonClearLoader] = React.useState(false);

  const handleSearchUser = async (data: any) => {
    if (data?.search.length >= 3) {
      setButtonLoader(true);
      setQuery(data?.search);
      setButtonLoader(false);
    } else {
      alert("Search term must be at least 3 characters long.");
    }
  };
  const handleClearSearch = async () => {
    setButtonClearLoader(true);
    setValue("search", "");
    setQuery(null);
    setButtonClearLoader(false);
  };
  const assessmentKind = "SECTIONAL";

  const perPage = 10;
  const [cursor, setCursor] = React.useState<any>(`${perPage}:0:0`);

  const handleCurrentTab = (value: any) => {
    setCursor(`${perPage}:0:0`);
    router.replace(`/assessment/sectional?type=${value}`, undefined, {
      shallow: true,
    });
  };

  const { data: assessmentSessions, error: assessmentSessionsError } = useSWR(
    assessmentKind && assessmentType && cursor
      ? [
          `${USER_ASSESSMENT_ENDPOINT}?${assessmentType}=true&kind=${assessmentKind}&per_page=${perPage}&cursor=${cursor}${
            query ? `&search=${query}` : ""
          }`,
          `user-assessment-${assessmentType}-${assessmentKind}`,
        ]
      : null,
    APIFetcher
  );

  const renderAssessmentViaDate = (assessments: any) => {
    let returnAssessments: any = [];

    let searchKey =
      assessmentType === "taken"
        ? "submitted_at"
        : assessmentType === "upcoming"
        ? "scheduled_at"
        : "created_at";

    if (assessments && assessments.length > 0) {
      assessments.map((_session: any) => {
        if (returnAssessments && returnAssessments.length > 0) {
          let returnAssessmentsIndex = returnAssessments.findIndex(
            (_updatedSession: any) => _updatedSession?.date === datePreview(_session?.[searchKey])
          );

          if (returnAssessmentsIndex >= 0) {
            returnAssessments[returnAssessmentsIndex] = {
              ...returnAssessments[returnAssessmentsIndex],
              sessions: [...returnAssessments[returnAssessmentsIndex].sessions, _session],
            };
          } else {
            let currentDate = new Date(_session?.[searchKey]);
            returnAssessments = [
              ...returnAssessments,
              {
                date: datePreview(_session?.[searchKey]),
                title: `${calendarDays[currentDate.getDay()].fullName}, ${bindZero(
                  currentDate.getDate()
                )} ${calendarMonths[currentDate.getMonth()].fullName} ${currentDate.getFullYear()}`,
                sessions: [_session],
              },
            ];
          }
        } else {
          let currentDate = new Date(_session?.[searchKey]);

          returnAssessments = [
            ...returnAssessments,
            {
              date: datePreview(_session?.[searchKey]),
              title: `${calendarDays[currentDate.getDay()].fullName}, ${bindZero(
                currentDate.getDate()
              )} ${calendarMonths[currentDate.getMonth()].fullName} ${currentDate.getFullYear()}`,
              sessions: [_session],
            },
          ];
        }
      });
    }

    return returnAssessments;
  };

  return (
    <UserDefaultLayout padding={false}>
      <div className="relative p-4 space-y-5">
        <div className="flex-shrink-0">
          <div className="text-xl font-medium">Assessments</div>
        </div>

        <div className="h-full relative space-y-4">
          <SessionTab currentTab={assessmentType} handleCurrentTab={handleCurrentTab} />

          {assessmentSessions && !assessmentSessionsError ? (
            <>
              <div className="space-y-4">
                  <div className="flex items-center gap-2 justify-between">
                    <div>
                      <Pagination
                        count={perPage}
                        totalPages={assessmentSessions?.total_pages}
                        currentPage={parseInt(cursor?.split(":")[1]) + 1}
                        onPageChange={(value: any) => {
                          setCursor(value);
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <div>
                        <ReactHookInput
                          label=""
                          type="text"
                          name="search"
                          placeholder={`Search by name`}
                          register={register}
                          error={errors.search}
                          disabled={buttonLoader || buttonClearLoader}
                        />
                      </div>
                      <div className="">
                        <Button
                          size="xs"
                          onClick={handleSubmit(handleSearchUser)}
                          disabled={buttonLoader || buttonClearLoader}
                        >
                          {buttonLoader ? "Processing..." : "Search"}
                        </Button>
                      </div>

                      <div>
                        <Button
                          size="xs"
                          variant="secondary"
                          onClick={handleClearSearch}
                          disabled={buttonLoader || buttonClearLoader}
                        >
                          {buttonClearLoader ? "Processing..." : "Clear"}
                        </Button>
                      </div>
                    </div>
                  </div>
              </div>
              {assessmentSessions &&
              assessmentSessions?.results &&
              assessmentSessions?.results.length > 0 ? (
                <>
                  {renderAssessmentViaDate(assessmentSessions?.results).map(
                    (_assessment: any, index: any) => (
                      <div key={index}>
                        <SessionCard assessment={_assessment} type={assessmentType} />
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="text-sm text-center text-gray-400 py-5">
                  No Assessments are enrolled to this user.
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 py-5">loading...</div>
          )}
        </div>
      </div>
    </UserDefaultLayout>
  );
};

export default authWrapper(Assessments, { authRequired: true, role: ["manager", "tutor", "user"] });
