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

  const handleFullScreenMode = () => {
    if(document.documentElement)
    document.documentElement?.requestFullscreen();
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`bg-[#000000] text-[#ffffff] w-full flex flex-col justify-center items-center text-2xl p-5 h-screen fixed z-20 ${
            isFullScreen ? "hidden" : ""
          }`}
        >
          <div className="m-10">Give Test in Full Screen Mode</div>
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
