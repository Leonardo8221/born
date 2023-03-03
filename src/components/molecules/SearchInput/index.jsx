import React, { useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { fonts } from "../../../config/fonts";

const searchIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7.25"
      cy="7.25"
      r="6"
      stroke="#333333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.375 11.7177L15.125 15.4678"
      stroke="#333333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const closeIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00019 23.9999L24.0001 8"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00019 8.00013L24.0001 24"
      stroke="#333333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchInput = ({
  value = "",
  placeholder = "Search",
  onChange,
  onEnter,
  onClear,

  className = "",
  ...rest
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onEnter?.(value);
    }
  };

  const inputRef = useRef(null);

  return (
    <div className={clsx("relative flex-grow max-w-[200px]", className)}>
      <span className="absolute left-[13px] top-2">{searchIcon}</span>
      <input
        className={clsx(
          "flex w-full flex-grow items-center",
          "bg-shades-white text-shades-black placeholder-shades-black border border-neutral-400",
          "outline-none",
          "pr-8 pl-10",
          "rounded-full py-2",
          fonts.text.md
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        ref={inputRef}
        {...rest}
      />
      {value.length > 0 && (
        <button
          type="button"
          className={clsx(
            "absolute right-4 rounded-full p-0.5 outline-none",
            "top-2"
          )}
          onClick={onClear}
        >
          {closeIcon}
        </button>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onEnter: PropTypes.func,
  className: PropTypes.string,
};
