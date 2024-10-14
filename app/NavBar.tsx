"use client";

import Link from "next/link";
import React from "react";
import { IoBug } from "react-icons/io5";
import ProfileInfo from "./components/ProfileInfo";
import NavLinks from "./components/NavLinks";

const NavBar = () => {
  return (
    <nav className="flex gap-5 h-14 items-center px-5 border-b max-w-4xl m-auto">
      <Link href="/">
        <IoBug size={30} />
      </Link>

      <NavLinks />
      <ProfileInfo />
    </nav>
  );
};

export default NavBar;
