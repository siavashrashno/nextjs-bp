import Close from "@svg/close";
import cn from "classnames";
import React, { Fragment, ReactNode } from "react";
import { Transition, Dialog } from "@headlessui/react";

interface Props {
  onClose: () => void;
  open: boolean;
  cancelable: boolean;
  children?: ReactNode;
}

const Modal: React.FC<Props> = ({ open, cancelable, onClose, children }) => {
  const _onClose = () => {
    if (cancelable) onClose();
  };
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[60] overflow-y-auto"
        onClose={_onClose}
      >
        <div className="min-h-screen px-0 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 blurred-container-md" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cn(
                "inline-block relative w-full max-w-2xl pt-12 pb-14 px-6 align-middle transition-all transform bg-white shadow-xl rounded-[1.1875rem]"
              )}
            >
              {cancelable ? (
                <div className="absolute right-6 top-6 flex justify-end ">
                  <button
                    className="w-6 h-6 focus:outline-none "
                    onClick={() => {
                      _onClose();
                    }}
                  >
                    <Close className="text-primary" />
                  </button>
                </div>
              ) : null}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
