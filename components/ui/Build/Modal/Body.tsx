type ModalBodyProps = {
  children: any;
};

const ModalBody = (props: ModalBodyProps) => {
  return (
    <>
      <div className="mt-2">{props.children}</div>
    </>
  );
};

export default ModalBody;
