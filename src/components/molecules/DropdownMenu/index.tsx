import { FC, useState } from "react";
import clsx from "clsx";
import styles from "./DropdownMenu.module.css";
import { Transition } from "@headlessui/react";
import { Button, ButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Avatar } from "../../atoms/avatar";
import { fonts } from "../../../config/fonts";
import { dropdownVariants } from "./utils";
import TriangleDecorator from "./TriangleDecorator";

type Option = {
  label: string;
  value: string;
  action: () => void;
};

export interface DropdownMenuProps {
  avatarSrc?: string;
  altText?: string;
  buttonLabel?: string;
  label?: string;
  variant?: keyof typeof dropdownVariants;
  options: Option[];
  buttonProps?: ButtonProps;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  variant = "avatar",
  avatarSrc = "",
  altText = "",
  label = "",
  options = [],
  buttonProps = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderButtonVariants = () => {
    if (variant === "button") {
      return (
        <Button
          label={label}
          {...buttonProps}
          className="relative"
          onClick={toggleDropdown}
        >
          <Icon name="icon-chevron-down" />
        </Button>
      );
    }

    return (
      <button
        type="button"
        className="relaive flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        {variant === "avatar" ? (
          <Avatar imageSrc={avatarSrc} altText={altText} />
        ) : (
          <Icon name="icon-ellipsis" />
        )}
      </button>
    );
  };

  return (
    <div className="relative flex">
      {renderButtonVariants()}

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="z-10"
      >
        <div
          className={clsx(
            "absolute z-10 w-[141px] ring-1 rounded-[4px] ring-shades-black ring-opacity-5 !shadow-extra",
            styles.dropdown,
            styles.dropdownTriangle,
            dropdownVariants[variant]
          )}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="absolute right-1 -top-2">
              <TriangleDecorator />
            </div>
            {options.map((option) => (
              <button
                key={option.value}
                className="w-[calc(100%-16px)] text-left mx-2 py-2 my-1 rounded-[4px] text-shades-black hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200"
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                <div
                  className={clsx(
                    "px-2",
                    fonts.text.md,
                    fonts.fontWeights.regular
                  )}
                >
                  {option.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};
