import React from "react";
// swr
import { mutate } from "swr";
// react hook form
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// headless ui
import { Switch } from "@headlessui/react";
// components
import Modal from "@components/ui/Modal";
import DynamicSectionForm from "./Form";
// api services
import { Section } from "@lib/services/assessment.service";

type Inputs = {
  id: string | null;
  is_enabled: boolean;
  default_folder_id: number | null;
  default_folder_detail: any;
  switching_route:
    | {
        min: number | null;
        max: number | null;
        operator: string | null;
        folder_id: number | null;
        folder_detail: object | null;
      }[]
    | [];
};

let defaultSwitchOperators = ["between"];

let defaultValues: Inputs = {
  id: null,
  is_enabled: false,
  default_folder_id: null,
  default_folder_detail: null,
  switching_route: [
    {
      min: null,
      max: null,
      operator: "between",
      folder_id: null,
      folder_detail: null,
    },
  ],
};

interface IDynamicSection {
  assessment_id: any;
  section: any;
  subjectsList: Object[] | null;
  handleCurrentSection: any;
  mutateUrl: any;
}

const DynamicSection: React.FC<IDynamicSection> = ({
  assessment_id,
  section,
  subjectsList,
  handleCurrentSection,
  mutateUrl,
}) => {
  const {
    register,
    setValue,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ defaultValues: { ...defaultValues } });
  const { fields, append, prepend, remove, swap, move, insert, update } = useFieldArray({
    control,
    name: "switching_route",
  });

  const handleSwitchingRoute = (
    type: any = "create",
    index: any = null,
    key: any = null,
    value: any = null
  ) => {
    if (type === "create") append({ ...defaultValues.switching_route[0] });
    if (type === "edit")
      update(index, {
        ...fields[index],
        [key]: value,
      });
    if (type === "delete") remove(index);
  };

  const [isModal, setModal] = React.useState<any>(false);

  const showModal = () => {
    setModal(true);
  };
  React.useEffect(() => {
    if (section && reset) {
      showModal();
      console.log("section", section);
      reset({
        ...defaultValues,
        id: section?.section?.id || null,
        is_enabled: section?.section?.type === "ADAPTIVE" ? true : false,
        default_folder_id: section?.section?.default_folder_id || null,
        default_folder_detail: section?.section?.default_folder_detail || null,
        switching_route:
          section?.section?.switching_route && Array.isArray(section?.section?.switching_route)
            ? section?.section?.switching_route.map((_item: any) => {
                return {
                  ..._item,
                  operator: defaultSwitchOperators.includes(_item?.operator)
                    ? _item?.operator
                    : null,
                };
              })
            : [{ ...defaultValues.switching_route[0] }],
      });
    }
  }, [section, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("onSubmit", data);
    let payload: any = {
      id: data?.id,
      type: data.is_enabled ? "ADAPTIVE" : "STANDARD",
      default_folder_id: data?.default_folder_id,
      default_folder_detail: data?.default_folder_detail,
      switching_route: [...data?.switching_route].map((_item: any) => {
        return {
          min: parseInt(_item?.min) >= 0 ? parseInt(_item?.min) : null,
          max: parseInt(_item?.max) >= 0 ? parseInt(_item?.max) : null,
          operator: _item?.operator,
          folder_id: parseInt(_item?.folder_id) || null,
          folder_detail: _item?.folder_detail || null,
        };
      }),
    };

    return Section.update(payload)
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
    <>
      <Modal
        title={`Advance section switch`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentSection(null);
          }, 500);
        }}
        size={`xl`}
        onClose={() => {}}
        loading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-4">
          <div>
            <div className="text-sm text-dark-100 mb-2">Advance switch is enabled</div>
            <div className="relative">
              <Switch
                checked={watch("is_enabled")}
                onChange={() => setValue("is_enabled", !watch("is_enabled"))}
                style={{
                  backgroundColor: watch("is_enabled") ? "#721154" : "#8B8B8B",
                }}
                className="relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    watch("is_enabled") ? "translate-x-4" : "translate-x-0"
                  } pointer-events-none mt-[1px] ml-[1px] inline-block h-[10px] w-[10px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>

          <div>
            <div className="text-sm text-dark-100 mb-2">Advance switch validation</div>
            <DynamicSectionForm
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              fields={fields}
              handleSwitchingRoute={handleSwitchingRoute}
              subjectsList={subjectsList}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DynamicSection;
