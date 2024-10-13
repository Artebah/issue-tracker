import prisma from "@/prisma/client";
import { Table, Link } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssuesToolbar from "./IssuesToolbar";
import delay from "delay";
import StyledLink from "../components/StyledLink";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  //await delay(2000);

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
                <StyledLink href={`/issues/${id}`}>{title}</StyledLink>
                <IssueStatusBadge className="inline-block md:hidden text-xs mt-1" status={status} />
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

export default IssuesPage;
