import React from "react";
// components
import Button from "../helpers/button";
import Modal from "@components/ui/Modal";
import Accordion from "@components/utilities/Accordion";

const accordionData = [
  {
    title: "In app calculator",
    content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
      laborum cupiditate possimus labore, hic temporibus velit dicta earum
      suscipit commodi eum enim atque at? Et perspiciatis dolore iure
      voluptatem.`,
  },
  {
    title: "Testing Timers",
    content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
      reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
      quaerat iure quos dolorum accusantium ducimus in illum vero commodi
      pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
      quidem maiores doloremque est numquam praesentium eos voluptatem amet!
      Repudiandae, mollitia id reprehenderit a ab odit!`,
  },
  {
    title: "Option Eliminator",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
  },
  {
    title: "Mark for review",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
      quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
      dolor ut sequi minus iste? Quas?`,
  },
];

interface IAssessmentHelp {
  currentAssessmentMenu?: any;
  handleCurrentAssessmentMenu?: any;
}

const AssessmentHelp: React.FC<IAssessmentHelp> = ({
  currentAssessmentMenu,
  handleCurrentAssessmentMenu,
}) => {
  const [isModal, setModal] = React.useState<any>(false);

  React.useEffect(() => {
    if (currentAssessmentMenu) {
      setModal(true);
    }
  }, [currentAssessmentMenu]);

  return (
    <>
      <Modal
        title={`Help`}
        size={`xl`}
        modal={isModal}
        setModal={() => {
          setModal(false);
          setTimeout(() => {
            handleCurrentAssessmentMenu(null);
          }, 500);
        }}
        onClose={() => {}}
        bottomNavigation={false}
      >
        <div className="flex-grow overflow-y-auto">
          {accordionData.map((item, index) => {
            return <Accordion title={item.title} content={item.content} key={index} />;
          })}
        </div>
        <div className="w-full flex items-center justify-end mt-4">
          <Button
            variant="warning"
            onClick={() => {
              setModal(false);
              setTimeout(() => {
                handleCurrentAssessmentMenu(null);
              }, 500);
            }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AssessmentHelp;
