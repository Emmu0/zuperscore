import React, { useState } from "react";
// seo
import Container from "@components/Container";
// layout
import DefaultLayout from "@layouts/DefaultLayout";
// react dnd
import DragDrop from "@components/utilities/DragDrop";

const DND = () => {
  const seoMetaInformation = {
    title: "Index",
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(true);
  };
  const [elementPosition, setElementPosition] = useState({ left: 0, top: 0 });
  return (
    <>
      <Container meta={seoMetaInformation}>
        <DefaultLayout>
          {isOpen && (
            <DragDrop elementPosition={elementPosition} setElementPosition={setElementPosition}>
              <div className="w-[768px]">
                <div className="w-full h-10 bg-black text-white flex justify-between items-center px-4">
                  <div>Refrence Sheet</div>
                  <div>Icon</div>
                  <div className="flex items-center gap-4">
                    <div>Collapse</div>
                    <div onClick={() => setIsOpen(false)} className="cursor-pointer">
                      Exit
                    </div>
                  </div>
                </div>
                <div className=" h-full  transform   bg-white p-8  shadow-xl transition-all">
                  <div className="text-2xl font-semibold leading-6 text-dark-200 pb-4">
                    Update Assessment
                  </div>
                  {/* <form onSubmit={handleSubmit(handleUpdateAssessment)}> */}
                  <div className="mt-4"></div>
                  <div className="mt-4"></div>
                  <div className="mt-4">
                    <div className="text-sm text-dark-100 mb-2">Instructions</div>
                  </div>

                  <div className="flex justify-end items-center pt-8 gap-2">
                    <div>
                      <button
                        className="bg-red-400 border px-4 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </DragDrop>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleModal()}
          >
            Open Modal
          </button>
        </DefaultLayout>
      </Container>
    </>
  );
};

export default DND;
