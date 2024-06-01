import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
import SectionForm from "./Form";
// api services
import { Section } from "@lib/services/assessment.service";

type Inputs = {
  id: string | null;
  name: string;
  description: string;
  instructions: any;
  group_by: any;
  time_limit: number;
  is_timed: boolean;
  break_time: number;
};

let defaultValues: Inputs = {
  id: "",
  name: "",
  description: "",
  instructions: null,
  group_by: null,
  time_limit: 0,
  is_timed: false,
  break_time: 0,
};

interface ISectionCreateEdit {
  assessment_id: any;
  sections: any;
  section: any;
  handleCurrentSection: any;
  mutateUrl: any;
}

const SectionCreateEdit: React.FC<ISectionCreateEdit> = ({
  assessment_id,
  sections,
  section,
  handleCurrentSection,
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

  React.useEffect(() => {
    if (section && reset) {
      setModal(true);
      reset({
        ...defaultValues,
        id: section?.section?.id || null,
        name: section?.section?.name,
        description: section?.section?.description,
        instructions: section?.section?.data?.content || null,
        group_by: section?.section?.data?.group_by || null,
        time_limit: section?.section?.time_limit || 0,
        is_timed: section?.section?.timers?.is_timed || false,
        break_time: section?.section?.timers?.break_time || 0,
      });
    }
  }, [section, reset]);

  const validations = {
    name: { required: "Name is required" },
    description: { required: "Description is required" },
  };

  const onSubmit = async (data: any) => {
    let payload: any = {
      name: data?.name,
      assessment_id: assessment_id,
      description: data?.description,
      data: {
        content: data?.instructions,
        group_by: data?.group_by,
      },
      time_limit: parseInt(data?.time_limit),
      timers: { is_timed: data?.is_timed, break_time: parseInt(data?.break_time) },
      sequence:
        sections && sections?.sections && sections?.sections.length > 0
          ? sections?.sections[sections?.sections.length - 1]?.sequence + 65535
          : 65535,
    };

    if (data?.id === null)
      return Section.create(payload)
        .then((res) => {
          mutate(mutateUrl);
          setModal(false);
          handleCurrentSection("clear");
        })
        .catch((error) => {
          console.log(error);
        });
    else {
      payload = { ...payload, id: data?.id };

      delete payload.assessment_id;
      delete payload.sequence;

      return Section.update(payload)
        .then((res) => {
          mutate(mutateUrl);
          setModal(false);
          handleCurrentSection("clear");
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
        title={`Create Section`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentSection(null);
          }, 500);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <SectionForm
          register={register}
          setValue={setValue}
          watch={watch}
          validations={validations}
          errors={errors}
        />
      </Modal>
    </div>
  );
};

export default SectionCreateEdit;
