"use client";

import React from "react";
import { useSelector } from "react-redux";
import NavBarBeforeSignIn from "./NavBarBeforeSignIn";
import NavBarAfterSignIn from "./NavBarAfterSignIn";
import { RootState } from "@/Redux/store";

const Navbar = () => {
  const { data } = useSelector((state: RootState) => state.user);

  return data ? (
    <NavBarAfterSignIn username={data.username} />
  ) : (
    <NavBarBeforeSignIn />
  );
};

export default Navbar;
