import { FC, Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";
import Header from "./Header";
export interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose?: (event: MouseEvent) => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  title,
  isOpen,
  onClose = () => {},
  children,
}) => {
  return (
    <Transition
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
    >
      <div className="fixed mt-4 h-full w-full flex justify-center items-center top-0 left-0 bottom-0 right-0 z-[50]">
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-40"
          aria-hidden="true"
        />
        <div className="relative z-50 w-full max-w-auto mx-auto bg-shades-white rounded-lg shadow-small">
          <Header title={title} onClose={onClose} />
          <div className="px-8 pt-6 pb-8">{children}</div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
