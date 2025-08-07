"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import CreatePost from "./CreatePost";
import Image from "next/image";

export default function ActionButtons() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border border-gray-200 bg-white rounded-lg p-4 space-y-2 shadow">
        {/* Top Input Row */}
        <div className="flex items-center space-x-3">
          <Image
            width={10}
            height={10}
            priority
            src="/user.png"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Start a post"
            className="w-full border border-gray-400 hover:bg-gray-200 transition rounded-full px-4 py-2 outline-none text-sm placeholder-gray-600 cursor-pointer"
            onClick={() => setIsOpen(true)}
            readOnly
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 font-medium">
          <button className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded">
            <svg
              className="w-5 h-5 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 15l-3.5-3.5 1.41-1.41L10 12.17l5.59-5.59L17 8l-7 7z" />
            </svg>
            <span>Video</span>
          </button>

          <button className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 19V5H3v14h18z" />
            </svg>
            <span>Photo</span>
          </button>

          <button className="flex items-center space-x-1 hover:bg-gray-100 px-3 py-1 rounded">
            <svg
              className="w-5 h-5 text-orange-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v2H4zm0 6h16v2H4zm0 6h10v2H4z" />
            </svg>
            <span>Write article</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreatePost />
      </Modal> */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreatePost onPostSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
