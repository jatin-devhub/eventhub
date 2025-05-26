import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="border border-black bg-white rounded p-6 w-full max-w-md">
        <div className="flex justify-end mb-4">
          <button className="bg-red-500 p-2 text-white cursor-pointer" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
