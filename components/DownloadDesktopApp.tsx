import React from "react";
// component
import Button from "@components/buttons";
// ui icons
import WindowsIcon from "@ui/icons/windowsIcon";
import AppleIcon from "@ui/icons/appleIcon";
const DownloadDesktopApp = () => {
  const downloadLink = [
    {
      key: "windows",
      link: "https://publish-desktop.s3.ap-south-1.amazonaws.com/Zuperscore-win.exe",
    },
    {
      key: "mac-intel",
      link: "https://publish-desktop.s3.ap-south-1.amazonaws.com/Zuperscore-intel.dmg",
    },
    {
      key: "mac-silicon",
      link: "https://publish-desktop.s3.ap-south-1.amazonaws.com/Zuperscore-arm.dmg",
    },
  ];
  const downloadHandler = (key: string) => {
    const foundLink = downloadLink.find((data) => data.key === key);
    if (foundLink) {
      window.open(foundLink.link, "_blank");
    } else {
      alert("Link is not Available");
    }
  };
  return (
    <>
      <div className="flex gap-10 py-11 justify-center align-items-center border px-4  z-0">
        <Button
          size="md"
          className="rounded-sm shadow-sm w-1/3 relative group"
          onClick={() => downloadHandler("windows")}
        >
          <div className="flex flex-col justify-center p-2 items-center space-y-2">
            <WindowsIcon />
            <div className="text-center">Download for Windows</div>
            <div className="absolute bottom-0 left-0 right-0 bg-white text-black text-center py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Click here for Windows
            </div>
          </div>
        </Button>
        <Button
          size="md"
          className="rounded-sm shadow-sm w-1/3 relative group"
          onClick={() => downloadHandler("mac-intel")}
        >
          <div className="flex flex-col justify-center p-2 items-center space-y-2">
            <AppleIcon />
            <div className="text-center">Download for Mac (Intel)</div>
            <div className="absolute bottom-0 left-0 right-0 bg-white text-black text-center py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Click here for Mac Intel
            </div>
          </div>
        </Button>
        <Button
          size="md"
          className="rounded-sm shadow-sm w-1/3 relative group"
          onClick={() => downloadHandler("mac-silicon")}
        >
          <div className="flex flex-col justify-center p-2 items-center space-y-2">
            <AppleIcon />
            <div className="text-center">Download for Mac (Silicon)</div>
            <div className="absolute bottom-0 left-0 right-0 bg-white text-black text-center py-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Click here for M1 and M2 Processors
            </div>
          </div>
        </Button>
      </div>
    </>
  );
};
export default DownloadDesktopApp;
