import { FC, HTMLProps, MouseEvent, useRef } from "react";
import clsx from "clsx";
import { fonts } from "@/config/fonts";
import { closeIcon, searchIcon } from "./icons";

export interface SearchInputProps extends HTMLProps<HTMLInputElement> {
  value: string;
  onClear: (event: MouseEvent<HTMLElement>) => void;
  onEnter: (value: string) => void;
  className?: string;
  inputClasses?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  value = "",
  placeholder = "Search",
  onChange,
  onEnter,
  onClear,
  className = "",
  inputClasses,
  ...rest
}) => {
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onEnter?.(value);
    }
  };

  const inputRef = useRef(null);

  return (
    <div className={clsx("relative flex-grow max-w-[200px]", className)}>
      <span className="absolute flex items-center left-[10px] top-0 bottom-0 my-auto">{searchIcon}</span>
      <input
        className={clsx(
          "flex w-full flex-grow items-center",
          "bg-shades-white text-shades-black placeholder-shades-black border border-neutral-400",
          "outline-none",
          "px-8",
          "rounded-full py-2",
          fonts.text.md,
          inputClasses,
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        ref={inputRef}
        {...rest}
      />
      {value?.length > 0 && (
        <button
          type="button"
          className={clsx(
            "absolute right-2 rounded-full p-0.5 outline-none",
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
