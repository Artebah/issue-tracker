import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Prop {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Prop) => {
  if (typeof +params.id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gapX="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card className="prose mt-5 dark:text-white ">
        <ReactMarkdown className="dark:prose-headings:text-white dark:prose-strong:text-white dark:prose-blockquote:text-slate-400">
          {issue.description}
        </ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
