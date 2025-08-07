"use client";
import Link from "next/link";

const JoinNowButton = () => {
  return (
    <span>
      New to LinkedIn?{" "}
      <Link href="/signup">
        <span className="text-blue-600 hover:underline cursor-pointer">
          Join now
        </span>
      </Link>
    </span>
  );
};

export default JoinNowButton;
