import { Tag } from "../../atoms/Tag";
import PropTypes from "prop-types";

const variants = {
  "1-row": "flex gap-2",
  "2-rows": "grid grid-cols-2 gap-2",
};

export const TagCollection = ({
  title,
  tags = [],
  variant = "1-row",
  children,
}) => {
  return (
    <div className={variants[variant]}>
      {tags?.map((tag, index) => {
        return <Tag key={index} {...tag} />;
      })}
      {children}
    </div>
  );
};

TagCollection.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.string,
      className: PropTypes.string,
      children: PropTypes.node,
    })
  ),
  variant: PropTypes.oneOf(["1-row", "2-rows"]),
  children: PropTypes.node,
};
