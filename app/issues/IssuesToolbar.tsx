import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssuesToolbar = () => {
  return (
    <div className="mb-5 flex justify-between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">Create a new issue</Link>
      </Button>
    </div>
  );
};

export default IssuesToolbar;
