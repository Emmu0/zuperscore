import React from "react";
// components
import Button from "@components/ui/Button";
// common
import { dateTimePreview } from "@constants/common";
// api routes
import {
  ASSESSMENT_WITH_SECTIONS_ENDPOINT,
  SECTION_WITH_QUESTIONS_ENDPOINT,
  ASSESSMENT_QUESTION_WITH_SUBJECT_ID,
} from "@constants/api-routes";
// api services
import { APIFetcher, APIPromiseFetcher } from "@lib/services";

const convertToCSV = (objArray: any) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }
    str += line + "\r\n";
  }

  return str;
};

const exportCSVFile = (fileTitle: any, items: any) => {
  let filePayload: any = [];

  // headers and questions
  if (items && items?.questions) {
    // questions
    filePayload.push([
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      "Question Id",
      ...items.questions.map((_question: any) => _question?.question_id),
    ]);
    // user answers
    filePayload.push([
      `user_id`,
      `name`,
      `email`,
      `session_id`,
      `session_started_at`,
      `session_completed_at`,
      `total_score`,
      `S1_score`,
      `S2_score`,
      `S3_score`,
      `S4_score`,
      ...items.questions.map((_question: any) => _question?.question_title),
    ]);
    let q_user_options = items.user_answers.map((_item: any) => [
      `${_item?.user?.id}`,
      `${_item?.user?.first_name} ${_item?.user?.last_name}`,
      `${_item?.user?.email}`,
      `${_item?.session?.id}`,
      `${dateTimePreview(_item?.session?.started_at).replace(/,/g, " :")}`,
      `${dateTimePreview(_item?.session?.submitted_at).replace(/,/g, " :")}`,
      `${_item?.session?.total_correct}`,
      `${_item?.session?.section_analysis_data[0]?.results?.correct_answers}`,
      `${_item?.session?.section_analysis_data[1]?.results?.correct_answers}`,
      `${_item?.session?.section_analysis_data[2]?.results?.correct_answers}`,
      `${_item?.session?.section_analysis_data[3]?.results?.correct_answers}`,
      ..._item.answers,
    ]);
    filePayload.push(...q_user_options);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(filePayload);
  var csv = convertToCSV(jsonObject);

  var exportedFileName = fileTitle + ".csv" || "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  // if (navigator.msSaveBlob) {
  //   // IE 10+
  //   navigator.msSaveBlob(blob, exportedFileName);
  // } else {
  var link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // }
};

const AssessmentResultDownload = ({ assessment, sessions }: any) => {
  const [buttonLoader, setButtonLoader] = React.useState(false);

  const handleAssessmentSessionDownload = async () => {
    setButtonLoader(true);

    let payload: any = {
      questions: [],
      user_answers: [],
    };

    await APIFetcher(ASSESSMENT_WITH_SECTIONS_ENDPOINT(assessment?.id))
      .then(async (assessmentResponse) => {
        let urlPayload: any = [];
        assessmentResponse?.sections.map((_section: any, index: any) => {
          if (_section?.type === "STANDARD")
            urlPayload.push({
              url: SECTION_WITH_QUESTIONS_ENDPOINT(_section?.id),
              section: {
                id: _section?.id,
                section_index: index + 1,
                type: _section?.type,
                group_by: _section?.data?.group_by,
              },
            });
          else {
            if (
              _section?.switching_route &&
              Array.isArray(_section?.switching_route) &&
              _section?.switching_route.length > 0
            ) {
              _section?.switching_route.map((_item: any) => {
                urlPayload.push({
                  url: ASSESSMENT_QUESTION_WITH_SUBJECT_ID(Number(_item?.folder_id)),
                  section: {
                    id: _section?.id,
                    section_index: index + 1,
                    type: _section?.type,
                    group_by: _section?.data?.group_by,
                  },
                });
              });
            }
          }
        });

        if (urlPayload && urlPayload.length > 0) {
          await APIPromiseFetcher(urlPayload.map((_data: any) => _data?.url))
            .then((response) => {
              let sectionQuestions: any = [];
              response.map((_response: any, index: any) => {
                if (_response?.data && Array.isArray(_response?.data)) {
                  sectionQuestions = [
                    ...sectionQuestions,
                    ..._response?.data.map((_question: any) => {
                      return {
                        question_id: parseInt(_question?.question?.id),
                        section_id: parseInt(urlPayload[index]?.section?.id),
                        question_title: `S${urlPayload[index]?.section?.section_index}_${_question?.question?.id}_(${urlPayload[index]?.section?.type})(${urlPayload[index]?.section?.group_by})`,
                      };
                    }),
                  ];
                } else {
                  sectionQuestions = [
                    ...sectionQuestions,
                    ..._response?.data?.questions.map((_question: any) => {
                      return {
                        question_id: parseInt(_question?.question?.id),
                        section_id: parseInt(urlPayload[index]?.section?.id),
                        question_title: `S${urlPayload[index]?.section?.section_index}_${_question?.question?.id}_(${urlPayload[index]?.section?.type})(${urlPayload[index]?.section?.group_by})`,
                      };
                    }),
                  ];
                }
              });
              payload.questions = [...sectionQuestions];
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    sessions.map((_userSession: any) => {
      _userSession.sessions.map((_session: any) => {
        let sessionCompletedStatus = ["COMPLETED", "ANALYSED"];
        if (_session?.state && sessionCompletedStatus.includes(_session?.state)) {
          let sessionQuestions: any = [];
          let questionSectionKeys = Object.keys(_session.section_question_data);
          questionSectionKeys.map((_section_id: any, index: any) => {
            sessionQuestions = [
              ...sessionQuestions,
              ..._session.section_question_data[_section_id].map((_question: any) => {
                return _question;
              }),
            ];
          });
          // user and sessions
          payload.user_answers = [
            ...payload.user_answers,
            {
              user: _userSession?.user,
              session: _session,
              questions: sessionQuestions,
              answers: [],
            },
          ];
        }
      });
    });

    // user answers
    payload.user_answers.map((user: any, index: any) => {
      let allQuestionResults: any = [];
      user?.session?.section_analysis_data.map((_result: any) => {
        allQuestionResults = [...allQuestionResults, ..._result?.results?.attempts];
      });

      let userAnswers: any = [];

      payload.questions.map((_question: any) => {
        let answersStatus: any = "-";

        let currentQuestionAvailability = user?.questions.find(
          (_que: any) => _que === _question?.question_id
        );

        if (currentQuestionAvailability) answersStatus = "O";

        let currentAttempt = allQuestionResults.find(
          (question: any) => question?.id == _question?.question_id
        );
        if (currentAttempt) {
          if (currentAttempt?.result?.is_user_answered)
            if (currentAttempt?.result?.is_correct) answersStatus = 1;
            else answersStatus = 0;
        }

        userAnswers = [...userAnswers, answersStatus];
      });

      payload.user_answers[index].answers = userAnswers;
    });

    exportCSVFile(`${assessment?.name}_${Date.now()}`, payload);

    setButtonLoader(false);
  };

  return (
    <div>
      <Button
        variant={"secondary"}
        size="xs"
        className="whitespace-nowrap"
        disabled={buttonLoader}
        onClick={handleAssessmentSessionDownload}
      >
        {buttonLoader ? "processing..." : "Download full result"}
      </Button>
    </div>
  );
};

export default AssessmentResultDownload;
