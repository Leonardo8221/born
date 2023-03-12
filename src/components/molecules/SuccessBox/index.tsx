import React from "react";
import { Button } from "../Button";
import CheckIcon from "@/assets/svgs/success-icon.svg";
import { useRouter } from "next/router";

interface SuccessMessageBox {
  placeholder: string;
  buttonLabel: string;
}

function SuccessMessageBox({ placeholder, buttonLabel }: SuccessMessageBox) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <div className="pb-10 max-w-[75%] text-center">
        <CheckIcon className="w-[45px] h-[45px] m-auto mb-5" />
        <p className="text-[#333333] text-[14px] font-light">{placeholder}</p>
      </div>
      <Button label={buttonLabel} onClick={() => router.back()} />
    </div>
  );
}

export default SuccessMessageBox;
