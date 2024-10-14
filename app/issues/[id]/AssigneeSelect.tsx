"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    axios.get<User[]>("/api/users").then(({ data }) => setUsers(data));
  }, []);

  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger>Assign to</Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
