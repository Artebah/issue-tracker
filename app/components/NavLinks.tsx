"use client";
import { usePathname } from "next/navigation";
import React from "react";
import classNames from "classnames";
import Link from "next/link";

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Issues", href: "/issues" },
];

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-4 grow">
      {links.map(({ href, name }) => (
        <li
          className={classNames({
            "nav-link": true,
            "!text-slate-950 dark:!text-slate-50": currentPath === href,
          })}
          key={name}>
          <Link href={href}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
