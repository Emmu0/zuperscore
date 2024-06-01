import { useCallback, useState } from "react";

import DisplayKatex from "./DisplayKatex";

export default function KatexEquationAlterer({ onConfirm, initialEquation = "" }) {
  const [equation, setEquation] = useState(initialEquation);
  const [inline, setInline] = useState(true);

  const onClick = useCallback(() => {
    onConfirm(equation, inline);
  }, [onConfirm, equation, inline]);

  const onCheckboxChange = useCallback(() => {
    setInline(!inline);
  }, [setInline, inline]);

  return (
    <>
      <div className="KatexEquationAlterer_defaultRow">
        Inline
        <input type="checkbox" checked={inline} onChange={onCheckboxChange} />
      </div>
      <div className="KatexEquationAlterer_defaultRow">Equation </div>
      <div className="KatexEquationAlterer_centerRow">
        {inline ? (
          <input
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
            className="KatexEquationAlterer_textArea"
          />
        ) : (
          <textarea
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
            className="KatexEquationAlterer_textArea"
          />
        )}
      </div>
      <div className="KatexEquationAlterer_defaultRow">Visualization </div>
      <div className="KatexEquationAlterer_centerRow">
        <DisplayKatex equation={equation} inline={false} onClick={() => null} />
      </div>
      <div className="KatexEquationAlterer_dialogActions">
        <button onClick={onClick}>Confirm</button>
      </div>
    </>
  );
}
