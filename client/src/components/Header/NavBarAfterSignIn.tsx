"use client";

import React from "react";
import {
  FaHome,
  FaUserFriends,
  FaBriefcase,
  FaBell,
  FaComments,
} from "react-icons/fa";
import NavItem from "./NavItem";
import Link from "next/link";
import Image from "next/image";

interface NavBarAfterSignInProps {
  username: string;
}

const NavBarAfterSignIn: React.FC<NavBarAfterSignInProps> = ({ username }) => {
  return (
    <div className="hidden md:flex gap-6 text-gray-600 text-sm">
      <NavItem icon={<FaHome />} label="Home" />
      <NavItem icon={<FaUserFriends />} label="My Network" />
      <NavItem icon={<FaBriefcase />} label="Jobs" />
      <NavItem icon={<FaComments />} label="Messaging" />
      <NavItem icon={<FaBell />} label="Notifications" />

      <Link href={`/in/${username}`}>
        <div className="flex flex-col items-center cursor-pointer">
          <Image
            width={8}
            height={8}
            priority
            src="/user.png"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-xs">Me</span>
        </div>
      </Link>
    </div>
  );
};

export default NavBarAfterSignIn;
