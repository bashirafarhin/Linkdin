"use client";

import React from "react";
import {
  FaRocket,
  FaUsers,
  FaLaptop,
  FaBriefcase,
  FaPuzzlePiece,
  FaMobileAlt,
} from "react-icons/fa";
import NavItem from "./NavItem";

const NavBarBeforeSignIn = () => {
  return (
    <div className="hidden md:flex gap-6 text-gray-600 text-sm">
      <NavItem icon={<FaRocket size={18} />} label="Top Content" />
      <NavItem icon={<FaUsers size={18} />} label="People" />
      <NavItem icon={<FaLaptop size={18} />} label="Learning" />
      <NavItem icon={<FaBriefcase size={18} />} label="Jobs" />
      <NavItem icon={<FaPuzzlePiece size={18} />} label="Games" />
      <div className="border-l h-6" />
      <NavItem icon={<FaMobileAlt size={18} />} label="Get the app" />
    </div>
  );
};

export default NavBarBeforeSignIn;
