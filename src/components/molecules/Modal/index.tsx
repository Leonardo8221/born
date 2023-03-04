import { FC, Fragment, ReactNode } from "react";
import { Transition } from '@headlessui/react';
import Header from "./Header";

export interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose?: (e: any) => void;
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
      <div className="h-[90vh] w-full flex justify-center items-center">
        <div className="fixed inset-0 bg-shades-black/30 z-40" aria-hidden="true" />
        <div className="relative z-50 w-full max-w-[736px] mx-auto bg-shades-white rounded-lg shadow-small">
          <Header title={title} onClose={onClose} />
          <div className="px-8 pt-6 pb-8">
            {children}
          </div>
        </div>
      </div>
    </Transition>
  )
};

export default Modal;
