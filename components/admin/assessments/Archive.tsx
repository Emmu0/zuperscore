import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
// api services
import { Assessment } from "@lib/services/assessment.service";
import { globalContext } from "@contexts/GlobalContextProvider";

type Inputs = {
  id: string | null;
  name: string;
  archive: string;
};

let defaultValues = {
  id: null,
  name: "",
  archive: ""
};

interface IAssessmentArchive {
  assessment: any;
  handleCurrentAssessment: any;
  mutateUrl: any;
}

const AssessmentArchive: React.FC<IAssessmentArchive> = ({
  assessment,
  handleCurrentAssessment,
  mutateUrl,
}: any) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  const [isModal, setModal] = React.useState<any>(false);
  const [globalState, globalDispatch] = React.useContext(globalContext);
  const handleAlert = (type: string, title: string, content: string) => {
    globalDispatch({
      type: "ADD_TOAST_ALERT",
      payload: { title: title, content: content, type: type, interval: 4 },
    });
  };

  React.useEffect(() => {
    if (assessment && reset) {
      setModal(true);
      reset({
        ...defaultValues,
        id: assessment?.assessment?.id || null,
        name: assessment?.assessment?.name || "",
        archive: assessment?.assessment?.state || "",
      });
    }
  }, [assessment, reset]);

  const onSubmit = async (data: any) => {
    const currentState = (assessment?.assessment?.state === "ARCHIVED" ? "ACTIVE" : "ARCHIVED");
    let payload = {
      id: data?.id,
      state: currentState
    }
    return Assessment.update(payload)
      .then((res) => {
        mutate(mutateUrl);
        setModal(false);
        handleCurrentAssessment("clear");
        handleAlert("success", "Changed Successfully", "Test state has been changed.");
      })
      .catch((error) => {
        console.log(error);
        handleAlert("error", "Error", "Error while changing the state.");
      });
  };

  return (
    <div>
      <Modal
        size={`xl`}
        title={`${assessment?.assessment?.state === "ARCHIVED" ? "Unarchive Assessment" : "Archive Assessment"}`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentAssessment(null);
          }, 500);
        }}
        onClose={() => { }}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          Are you sure you want to {assessment?.assessment?.state === "ARCHIVED" ? "unarchive" : "archive"} the assessment
          <b className="text-violet-100">{watch && ` ${watch("name")}`}</b>
        </div>
      </Modal>
    </div>
  );
};

export default AssessmentArchive;
