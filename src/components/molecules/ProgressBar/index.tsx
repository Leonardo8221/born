import React from "react";

interface ProgressBarProps {
  percentage: number;
}

function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="pb-10 text-center max-w-[75%]">
        <p className="text-[#333333] text-[14px] font-light">
          Please wait while we are processing your upload. This can take a
          minute.
        </p>
        <h1 className="text-[24px] text-[#333333]">{percentage}%</h1>
      </div>
      <div className="relative w-full h-6 bg-[#F0F0F0] rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-[#77D5D3] rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
