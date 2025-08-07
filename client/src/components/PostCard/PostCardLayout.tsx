import React from "react";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  name: string;
  bio?: string;
  content: string;
  username: string;
  time: React.ReactNode;
};

export default function PostCardLayout({
  name,
  bio = "No bio",
  content,
  username,
  time,
}: Props) {
  return (
    <div className="w-full border border-gray-200 bg-white rounded-lg shadow p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Avatar name={name} />
        <div>
          <Link href={`/in/${username}`}>
            <p className="font-semibold text-black hover:underline hover:text-blue-600 transition">
              {name}
            </p>
          </Link>
          <div className="flex items-center text-xs text-gray-500">
            {bio && <p>{bio}</p>}
            {bio && time && (
              <span className="mx-1 text-black text-[20px]">•</span>
            )}
            <p className="text-[10px] text-gray-400">{time}</p>
          </div>
        </div>
      </div>
      <p className="text-md p-4 whitespace-pre-line break-words">{content}</p>
    </div>
  );
}
