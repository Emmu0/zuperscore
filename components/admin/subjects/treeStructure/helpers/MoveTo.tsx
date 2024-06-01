// React imports
import React from "react";
// swr
import useSWR, { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
import Select from "@components/ui/Select";
// api routes
import {
  SUBJECT_WITH_NODE_ENDPOINT,
  SUBJECT_ONE_LEVEL_CHILD_NODES_WITH_NODE_ID,
} from "@constants/api-routes";
// api services
import { APIFetcher } from "@lib/services";
import { SubjectNodeOperation } from "@lib/services/subjects.service";
// node operations
import {
  addNodeAsChild,
  moveNode,
} from "@components/admin/subjects/treeStructure/helpers/nodeOperations";

type MoveToProps = {
  data: any;
  handleData: any;
  subjectTree: any;
  subject: any;
  subjectsList: Object[] | null;
};

const MoveTo = ({ data, handleData, subjectTree, subject, subjectsList }: MoveToProps) => {
  const [isModal, setModal] = React.useState<any>(false);

  const showModal = () => {
    setModal(true);
  };

  React.useEffect(() => {
    if (data) {
      showModal();
      setMoveSubject(null);
      setMoveSubjectChild(null);
    }
  }, [data]);

  const [moveSubject, setMoveSubject] = React.useState(null);
  const [moveSubjectChild, setMoveSubjectChild] = React.useState<any>(null);
  const [subjectsOptions, setSubjectsOptions] = React.useState<any>(null);

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

  // swr
  const { data: subjectTopicList, error: subjectTopicError } = useSWR(
    currentSubject &&
      currentSubject.length > 0 && [
        SUBJECT_ONE_LEVEL_CHILD_NODES_WITH_NODE_ID(currentSubject[0]),
        currentSubject[0],
      ],
    APIFetcher
  );

  React.useEffect(() => {
    if (subjectTopicList && subjectTopicList.length > 0) {
      let subjectPayload: any = [];
      subjectTopicList.map((_subject: any) => {
        subjectPayload.push({
          key: _subject?.id,
          title: _subject?.title,
          data: _subject,
        });
      });
      setSubjectsOptions(subjectPayload);
    }
  }, [subjectTopicList]);

  const [buttonLoader, setButtonLoader] = React.useState(false);
  const executeNodeBlockOperation = (dataPayload: any) => {
    if (moveSubject && moveSubject != null) {
      setButtonLoader(true);
      let exactData: Object = {};
      if (moveSubjectChild && moveSubjectChild?.children && moveSubjectChild?.children.length > 0) {
        let moveNodeId = moveSubjectChild?.children[moveSubjectChild?.children.length - 1]?.id;
        exactData = moveNode(data?.id, moveNodeId, "right");
        SubjectNodeOperation(exactData)
          .then((response) => {
            mutate(
              [SUBJECT_WITH_NODE_ENDPOINT(subject?.id), subject?.id],
              APIFetcher(SUBJECT_WITH_NODE_ENDPOINT(subject?.id)),
              false
            );
            setButtonLoader(false);
            setTimeout(() => {
              handleData(null);
            }, 200);
          })
          .catch((error) => {
            console.log(error);
            setButtonLoader(false);
          });
      } else {
        exactData = addNodeAsChild(moveSubject[0], moveSubjectChild?.data?.name, "SECTION");
        setButtonLoader(false);
        alert("At-least one children topic should be available to make a move.");
      }
    } else {
      alert("Please select the Topic.");
    }
  };

  return (
    <>
      <Modal
        title={`Move topic between subjects.`}
        modal={isModal}
        setModal={setModal}
        onClose={() => {}}
        loading={buttonLoader}
        onSubmit={executeNodeBlockOperation}
      >
        <div className="space-y-3">
          <div>
            <div className="text-sm text-dark-100 mb-2">Choose Subject</div>
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
          <div>
            <div className="text-sm text-dark-100 mb-2">Choose Topic</div>
            <Select
              placeHolder="Select Topic"
              options={subjectsOptions}
              selectedOptions={moveSubject}
              handleOption={(_value: any, data: any) => {
                setMoveSubject(_value);
                setMoveSubjectChild(data);
              }}
              multiple={false}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MoveTo;
