import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <FiEdit />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
