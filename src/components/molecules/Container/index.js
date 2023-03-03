export const Container = ({ children, ...props }) => {
  return (
    <div
      className="px-[15px] sm:px-[30px] md:max-w-[1280px] py-0 md:px-20 "
      {...props}
    >
      {children}
    </div>
  );
};
