import React, { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  // Close modal on pressing the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-lg p-6 shadow-lg transition-transform transform duration-300 ease-in-out ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute rounded-full top-[-.6rem] h-[1.5rem] w-[1.5rem] right-[-.6rem] bg-slate-200  text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
