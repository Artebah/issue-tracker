import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, StyledLink } from "../components";
import IssuesToolbar from "./IssuesToolbar";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssuesToolbar />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, title, description, status, updatedAt, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <div className="flex flex-col gap-1 items-start">
                  <StyledLink href={`/issues/${id}`}>{title}</StyledLink>
                  <IssueStatusBadge className="inline-block md:hidden text-xs mt-1" status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">{createdAt.toLocaleDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
