const AnnotateTooltip = ({ id, color, decoration, popupContent, content }: any) => {
  return (
    <span className="inline-block group relative max-w-xs">
      <span className="toolTipPointer text-sm z-10 hidden w-max max-w-[100px] group-hover:block absolute bg-white p-0.5 border-2 border-black top-[120%] left-0 rounded-md ">
        {popupContent}
      </span>
      <span
        className="px-1 underline decoration-dashed rounded-md hover:text-blue-700 transition duration-150 ease-in-out"
        style={{ backgroundColor: `${color}` }}
      >
        {content}
      </span>
    </span>
  );
};

export default AnnotateTooltip;
