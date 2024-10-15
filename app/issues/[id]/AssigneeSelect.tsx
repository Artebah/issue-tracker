"use client";

import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const onAsignUser = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, { assignedToUserId: userId.trim() || null })
      .catch((err) => toast.error("Changes could not be saved"));
  };
  const {
    data: users = [],
    error,
    isLoading,
  } = useQuery<User[]>({
    // identifier for caching
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(({ data }) => data),
    // refresh every 60s
    staleTime: 60 * 1000,
    // count of retries before stopping sending requests
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" width=" 6.25rem" />;
  if (error) return null;

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || " "} onValueChange={onAsignUser}>
        <Select.Trigger placeholder="Assign to" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=" ">Unassigned</Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
