import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge, StyledLink } from "../components";
import IssuesToolbar from "./IssuesToolbar";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import Pagination from "../components/Pagination";

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
  searchParams: { status: Status; orderBy: keyof Issue; order: "asc" | "desc"; page: string };
}) => {
  const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.order || "asc" } : undefined;

  const page = +searchParams.page || 1;
  const pageSize = 10;

  const where = { status: searchParams.status || undefined };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssuesToolbar />
      <Table.Root className="mb-5">
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
      <Pagination itemCount={issuesCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
