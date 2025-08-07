"use client";

import React from "react";
import cn from "@/lib/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border border-gray-500 text-gray-500 px-2 py-0.5 hover:scale-105 rounded-md whitespace-nowrap hover:cursor-pointer",
        disabled ? "cursor-not-allowed" : "",
        className
      )}
    >
      {children}
    </button>
  );
}
