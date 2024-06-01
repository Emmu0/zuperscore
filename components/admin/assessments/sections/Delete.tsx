import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
// api services
import { Section } from "@lib/services/assessment.service";

type Inputs = {
  id: string | null;
  name: string;
};

let defaultValues = {
  id: null,
  name: "",
};

interface ISectionDelete {
  section: any;
  handleCurrentSection: any;
  mutateUrl: any;
}

const SectionDelete: React.FC<ISectionDelete> = ({
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
        name: section?.section?.name || "",
      });
    }
  }, [section, reset]);

  const onSubmit = async (data: any) => {
    return Section.delete(data?.id)
      .then((res) => {
        mutate(mutateUrl);
        setModal(false);
        handleCurrentSection("clear");
      })
      .catch((error) => {
        console.log(error);
      });
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
            handleCurrentSection(null);
          }, 500);
        }}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          Are you sure you want to delete the section
          <b className="text-violet-100">{watch && ` ${watch("name")}`}</b>
        </div>
      </Modal>
    </div>
  );
};

export default SectionDelete;
