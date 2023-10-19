import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";

type ConfirmModalProps = {
  title: React.ReactNode;
  body: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = (props: ConfirmModalProps) => {
  const { title, body, open, onClose, onConfirm } = props;
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      confirmBtnRef.current?.focus();
    }
  }, [open]);

  const content = (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 scale-0 bg-black/80 transition-all duration-300  z-[100]  ${
        open ? "scale-100" : "pointer-events-none delay-150"
      }`}
    >
      <div
        className={`fixed z-[101] duration-300 scale-0 ${
          open ? "scale-100 delay-150" : ""
        } top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded p-5 min-w-[90%] md:min-w-[500px]`}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-xl">
          <HiX />
        </button>
        <h1 className="text-xl font-bold my-2 text-start">{title}</h1>
        <p className="text-black/80 text-sm font-medium">{body}</p>
        <div className="mt-7 flex justify-end items-center gap-2">
          <button
            onClick={onClose}
            className="px-2 py-1 border border-black hover:text-white rounded font-medium focus:outline focus:outline-2 focus:outline-black/80 focus:outline-offset-2 hover:bg-black/80 active:bg-black duration-200"
          >
            Cancel
          </button>
          <button
            ref={confirmBtnRef}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-2 py-1 border border-black bg-black text-white rounded font-medium focus:outline focus:outline-2 focus:outline-black/80 focus:outline-offset-2 hover:bg-black/80 active:bg-black duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
  return createPortal(content, document.body);
};

export default ConfirmModal;
