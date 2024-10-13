import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
  className?: string;
}

const statusBadges: Record<Status, { label: string; color: "red" | "purple" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In progress", color: "purple" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status, className }: Props) => {
  const { color, label } = statusBadges[status];

  return (
    <Badge className={className} color={color}>
      {label}
    </Badge>
  );
};

export default IssueStatusBadge;
