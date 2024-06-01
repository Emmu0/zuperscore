import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
import AssessmentForm from "./Form";
// api services
import { Assessment } from "@lib/services/assessment.service";

type Inputs = {
  id: string | null;
  name: string;
  description: string;
  instructions: any;
  kind: "MOCK" | "SECTIONAL" | "MICRO" | "PRACTICE_SHEET" | "DIAGNOSTIC" | null;
  is_extended: true | false;
  is_tutor_test: true | false;
  subject: number | null;
  domain: number | null;
  topic: number | null;
  assessment_tags: [] | null;
};

let defaultValues: Inputs = {
  id: "",
  name: "",
  description: "",
  kind: null,
  instructions: null,
  is_extended: false,
  is_tutor_test: false,
  subject: null,
  domain: null,
  topic: null,
  assessment_tags: null,
};

interface IAssessmentCreateEdit {
  assessment: any;
  handleCurrentAssessment: any;
  mutateUrl: any;
}

const AssessmentCreateEdit: React.FC<IAssessmentCreateEdit> = ({
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });

  const [isModal, setModal] = React.useState<any>(false);

  React.useEffect(() => {
    if (assessment && reset) {
      setModal(true);
      reset({
        ...defaultValues,
        id: assessment?.assessment?.id || null,
        name: assessment?.assessment?.name,
        kind: assessment?.assessment?.kind === "ONLINE" ? null : assessment?.assessment?.kind,
        description: assessment?.assessment?.description,
        instructions: assessment?.assessment?.data?.content || null,
        is_extended: assessment?.assessment?.is_extended || false,
        is_tutor_test: assessment?.assessment?.is_tutor_test || false,
        subject: assessment?.assessment?.subject || null,
        domain: assessment?.assessment?.domain || null,
        topic: assessment?.assessment?.topic || null,
        assessment_tags: assessment?.assessment?.tags || []
      });
    }
  }, [assessment, reset]);

  const validations = {
    name: { required: "Name is required" },
    description: { required: "Description is required" },
    kind: { required: "Kind is required" },
    subject: { required: "Subject is required" },
    domain: { required: "Domain is required" },
    topic: { required: "Topic is required" }
  };

  const onSubmit = async (data: any) => {
    let payload: any = {
      name: data?.name,
      description: data?.description,
      kind: data?.kind,
      data: {
        content: data?.instructions,
      },
      is_extended: data?.is_extended,
      is_tutor_test: data?.is_tutor_test,
      subject: data?.subject,
      domain: data?.domain,
      topic: data?.topic,
      tags: data?.assessment_tags
    };

    if (data?.id === null)
      return Assessment.create(payload)
        .then((res) => {
          mutate(mutateUrl);
          setModal(false);
          handleCurrentAssessment("clear");
        })
        .catch((error) => {
          console.log(error);
        });
    else {
      payload = { ...payload, id: data?.id };
      return Assessment.update(payload)
        .then((res) => {
          mutate(mutateUrl);
          setModal(false);
          handleCurrentAssessment("clear");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Modal
        size={`xl`}
        title={`Create Assessment`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentAssessment(null);
          }, 500);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AssessmentForm
          register={register}
          setValue={setValue}
          control={control}
          watch={watch}
          validations={validations}
          errors={errors}
        />
      </Modal>
    </div>
  );
};

export default AssessmentCreateEdit;
