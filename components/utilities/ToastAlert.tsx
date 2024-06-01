import React from "react";
// components
import Toast from "@components/ui/Toaster";
// context
import { globalContext } from "contexts/GlobalContextProvider";


const RenderToast = ({ data }: any) => {
  const [globalState, globalDispatch] = React.useContext(globalContext);

  const handleToastClose = () => {
    globalDispatch({ type: "REMOVE_TOAST_ALERT", payload: data });
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleToastClose();
    }, data.interval * 1000);
  }, []);

  return (
    <Toast
      title={data.title}
      content={data.content}
      type={data.type}
      handleButtonClick={handleToastClose}
      show={true}
    />
  );
};

const ToastAlert = () => {
  const [globalState, globalDispatch] = React.useContext(globalContext);
  
  return (
    <>
      {globalState.toastAlert.length > 0 && (
        <div className="top-5 right-0 md:right-5 fixed z-50 w-full md:max-w-sm flex flex-col gap-1.5">
          {globalState.toastAlert.map((item: any, i: any) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <RenderToast data={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ToastAlert;

