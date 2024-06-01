import React from "react";
import ReactDOMServer from "react-dom/server";
// recoil
import { useRecoilState } from "recoil";
import * as assessmentRecoil from "recoil/assessments/index";
// uuid
import { v4 as uuidV4 } from "uuid";
// component
import AnnotateTooltip from "./AnnotationToolTip";

const AnnotationTextField = ({ id, attempt }: any) => {
  const [attempts, recoilAttempts] = useRecoilState(assessmentRecoil.attemptSelector);
  const [currentAttempt, recoilCurrentAttemptSet] = useRecoilState(
    assessmentRecoil.currentAttemptSelector
  );

  const [annotationToggle, recoilAnnotationToggle] = useRecoilState(
    assessmentRecoil.annotationToggle
  );
  const [annotationSelectedText, recoilAnnotationSelectedText] = useRecoilState(
    assessmentRecoil.annotationSelectedTextSelector
  );

  const handleSelectionReplace = () => {
    let selection: any = window.getSelection();
    let range: any = selection && selection.getRangeAt(0);

    if (selection && range && selection.rangeCount) {
      recoilAnnotationSelectedText({ selection: selection, range: range, selectedText: selection.toString() });
    }
  };

  React.useEffect(() => {
    document?.getElementById(id)?.addEventListener("mouseup", handleSelectionReplace);
    return () =>
      document?.getElementById(id)?.removeEventListener("mouseup", handleSelectionReplace);
  }, []);

  const [formData, setFormData] = React.useState({
    color: "#ffff00",
    decoration: "underline",
    content: "",
  });
  const handleFormData = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const submitAnnotationModal = () => {
    let { selection, range }: any = annotationSelectedText;
    let fragment: any = range && range.extractContents();

    if (selection && range && selection.rangeCount) {
      if (fragment && fragment.childNodes && fragment.childNodes.length > 0) {
        fragment.childNodes.forEach((e: any) => e.data);

        let elementId = uuidV4();

        let element: any = document.createElement("span");
        element.appendChild(fragment);
        element.setAttribute("id", elementId);
        element.innerHTML = ReactDOMServer.renderToString(
          <AnnotateTooltip
            id={elementId}
            color={formData.color}
            decoration={formData.decoration}
            popupContent={formData.content}
            content={annotationSelectedText?.selectedText}
          />
        );
        element.addEventListener("click", () => {
          console.log("id", elementId);
        });

        range.insertNode(element);

        // setting up in the content in question

        console.log("selected.toString()", selection.toString());

        let annotateData = {
          selection: selection,
          range: range,
          fragment: fragment,
          id: elementId,
          color: formData.color,
          decoration: formData.decoration,
          content: formData.content,
        };

        let attemptPayload = {
          ...attempt,
          data:{
            ...attempt?.data,
            annotated_html: document?.getElementById(id)?.innerHTML,
            annotated_data:
            attempt && attempt?.annotated_data && attempt?.annotated_data.length > 0
            ? [...attempt?.annotated_data, annotateData]
            : [annotateData],
          }
        };

        recoilCurrentAttemptSet({ ...attemptPayload });
        recoilAttempts({
          type: "update",
          data: { ...attemptPayload },
        });
        recoilAnnotationToggle(false);
        recoilAnnotationSelectedText(null);
        clearAnnotationFields()
      }
    }
  };

  const closeAnnotationModal = () => {
    recoilAnnotationToggle(false);
    recoilAnnotationSelectedText(null);
    clearAnnotationFields()
  };

  const clearAnnotationFields = () => {
    setFormData({
      color: "#ffff00",
      decoration: "underline",
      content: "",
    })
  }

  // const RenderHtmlString = () => {
  //   let htmlStringElement: any = document?.getElementById(id)?.innerHTML;

  //   let array =
  //     htmlStringElement &&
  //     htmlStringElement.length > 0 &&
  //     htmlStringElement.split(/(<b\s[^>]*id="[^"]+">[\s\S]*?<\/b>)|(<\/?b[^>]*>)/gi);
  //   console.log("array", array);

  //   array && array.length > 0 ? array : [attempt?.annotated_html];

  //   return (
  //     <>
  //       {htmlStringElement && htmlStringElement.length > 0 && array && array.length > 0 && (
  //         <>
  //           {array.map((_question: any, index: any) => {
  //             if (!_question) return;
  //             if (_question.startsWith("<b")) {
  //               <AnnotateTooltip />;
  //             } else {
  //               return <span dangerouslySetInnerHTML={{ __html: _question }}></span>;
  //             }
  //           })}
  //         </>
  //       )}
  //     </>
  //   );
  // };

  return (
    <>
      {/* edit annotation */}
      {annotationToggle && (
        <div
          className={`fixed
        z-10 bottom-0 inset-x-0 p-0 w-full bg-gray-50 shadow-outline-black`}
        >
          <div className="relative w-full bg-white overflow-hidden shadow-xl ">
            <div className="bg-black px-9">
              <div className="container mx-auto flex justify-between py-2">
                <h2 className="text-sm font-medium text-white">
                  New annotation
                  : {annotationSelectedText?.selectedText}
                </h2>
                <button
                  className="text-white text-sm font-medium"
                  onClick={closeAnnotationModal}
                >
                  CLOSE
                </button>
              </div>
            </div>

            <div className="container mx-auto p-5 ml-4 space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex items-center text-sm text-bold font-medium gap-2">
                  Highlight color:
                  <input
                    type="color"
                    value={formData?.color}
                    onChange={(e: any) => handleFormData("color", e.target.value)}
                  ></input>
                </div>
                <div className="flex text-sm text-bold font-medium items-center">
                  <div>Underline Style:</div>
                  <div className="underline decoration-dashed px-1 border-2 font-semibold border-black rounded mx-2">
                    U
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  rows={5}
                  value={formData?.content}
                  className="w-3/5 border outline-none overflow-hidden resize-none border-gray-400 p-2"
                  onChange={(e: any) => handleFormData("content", e.target.value)}
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={submitAnnotationModal}
                  className="inline-flex justify-center rounded-full border border-transparent px-4 py-2 bg-blue-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo active:bg-indigo-800"
                  disabled={annotationSelectedText?.length == 0}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeAnnotationModal}
                  className="inline-flex justify-center ml-5 rounded-md border border-transparent px-4 py-2 bg-white text-sm leading-6 font-medium text-black shadow-sm focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnotationTextField;
