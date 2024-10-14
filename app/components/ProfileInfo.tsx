import { Avatar, DropdownMenu, Skeleton } from "@radix-ui/themes";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileInfo = () => {
  const { data, status } = useSession();

  if (status === "loading") return <Skeleton width="2.5rem" height="2.5rem" className="rounded-full" />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Sign in
      </Link>
    );

  if (!data) return;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          className="cursor-pointer"
          src={data!.user!.image!}
          fallback="?"
          alt="Profile avatar"
          size="3"
          radius="full"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>{data.user!.email}</DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link className="w-full" href="/api/auth/signout">
            Sign out
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ProfileInfo;
