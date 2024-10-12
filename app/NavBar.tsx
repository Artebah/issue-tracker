import Link from "next/link";
import React from "react";
import { IoBug } from "react-icons/io5";

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Issues", href: "/issues" },
];

const NavBar = () => {
  return (
    <nav className="flex gap-5 h-14 items-center px-5 border-b">
      <Link href="/">
        <IoBug size={30} />
      </Link>
      <ul className="flex gap-4">
        {links.map(({ href, name }) => (
          <li className="hover:text-slate-50 text-slate-400" key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
