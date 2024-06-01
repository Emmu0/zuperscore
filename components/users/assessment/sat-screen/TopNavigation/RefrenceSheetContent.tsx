import React from "react";
import Image from "next/image";
const RefrenceSheetContent = () => {
  const imgMathRefObj = [
    { imgPath: "/images/Math Ref/1.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/2.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/3.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/4.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/5 6 both.jpg", imgHeig: 100, imgWid: 180 },
    { imgPath: "/images/Math Ref/7.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/8.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/9.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/10.jpg", imgHeig: 100, imgWid: 80 },
    { imgPath: "/images/Math Ref/11.jpg", imgHeig: 100, imgWid: 80 },
  ];

  return (
    <div className="h-full bg-white p-8">
      {imgMathRefObj.map((image, index) => (
        <span className="p-4" key={index}>
          <Image src={image.imgPath} alt="Image" height={image.imgHeig} width={image.imgWid} />
        </span>
      ))}
      <div className="p-4">
        <div className="flex h-full w-full text-Black-400 pt-1.5">
          The number of degrees of arc in a circle is 360.
        </div>
        <div className="flex h-full w-full text-Black-400 pt-1.5">
          The number of radians of arc in a circle is 2&#960;.
        </div>
        <div className="flex h-full w-full text-Black-400 pt-1.5">
          The sum of the measures in degrees of the angles of a triangle is 180.
        </div>
      </div>
    </div>
  );
};

export default RefrenceSheetContent;
