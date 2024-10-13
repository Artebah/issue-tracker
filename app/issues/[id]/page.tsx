import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FiEdit } from "react-icons/fi";
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
    <Grid className="max-w-3xl" gap="3" columns={{ initial: "1", md: "1fr auto" }}>
      <Box>
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
      </Box>
      <Box>
        <Button>
          <FiEdit />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
