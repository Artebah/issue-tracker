"use client";

import Link from "next/link";
import React from "react";
import { IoBug } from "react-icons/io5";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import ProfileInfo from "./components/ProfileInfo";

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Issues", href: "/issues" },
];

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex gap-5 h-14 items-center px-5 border-b max-w-4xl m-auto">
      <Link href="/">
        <IoBug size={30} />
      </Link>
      <ul className="flex gap-4 grow">
        {links.map(({ href, name }) => (
          <li
            className={classNames({
              "dark:text-slate-50": currentPath === href,
              "text-slate-400": currentPath !== href,
              "dark:hover:text-slate-50 hover:text-slate-950": true,
            })}
            key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
      <ProfileInfo />
    </nav>
  );
};

export default NavBar;
