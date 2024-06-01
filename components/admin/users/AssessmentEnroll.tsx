import React from "react";
// react hook form
import { useForm } from "react-hook-form";
// swr
import { mutate } from "swr";
// components
import Modal from "@components/ui/Modal";
import AssessmentSelect from "@components/admin/assessments/UserAssessmentAllocationSelect";
// api services
import { User } from "@lib/services/users.service";
import { APIFetcher } from "@lib/services";

type Inputs = {
  id: string | any;
  initial_assessments: string[];
};
let defaultValues = {
  id: "",
  initial_assessments: [],
};

interface IAdminUserAssessmentEnrollment {
  user: any;
  handleCurrentUser: any;
  mutateUrl: any;
  assessments: any;
}

const AdminUserAssessmentEnrollment: React.FC<IAdminUserAssessmentEnrollment> = ({
  user,
  handleCurrentUser,
  mutateUrl,
  assessments,
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
    },
  });

  const [isModal, setModal] = React.useState<any>(false);

  const [currentAssessment, setCurrentAssessment] = React.useState<any>(null);
  const [assessmentListOptions, setAssessmentListOptions] = React.useState<any>([]);
  React.useEffect(() => {
    if (assessments && assessments.length > 0) {
      let assessmentPayload: any = [];
      assessments.map((_assessment: any) => {
        assessmentPayload.push({
          key: _assessment?.id,
          title: _assessment?.name,
          data: _assessment,
        });
      });
      setAssessmentListOptions(assessmentPayload);
    }
  }, [assessments]);

  React.useEffect(() => {
    if (user && reset) {
      setModal(true);
      let currentAssessments = user?.user?.initial_assessments
        ? user?.user?.initial_assessments
        : null;
      if (currentAssessments && Array.isArray(currentAssessments)) {
        if (currentAssessments.length > 0) {
          if (
            typeof currentAssessments[0] === "string" ||
            typeof currentAssessments[0] === "number"
          )
            currentAssessments = currentAssessments.map((_item: any) => {
              return {
                assessment_id: _item,
                times: 1,
              };
            });
          else currentAssessments = currentAssessments;
          // TODO: check if assessment are available or not in the DB
        }
      }
      reset({
        ...defaultValues,
        id: user?.user?.id,
        initial_assessments: currentAssessments,
      });
      setCurrentAssessment(currentAssessments);
    }
  }, [user, reset]);

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      initial_assessments: currentAssessment,
    };

    return User.update(payload)
      .then((response) => {
        setModal(false);
        mutate(mutateUrl, APIFetcher(mutateUrl), false);
        handleCurrentUser("clear");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      title={`Enroll assessment to the user`}
      modal={isModal}
      setModal={() => {
        setModal(false);
        setTimeout(() => {
          handleCurrentUser(null);
        }, 500);
      }}
      onClose={() => {}}
      loading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      {assessments ? (
        <div>
          {assessments.length > 0 ? (
            <div>
              <AssessmentSelect
                placeHolder="Select assessments"
                options={assessmentListOptions}
                selectedOptions={currentAssessment}
                handleOption={(_value: any, data: any) => {
                  setCurrentAssessment(_value);
                }}
                multiple={true}
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 py-5">No Assessments are available.</div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-5">Loading...</div>
      )}
    </Modal>
  );
};

export default AdminUserAssessmentEnrollment;
