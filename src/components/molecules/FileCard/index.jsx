import PropTypes from "prop-types";
import styles from "./FileCard.module.css";

export const FileCard = ({ src, onClick, variant = "rectangle", icon }) => {
  const variants = {
    circle: {
      clsWrapper:
        "group relative cursor-pointer h-[140px] w-[140px] rounded-full bg-neutral-200 flex items-center justify-center",
      clsContainer:
        "relative w-[122px] h-[122px] rounded-full flex items-center justify-center",
      clsOverlay: styles.circleVariant,
      clsFilledOverlay:
        "absolute w-full h-full z-[1] transition rounded-full group-hover:bg-shades-black group-hover:bg-opacity-20",
      clsImage: "h-full w-full object-cover rounded-[4px] rounded-full",
    },
    rectangle: {
      clsWrapper: "group relative cursor-pointer",
      clsContainer: "relative w-[268px] h-[117px]",
      clsOverlay: styles.bannerVariant,
      clsFilledOverlay:
        "absolute w-full h-full z-[1] transition rounded-[4px] group-hover:bg-shades-black group-hover:bg-opacity-20",
      clsImage: "h-full w-full object-cover rounded-[4px]",
    },
    product: {
      clsWrapper: "group relative cursor-pointer",
      clsContainer: "relative w-[120px] h-[77px]",
      clsOverlay: styles.bannerVariant,
      clsFilledOverlay:
        "absolute w-full h-full z-[1] transition rounded-[4px] group-hover:bg-shades-black group-hover:bg-opacity-20",
      clsImage: "h-full w-full object-cover rounded-[4px]",
    },
  };

  return (
    <div className={variants[variant]?.clsWrapper} onClick={onClick}>
      <div className={variants[variant]?.clsContainer}>
        <div
          className={
            !src
              ? variants[variant]?.clsOverlay
              : variants[variant]?.clsFilledOverlay
          }
        ></div>
        {!src && icon && <div className="absolute z-[2]">{icon}</div>}
        {!!src && (
          <img src={src} alt="File" className={variants[variant]?.clsImage} />
        )}
      </div>
    </div>
  );
};

FileCard.propTypes = {
  src: PropTypes.string.isRequired,

  onClick: PropTypes.func,

  variant: PropTypes.oneOf(["circle", "rectangle"]),
  icon: PropTypes.node,
};
