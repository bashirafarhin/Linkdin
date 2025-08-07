import React from "react";
import LeftSidebar from "./_components/LeftSidebar";
import RightSidebar from "./_components/RightSidebar";
import ActionButtons from "./_components/ActionButtons";
import Feed from "./_components/Feed";

const page = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-center gap-4 p-4 max-w-7xl mx-auto">
      <aside className="w-full sm:w-[250px] sm:sticky top-4 h-fit">
        <LeftSidebar />
      </aside>

      <main className="w-full sm:flex-1 max-w-2xl space-y-4">
        <ActionButtons />
        <div className="h-[0.2] w-full bg-gray-500" />
        <Feed />
      </main>

      <aside className="w-full sm:w-[300px] sm:sticky top-4 h-fit">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default page;
