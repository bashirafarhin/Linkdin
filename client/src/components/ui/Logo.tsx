"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  const fontSize = `${size * 0.6}px`;

  return (
    <Link
      href="/"
      className={`flex items-center space-x-1 cursor-pointer ${className}`}
    >
      <span
        className="text-blue-700 font-bold tracking-tight"
        style={{ fontSize }}
      >
        Linked
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 34 34"
        className="fill-white"
      >
        <g>
          <rect width="34" height="34" rx="4" fill="#0A66C2" />
          <path
            d="M8 13h4v13H8V13zm2-6a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5 6h3.8v1.8h.1c.5-1 1.8-2 3.7-2 4 0 4.8 2.6 4.8 6v7.2h-4V19c0-1.4 0-3.3-2-3.3-2 0-2.3 1.5-2.3 3.2v7.1H15V13z"
            fill="white"
          />
        </g>
      </svg>
    </Link>
  );
}
