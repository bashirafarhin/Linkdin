import React from "react";

const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center justify-center hover:text-black cursor-pointer">
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </div>
);

export default NavItem;
