import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
// api services
import { globalContext } from "@contexts/GlobalContextProvider";
import { SubjectNodeEdit } from "@lib/services/subjects.service";

type Inputs = {
  id: string | null;
  name: string;
  archive: string;
};

let defaultValues = {
  id: null,
  name: "",
  archive: "",
};

interface ISubjectArchive {
  data: any;
  handleData: any;
  subject: any;
  mutateUrl: any;
}

const SubjectArchive: React.FC<ISubjectArchive> = ({
  data,
  handleData,
  subject,
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
    if (subject && reset) {
      setModal(true);
      reset({
        ...defaultValues,
        id: subject?.data?.id || null,
        name: subject?.data?.title || "",
        archive: subject?.data?.state || "",
      });
    }
  }, [subject, reset]);

  const onSubmit = async (data: any) => {
    const currentState = subject?.data?.state === "ARCHIVED" ? "ACTIVE" : "ARCHIVED";
    let payload = {
      id: data?.id,
      state: currentState,
    };
    return SubjectNodeEdit(payload)
      .then((res) => {
        mutate(mutateUrl);
        setModal(false);
        handleData("clear");
        handleAlert("success", "Changed Successfully", "Subject state has been changed.");
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
        title={`${subject?.data?.state === "ARCHIVED" ? "Unarchive subject" : "Archive subject"}`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleData(null);
          }, 500);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          Are you sure you want to {subject?.data?.state === "ARCHIVED" ? "unarchive" : "archive"}{" "}
          the subject
          <b className="text-violet-100">{watch && ` ${watch("name")}`}</b>?
        </div>
      </Modal>
    </div>
  );
};

export default SubjectArchive;
