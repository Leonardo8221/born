export const StyledIcon = ({ children, ...props }) => {
  return (
    <div className="inline-block" {...props}>
      {children}
    </div>
  );
};
