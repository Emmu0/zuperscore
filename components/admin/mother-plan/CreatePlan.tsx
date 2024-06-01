// React Imports
import React, { useState } from "react";

// UI Components
import Modal from "@components/ui/Build/Modal";

type CreatePlanProps = {
  children: React.ReactNode;
};

const CreatePlan = (props: CreatePlanProps) => {
  const [isOpen, setModal] = useState<any>(false);

  return (
    <>
      <div className="inline-block" onClick={() => setModal(true)}>
        {props.children}
      </div>
      <Modal isModal={isOpen} setModal={setModal} title="Hi">
        Children
      </Modal>
    </>
  );
};

export default CreatePlan;
