//react imports
import React from "react";
//components
import Modal from "@components/ui/Modal";
//context
import { globalContext } from "@contexts/GlobalContextProvider";
//services
import { AssessmentSession } from "@lib/services/user.assessment.service";

interface IDisableResumeTest {
  children?: React.ReactNode;
  session?: any;
  mutationData?: any;
  mutation?: any;
  mutate_url?: any;
}

const DisableResumeTest: React.FC<IDisableResumeTest> = ({
  children,
  session,
  mutationData,
  mutation,
  mutate_url = null,
}) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [isModal, setModal] = React.useState<any>(false);
  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleAssessmentSession = async () => {
    if (session && session?.id) {
      const resumeToggle = session.is_resume_enabled ? false : true;
      return editSession(session?.id, resumeToggle);
    }
  };
  const editSession = async (session_id: any, resume_toggle: any) => {
    const payload = {
      id: session_id,
      is_resume_enabled: resume_toggle,
    };

    await AssessmentSession.update(payload)
      .then(async (response) => {
        if (mutate_url)
          await mutation(
            mutate_url,
            async (elements: any) => {
              let elementsData = { ...response };
              elementsData.results = elements?.results?.map((_item: any) =>
                _item?.id === session_id
                  ? { ..._item, is_resume_enabled: !_item.is_resume_enabled }
                  : { ..._item }
              );
              return elementsData;
            },
            false
          );
        else
          await mutation({
            ...mutationData,
            state: mutationData.results.map((_data: any) =>
              _data?.id == session_id ? response : _data
            ),
          });
        handleClose();
        handleAlert("success", "Session updated successfully.", "Session updated successfully.");
      })
      .catch((error) => {
        console.log(error);
        handleAlert(
          "error",
          "Something went wrong.",
          "Error updating a session. Please try again."
        );
      });

    return;
  };
  return (
    <div>
      <div onClick={handleOpen}>{children}</div>

      <Modal
        title={`${session.is_resume_enabled === true ? "Disable" : "Enable"} Resume Test`}
        modal={isModal}
        setModal={() => {
          setModal(false);
        }}
        onClose={() => {}}
        onSubmit={handleAssessmentSession}
      >
        {`Are you sure you want to ${
          session.is_resume_enabled === true ? "disable" : "enable"
        } resume for this test?`}
      </Modal>
    </div>
  );
};

export default DisableResumeTest;
