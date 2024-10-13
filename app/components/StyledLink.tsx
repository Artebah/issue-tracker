import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import React from "react";

interface Props {
  href: string;
  children: string;
}
const StyledLink = ({ href, children }: Props) => {
  return (
    <NextLink passHref legacyBehavior href={href}>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default StyledLink;
