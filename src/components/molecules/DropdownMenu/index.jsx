import React, { useState } from "react";
import clsx from "clsx";
import styles from "./DropdownMenu.module.css";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Avatar } from "../../atoms/avatar";
import { fonts } from "../../../config/fonts";
import { dropdownVariants } from "./utils";

const triangleDecorator = (
  <svg
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.26795 2C6.03775 0.666666 6.42265 0 7 0C7.57735 -5.96046e-08 7.96225 0.666667 8.73205 2L12.1962 8C12.966 9.33333 13.3509 10 13.0622 10.5C12.7735 11 12.0037 11 10.4641 11H3.5359C1.9963 11 1.2265 11 0.937822 10.5C0.649147 10 1.03405 9.33333 1.80385 8L5.26795 2Z"
      fill="white"
    />
  </svg>
);

export const DropdownMenu = ({
  variant = "avatar",
  avatarSrc = "",
  altText = "",
  label = "",
  options = [],
  buttonProps = {},
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderButtonVariants = () => {
    if (variant === 'button') {
      return (
        <Button
          label={label}
          {...buttonProps}
          className="relative"
          onClick={toggleDropdown}
        >
          <Icon name="icon-add" />
        </Button>
      )
    }

    return (
      <button
        type="button"
        className="relaive flex items-center focus:outline-none"
        onClick={toggleDropdown}
      >
        {
          variant === 'avatar'
            ? <Avatar imageSrc={avatarSrc} altText={altText} />
            : <Icon name="icon-ellipsis" />
        }
      </button>
    )
  }

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
      >
        <div
          className={clsx(
            "absolute z-10 w-[141px] ring-1 rounded-[4px] ring-shades-black ring-opacity-5",
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
            <div className="absolute right-1 -top-2">{triangleDecorator}</div>
            {options.map((option) => (
              <button
                key={option.value}
                className="w-[calc(100%-16px)] text-left mx-2 py-2 my-1 rounded-[4px] text-shades-black hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200"
                onClick={() => {
                  setIsOpen(false);
                  option.action();
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

DropdownMenu.propTypes = {
  avatarSrc: PropTypes.string,
  altText: PropTypes.string,
  buttonLabel: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf(["avatar", "button", "dots"]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      action: PropTypes.func,
    })
  ),
};
