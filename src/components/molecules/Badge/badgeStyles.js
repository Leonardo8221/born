import clsx from "clsx";

const badgeSizeStyles = {
  sm: "h-5 text-[8px] py-0 px-2",
  lg: "h-6 text-[10px] py-0 px-3",
  xl: 'h-8 text-[12px] py-0 px-4',
};

export const StyledBadge = ({ children, size, className, ...props }) => {
  return (
    <div
      className={clsx(
        "inline-flex text-[#333333] bg-[#F0F0F0] items-center box-border rounded-[100px]",
        badgeSizeStyles[size || "lg"],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
