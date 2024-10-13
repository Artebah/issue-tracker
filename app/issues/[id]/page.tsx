import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Prop {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Prop) => {
  if (typeof params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toLocaleDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
