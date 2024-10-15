import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Avatar, Card, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading mb="3" size="4" ml="2">
        Latest issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <div className="flex justify-between gap-3">
                  <div className="flex flex-col items-start gap-2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                  {issue.assignedToUser && (
                    <Avatar
                      radius="full"
                      size={{ initial: "3", sm: "4" }}
                      src={issue.assignedToUser.image!}
                      fallback="?"
                    />
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
