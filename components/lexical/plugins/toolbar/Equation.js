import { useCallback } from "react";

import { INSERT_EQUATION_COMMAND } from "../EquationsPlugin";

import KatexAlter from "components/lexical/ui/KatexAlter";
import useModal from "components/lexical/hooks/useModal";

const InsertEquationDialog = ({ activeEditor, onClose }) => {
  const onEquationConfirm = useCallback(
    (equation, inline) => {
      activeEditor.focus();
      activeEditor.dispatchCommand(INSERT_EQUATION_COMMAND, { equation, inline });
      onClose();
    },
    [activeEditor, onClose]
  );

  return <KatexAlter onConfirm={onEquationConfirm} />;
};

const Equation = ({ activeEditor }) => {
  const [modal, showModal] = useModal();

  return (
    <>
      <div
        onClick={() => {
          showModal("Write Equation", (onClose) => (
            <InsertEquationDialog activeEditor={activeEditor} onClose={onClose} />
          ));
        }}
        className={`bg-gray-200 hover:bg-gray-300 rounded-sm border-0 flex justify-center items-center h-[30px] min-w-[30px] px-2 text-sm`}
      >
        Equation
      </div>
      {modal}
    </>
  );
};

export default Equation;
