import Button from "@components/buttons";

type ModalFooterProps = {
  position?: "left" | "right";
  closeToggle: boolean;
  closeButton?: Function;
  continueButton?: Function;
  children?: any;
};

const ModalFooter = (props: ModalFooterProps) => {
  return (
    <>
      <div className="mt-4">
        {props.children ? (
          props.children
        ) : (
          <div className={`flex gap-2 ${props.position === "right" ? "justify-end" : null}`}>
            {props.closeToggle ? (
              <Button variant="secondary" onClick={props.closeButton}>
                Close
              </Button>
            ) : null}
            {props.continueButton ? <Button onClick={props.continueButton}>Continue</Button> : null}
          </div>
        )}
      </div>
    </>
  );
};

ModalFooter.defaultProps = {
  position: "right",
  closeToggle: true,
};

export default ModalFooter;
