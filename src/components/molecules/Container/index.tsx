import { FC, ReactNode } from "react";

interface ContainerProps extends JSX.IntrinsicAttributes {
  children?: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children, ...props }): JSX.Element => {
  return (
    <div
      className="px-[15px] sm:px-[30px] md:max-w-[1280px] py-0 md:px-20 "
      {...props}
    >
      {children}
    </div>
  );
};
