import React from "react";
// components
import Modal from "@components/ui/Modal";
// api services
import { AssessmentSession } from "@lib/services/user.assessment.service";
// context
import { globalContext } from "@contexts/GlobalContextProvider";

interface IDeleteAssessmentSession {
  children?: React.ReactNode;
  session?: any;
  mutationData?: any;
  mutation?: any;
}

const DeleteAssessmentSession: React.FC<IDeleteAssessmentSession> = ({
  children,
  session,
  mutationData,
  mutation,
}) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  const [buttonLoader, setButtonLoader] = React.useState<any>(false);

  const [isModal, setModal] = React.useState<any>(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  const deleteAssessmentSession = async () => {
    setButtonLoader(true);
    let payload = {
      id: session.id,
    };
    await AssessmentSession.delete(payload)
      .then((response) => {
        mutation({
          ...mutationData,
          results: mutationData.results.filter((_item: any) => _item.id != session.id),
        });
        handleClose();
        setButtonLoader(false);
        handleAlert("success", "Session deleted successfully.", "Session deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
        setButtonLoader(false);
        handleAlert(
          "error",
          "Something went wrong.",
          "Error deleting a session. Please try again."
        );
      });
  };

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>

      <Modal
        title={`Delete Assessment Session`}
        modal={isModal}
        setModal={() => {
          setModal(false);
        }}
        onClose={() => {}}
        loading={buttonLoader}
        onSubmit={deleteAssessmentSession}
      >
        <div className="space-y-4">Are you sure you want to delete this session.</div>
      </Modal>
    </div>
  );
};

export default DeleteAssessmentSession;
