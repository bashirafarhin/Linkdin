"use client";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modalContent = document.getElementById("modal-content");
      if (modalContent && !modalContent.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="w-full h-full fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-30">
      <div
        id="modal-content"
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        {children}
      </div>
    </div>
  );
}
