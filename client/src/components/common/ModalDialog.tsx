/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl",
  title?: string;
  children: React.ReactNode;
}

const ModalDialog: React.FC<ModalProps> = ({ isOpen, onClose, title, size, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full max-w-${size || 'xl'} mx-4 overflow-hidden`}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          </div>
        )}
        <div className="px-6 py-4">
          {children}
        </div>
        {onClose && (
          <div className="px-6 py-3 bg-gray-50 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDialog;
