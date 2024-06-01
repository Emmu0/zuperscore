import React from "react";

interface IFullScreenMode {}

const FullScreenMode: React.FC<IFullScreenMode> = () => {
  const [isFullScreen, setIsFullScreen] = React.useState(true);

  React.useEffect(() => {
    const checkFullScreen = setInterval(() => {
      const fullScreeCheck = document.fullscreenElement;
      if (fullScreeCheck) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    }, 1000);
    return () => clearInterval(checkFullScreen);
  }, []);

  const handleFullScreenMode = async () => {
    try {
      if (document.documentElement) await document.documentElement?.requestFullscreen();
    } catch (error) {}
  };
  React.useEffect(() => {
    handleFullScreenMode();
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);
  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`bg-[#000000] text-[#ffffff] w-full flex flex-col justify-center items-center text-2xl p-5 h-screen fixed z-20 ${
            isFullScreen ? "hidden" : ""
          }`}
        >
          <div className="mx-10 my-4 text-center">
            <div>Please note that the test can only be done in full-screen mode.</div>
            <div>Also, if you switch to another tab, the test will get auto-submitted</div>
            <div>and you won’t be able to resume the test</div>
          </div>
          <button
            className="bg-[#ffd80e] text-[#000000] rounded-[40px] px-6 py-1 border border-[#000000]  text-sm"
            onClick={handleFullScreenMode}
          >
            Go to Full Screen
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenMode;
