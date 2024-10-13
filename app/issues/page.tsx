import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">Create a new issue</Link>
        </Button>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:block">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:block">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, title, description, status, updatedAt, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <p>{title}</p>
                <p className="block md-hidden text-xs mt-1">{status}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:block">{status}</Table.Cell>
              <Table.Cell className="hidden md:block">{createdAt.toLocaleDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
