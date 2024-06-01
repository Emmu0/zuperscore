import katex from "katex";
import * as React from "react";
import { useEffect, useRef } from "react";

const DisplayKatex = ({ equation, inline, onClick }) => {
  const katexElementRef = useRef(null);

  useEffect(() => {
    const katexElement = katexElementRef.current;

    if (katexElement !== null) {
      katex.render(equation, katexElement, {
        displayMode: !inline, // true === block display //
        errorColor: "#cc0000",
        output: "html",
        strict: "warn",
        throwOnError: false,
        trust: false,
      });
    }
  }, [equation, inline]);

  return (
    <>
      <span role="button" tabIndex={-1} onClick={onClick} ref={katexElementRef} />
    </>
  );
};

export default DisplayKatex;
