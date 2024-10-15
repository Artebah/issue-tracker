import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, StyledLink } from "../components";
import IssuesToolbar from "./IssuesToolbar";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";

interface IColumn {
  label: string;
  value: keyof Issue;
  className?: string;
}
const columns: IColumn[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; order: "asc" | "desc" };
}) => {
  const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.order || "asc" } : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: searchParams.status || undefined },
    orderBy,
  });

  return (
    <div>
      <IssuesToolbar />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const isCurrentSortCol = column.value === searchParams.orderBy;
              const nextOrder = isCurrentSortCol && searchParams.order === "asc" ? "desc" : "asc";
              console.log(nextOrder);

              return (
                <Table.ColumnHeaderCell key={column.value} className={column.className}>
                  <NextLink href={{ query: { ...searchParams, orderBy: column.value, order: nextOrder } }}>
                    {column.label}
                  </NextLink>

                  {isCurrentSortCol &&
                    (nextOrder === "asc" ? (
                      <FaArrowUpLong className="inline" />
                    ) : (
                      <FaArrowDownLong className="inline" />
                    ))}
                </Table.ColumnHeaderCell>
              );
            })}
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
