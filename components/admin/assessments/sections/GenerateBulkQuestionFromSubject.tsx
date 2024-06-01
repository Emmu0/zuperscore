import React from "react";
// swr
import useSWR from "swr";
// components
import Button from "@components/buttons";
import Modal from "@components/ui/Modal";
import Editor from "@components/lexical/Editor";
import Select from "@components/ui/Select";
import SelectNestedTree from "@components/ui/Select/NestedTree";
// api routes
import {
  SUBJECT_WITH_NODE_ENDPOINT,
  ASSESSMENT_QUESTION_WITH_SUBJECT_ID,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { Section } from "@lib/services/assessment.service";

interface IGenerateBulkQuestionFromSubject {
  assessment_id: any;
  sectionId: any;
  subjectsList: Object[] | null;
  handleCurrentSection: any;
}

const GenerateBulkQuestionFromSubject: React.FC<IGenerateBulkQuestionFromSubject> = ({
  assessment_id,
  sectionId,
  subjectsList,
  handleCurrentSection,
}) => {
  const [isModal, setModal] = React.useState<any>(false);
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const showModal = () => {
    setModal(true);
    setFormData({ questions: [] });
  };
  React.useEffect(() => {
    if (sectionId) showModal();
  }, [sectionId]);

  const [formData, setFormData] = React.useState<any>({ questions: [] });
  const handleFormDataQuestions = (question_id: any) => {
    setFormData((prevData: any) => {
      if (prevData.questions.includes(question_id)) {
        return {
          ...prevData,
          questions: prevData?.questions.filter((_ques: any) => _ques != question_id),
        };
      } else {
        return { ...prevData, questions: [...prevData.questions, question_id] };
      }
    });
  };
  const handleFormDataSelectAllQuestions = () => {
    setFormData((prevData: any) => {
      let questionsPayload: any = [];
      subjectNodeQuestions.map((_question: any) => {
        questionsPayload = [...questionsPayload, _question?.question?.id];
      });
      return { ...prevData, questions: [...questionsPayload] };
    });
  };
  const clearFormDataSelectAllQuestions = () => {
    setFormData((prevData: any) => {
      let questionsPayload: any = [];
      return { ...prevData, questions: [...questionsPayload] };
    });
  };

  const bulkCreateSubmit = () => {
    setButtonLoader(true);
    let payload = {
      section_id: sectionId,
      questions: formData.questions,
    };

    Section.generateBulkQuestionFromSelection(payload)
      .then((response) => {
        setButtonLoader(false);
        setModal(false);
        setTimeout(() => {
          handleCurrentSection(null);
        }, 500);
      })
      .catch((error) => {
        console.log("error", error);
        setButtonLoader(false);
      });
  };

  const [currentSubject, setCurrentSubject] = React.useState<any>(null);
  const [subjectsListOptions, setSubjectsListOptions] = React.useState<any>(null);

  React.useEffect(() => {
    if (subjectsList && subjectsList.length > 0) {
      let subjectPayload: any = [];
      subjectsList.map((_subject: any) => {
        subjectPayload.push({
          key: _subject?.id,
          title: _subject?.title,
          data: _subject,
        });
      });
      setSubjectsListOptions(subjectPayload);
    }
  }, [subjectsList]);

  const { data: subTopicList, error: subtopicError } = useSWR(
    currentSubject && currentSubject.length > 0
      ? [SUBJECT_WITH_NODE_ENDPOINT(currentSubject[0]), `bulk-subject-creation${currentSubject[0]}`]
      : null,
    APIFetcher
  );

  const [currentSubjectTree, setCurrentSubjectTree] = React.useState<any>(null);
  const [subjectsTreeOptions, setSubjectsTreeOptions] = React.useState<any>(null);

  React.useEffect(() => {
    let subjectPayload: any = [];
    if (
      subTopicList &&
      subTopicList?.tree &&
      subTopicList?.tree.length > 0 &&
      subTopicList?.tree[0]?.children &&
      subTopicList?.tree[0]?.children.length > 0
    ) {
      let rootTree = subTopicList?.tree[0]?.children;
      const treeChildLoop = (currentTreeChild: any, padding: any) => {
        currentTreeChild.map((_childNode: any) => {
          subjectPayload.push({
            key: _childNode?.id,
            title: _childNode?.data?.title,
            data: { id: _childNode?.id, ..._childNode?.data },
            padding: padding,
          });
          if (_childNode && _childNode.children && _childNode.children.length > 0) {
            treeChildLoop(_childNode.children, padding + 10);
          }
        });
      };
      if (rootTree && rootTree.length > 0) treeChildLoop(rootTree, 0);
    }
    setSubjectsTreeOptions(subjectPayload);
  }, [subTopicList]);

  const { data: subjectNodeQuestions, error: subjectNodeQuestionsError } = useSWR(
    currentSubjectTree && currentSubjectTree.length > 0
      ? [
          ASSESSMENT_QUESTION_WITH_SUBJECT_ID(Number(currentSubjectTree[0])),
          `bulk-subject-creation-topic${currentSubjectTree[0]}`,
        ]
      : null,
    APIFetcher
  );

  return (
    <>
      <Modal
        title={`Select questions from subject. (${formData.questions.length} Questions)`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentSection(null);
          }, 500);
        }}
        size={`xl`}
        onClose={() => {}}
        loading={buttonLoader}
        onSubmit={bulkCreateSubmit}
      >
        {subjectsList && subjectsList.length > 0 ? (
          <>
            <div className="space-y-3">
              <div>
                <div className="mb-2">
                  <div className="text-sm text-dark-100">Choose Subject</div>
                </div>
                <Select
                  placeHolder="Select subject"
                  options={subjectsListOptions}
                  selectedOptions={currentSubject}
                  handleOption={(_value: any, data: any) => {
                    setCurrentSubject(_value);
                  }}
                  multiple={false}
                />
              </div>

              {currentSubject && currentSubject.length > 0 ? (
                <>
                  {!subTopicList && !subTopicList ? (
                    <div className="text-sm text-center">Loading...</div>
                  ) : (
                    <>
                      {subjectsTreeOptions && subjectsTreeOptions.length > 0 ? (
                        <div>
                          <div className="mb-2">
                            <div className="text-sm text-dark-100">Choose Topic</div>
                          </div>
                          <SelectNestedTree
                            placeHolder="Select Subject Topic"
                            options={subjectsTreeOptions}
                            selectedOptions={currentSubjectTree}
                            handleOption={(_value: any, data: any) => {
                              setCurrentSubjectTree(_value);
                            }}
                            multiple={false}
                          />
                        </div>
                      ) : (
                        <div className="text-sm text-center">No topic under the subject</div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="text-center w-full text-muted py-5 text-sm">
                  Please Select subject
                </div>
              )}
            </div>

            {/* rendering the questions from the subjects */}
            {currentSubject &&
              currentSubject.length > 0 &&
              currentSubjectTree &&
              currentSubjectTree.length > 0 && (
                <div className="mt-3">
                  {subjectNodeQuestions && !subjectNodeQuestionsError ? (
                    <>
                      {subjectNodeQuestions.length > 0 ? (
                        <div className="space-y-2 mx-auto container">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="text-sm text-dark-100 mr-auto">Choose questions</div>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={handleFormDataSelectAllQuestions}
                            >
                              Select all
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={clearFormDataSelectAllQuestions}
                            >
                              Clear Selection
                            </Button>
                          </div>
                          {subjectNodeQuestions.map((question: any, index: number) => (
                            <div key={`tag-questions-${index}`} className="rounded">
                              <div
                                onClick={() => handleFormDataQuestions(question?.question?.id)}
                                className={`w-full h-full rounded-sm px-5 py-3 space-y-2 select-none cursor-pointer ${
                                  formData.questions.includes(question?.question?.id)
                                    ? `border-2 border-violet-100`
                                    : `border-2 border-gray-200`
                                }`}
                              >
                                <div className="inline-block border border-violet-100 text-violet-100 rounded-sm px-1">
                                  {question?.question?.type}
                                </div>
                                <div>
                                  <Editor
                                    id={question?.question?.id}
                                    data={
                                      question?.question?.data?.content &&
                                      question?.question?.data?.content !== null
                                        ? question?.question?.data?.content
                                        : null
                                    }
                                    onChange={(data: any) => {}}
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center w-full text-muted text-sm py-5">
                          No Questions Found Under This Tag
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center w-full text-muted text-sm py-5">loading...</div>
                  )}
                </div>
              )}
          </>
        ) : (
          <div className="text-center w-full text-muted text-sm py-5">loading...</div>
        )}
      </Modal>
    </>
  );
};

export default GenerateBulkQuestionFromSubject;
