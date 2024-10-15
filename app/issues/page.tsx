import prisma from "@/prisma/client";
import React from "react";
import IssuesToolbar from "./IssuesToolbar";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const where = { status: searchParams.status || undefined };

  const page = +searchParams.page || 1;
  const pageSize = 10;
  const issuesCount = await prisma.issue.count({ where });

  const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.order || "asc" } : undefined;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <IssuesToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination itemCount={issuesCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
