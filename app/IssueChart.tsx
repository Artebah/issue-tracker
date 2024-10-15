"use client";
import React from "react";
import { IssuesCountsType } from "./IssuesCountsType";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

type Props = IssuesCountsType;

const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar barSize={60} style={{ fill: "var(--accent-9)" }} dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
