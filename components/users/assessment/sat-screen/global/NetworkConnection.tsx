import React from "react";
// components
import Button from "@components/ui/Button";
import Modal from "@components/ui/Modal";

const NetworkConnection = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator?.onLine);
    };
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  const onSubmit = () => {
    setIsOnline(true);
  };

  return (
    <>
      <Modal
        size={`sm`}
        title={`Connection Error`}
        modal={!isOnline}
        setModal={() => {}}
        onClose={() => {}}
        bottomNavigation={false}
      >
        <div className="py-4">
          The connection has been lost. Please check your internet connection and try again.
        </div>
        <div className="flex gap-3 justify-end items-center">
          <Button onClick={onSubmit} size="sm" disabled={!isOnline}>
            Retry
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default NetworkConnection;
