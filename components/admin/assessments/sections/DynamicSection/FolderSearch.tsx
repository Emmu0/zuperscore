import React from "react";
// swr
import useSWR from "swr";
// components
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
import SelectNestedTree from "@components/ui/Select/NestedTree";
// api routes
import { SUBJECT_WITH_NODE_ENDPOINT } from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";

interface ISectionFolderSearch {
  subjectsList: Object[] | null;
  currentSwitch: any;
  handleCurrentSwitch: any;
}

const SectionFolderSearch: React.FC<ISectionFolderSearch> = ({
  subjectsList,
  currentSwitch,
  handleCurrentSwitch,
}) => {
  const [isModal, setModal] = React.useState<any>(false);
  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  React.useEffect(() => {
    if (currentSwitch) showModal();
  }, [currentSwitch]);

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
  const [currentSubjectTreeData, setCurrentSubjectTreeData] = React.useState<any>(null);
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

  const onSubmit = () => {
    closeModal();
    handleCurrentSwitch(currentSubjectTreeData);
    setCurrentSubject(null);
    setSubjectsListOptions(null);
    setCurrentSubjectTree(null);
    setCurrentSubjectTreeData(null);
    setSubjectsTreeOptions(null);
  };

  return (
    <>
      <Modal
        title={`Select section`}
        modal={isModal}
        setModal={() => {
          closeModal();
          setTimeout(() => {
            // handleCurrentSwitch(null);
          }, 500);
        }}
        onClose={() => {}}
        loading={buttonLoader}
        onSubmit={onSubmit}
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
                              setCurrentSubjectTreeData(data);
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
          </>
        ) : (
          <div className="text-center w-full text-muted text-sm py-5">loading...</div>
        )}
      </Modal>
    </>
  );
};

export default SectionFolderSearch;
