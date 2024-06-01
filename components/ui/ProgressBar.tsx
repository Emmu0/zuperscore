const ProgressBar = ({ percent, color = "bg-[#52BD94]" }: any) => {
    //   simple straight line progress bar
    return (
      <div className="w-full">
        <div className="relative h-[8px] rounded-full bg-gray-200">
          <div
            style={{
              width: `${percent}%`,
            }}
            className={`absolute h-[8px] rounded-full ${color}`}
          ></div>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  