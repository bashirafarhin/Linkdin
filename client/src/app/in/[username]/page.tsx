import React from "react";
import ProfileWrapper from "./_components/ProfileWrapper";
import RightSidebar from "@/app/feed/_components/RightSidebar";

export default function page() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4 max-w-7xl mx-auto">
      <ProfileWrapper />
      <aside className="w-full sm:w-[300px] sm:sticky top-4 h-fit">
        <RightSidebar />
      </aside>
    </div>
  );
}
