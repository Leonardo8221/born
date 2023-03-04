import clsx from "clsx";
import { FC } from "react";
import { shadowVariants } from "@/config/shadows";

interface StyledShadowProps {
  shadow: 'sm' | 'md' | 'lg';
  children?: JSX.Element;
}

const StyledShadow: FC<StyledShadowProps> = ({ shadow, children }) => {
  return (
    <div
      className={clsx(
        "h-[195px] w-[600px] rounded-[8px]",
        shadowVariants[shadow || "sm"]
      )}
    >
      {children}
    </div>
  );
};

export const Shadow: FC = (): JSX.Element => {
  return (
    <div>
      <div className="flex w-full mb-8">
        <div className="w-[332px]">
          <h3 className="font-medium text-[24px] m-0 mb-2.5">Shadow A</h3>
          <p>Blur: 88, Y:0, X:0, A: 8%</p>
        </div>
        <div>
          <StyledShadow shadow="sm" />
        </div>
      </div>
      <div className="flex w-full mb-8">
        <div className="w-[332px]">
          <h3 className="font-medium text-[24px] m-0 mb-2.5">Shadow B</h3>
          <p>Blur: 12.17, Y:6.08, X:0, A: 10%</p>
        </div>
        <div>
          <StyledShadow shadow="md" />
        </div>
      </div>
      <div className="flex w-full mb-8">
        <div className="w-[332px]">
          <h3 className="font-medium text-[24px] m-0 mb-2.5">Shadow C</h3>
          <p>Blur: 91.25, Y:0, X:0, A: 15%</p>
        </div>
        <div>
          <StyledShadow shadow="lg" />
        </div>
      </div>
    </div>
  );
};
