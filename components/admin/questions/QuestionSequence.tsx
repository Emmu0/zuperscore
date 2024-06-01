import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// components
import Modal from "@components/ui/Modal";
import ReactHookInput from "@components/forms/ReactHookInput";

interface IQuestionSequenceEdit {
  data?: any;
  handleCurrentBlockSequence?: any;
  blockBridgeSeqUpdate?: any;
}

const QuestionSequenceEdit: React.FC<IQuestionSequenceEdit> = ({
  data,
  handleCurrentBlockSequence,
  blockBridgeSeqUpdate,
}) => {
  const [isModal, setModal] = React.useState<any>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      id: null,
      sequence: 0,
    },
  });

  React.useEffect(() => {
    if (data) {
      setModal(true);
      reset({
        ...data,
      });
    }
  }, [data, reset]);

  // question create
  const questionSequenceEditSubmit = async (data: any) => {
    const payload = { ...data };

    return blockBridgeSeqUpdate(payload)
      .then((response: any) => {
        setModal(false);
        setTimeout(() => {
          handleCurrentBlockSequence(null);
        }, 500);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <>
      <Modal
        title={`Question Sequence`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentBlockSequence(null);
          }, 500);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(questionSequenceEditSubmit)}
      >
        <ReactHookInput
          label="Question Sequence"
          type="text"
          name="sequence"
          register={register}
          error={errors.sequence}
        />
      </Modal>
    </>
  );
};

export default QuestionSequenceEdit;
