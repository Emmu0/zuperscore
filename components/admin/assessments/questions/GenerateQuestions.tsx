// React
import { useState } from "react";
// constant
import { SUBJECT_ENDPOINT, SUBJECT_WITH_NODE_ENDPOINT } from "@constants/api-routes";
// services
import { APIFetcher } from "@lib/services";
// swr
import useSWR from "swr";
// components
import Modal from "@components/ui/Modal";

const Questions = (props: any) => {
  const [currentSubject, setCurrentSubject] = useState<any>();

  // Fetch all the subjects
  const { data: subjectList, error: subjectError } = useSWR([SUBJECT_ENDPOINT], (url) =>
    APIFetcher(url)
  );

  const handleSubjectChange = (e: any) => {
    setCurrentSubject(e.target.value);
  };

  const { data: topicList, error: topicError } = useSWR(
    currentSubject ? [SUBJECT_WITH_NODE_ENDPOINT(currentSubject), currentSubject] : null,
    (url) => APIFetcher(url),
    { refreshInterval: 0 }
  );

  const closeModal = () => {
    props.setModal(false);
  };

  return (
    <>
      <Modal
        title="Generate Questions"
        modal={props.isModal}
        setModal={props.setModal}
        onClose={() => closeModal()}
        size="xl"
      >
        <div>
          <div className="mt-2">
            <div>
              <div className="text-gray-400">Choose Subject</div>
              <select
                className="mt-2 rounded border p-2 outline-none w-3/12"
                onChange={handleSubjectChange}
              >
                <option value="">--Choose Subject--</option>
                {!subjectError && subjectList && subjectList.length > 0
                  ? subjectList.map((subject: any, index: number) => {
                      return (
                        <option key={index} value={subject.id}>
                          {subject.title}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-10 mt-3">
                <div></div>
                <div>
                  <h3 className="font-medium text-lg">Difficulty Level</h3>
                </div>
                <div>
                  <h3 className="font-medium text-lg">No. of Questions</h3>
                </div>
              </div>
              {!topicError &&
              topicList &&
              topicList?.tree[0]?.children &&
              topicList?.tree[0]?.children.length > 0 ? (
                topicList?.tree[0]?.children.map((topic: any, index: number) => {
                  return (
                    <div key={index} className="grid grid-cols-3 gap-10 mt-3">
                      <div>
                        <h4 className="p-2 bg-slate-200 rounded">{topic.data.title}</h4>
                      </div>
                      <div>
                        <select className="rounded border p-2 outline-none w-full">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div>
                        <input type="text" className="rounded border p-2 outline-none w-full" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3>No Topics Available</h3>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Questions;
