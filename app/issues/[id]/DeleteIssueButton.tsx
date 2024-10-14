"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = React.useState(false);

  const onDelete = async () => {
    try {
      throw new Error("something");
      await axios.delete("/api/issues/" + issueId);

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" data-accent-color="red" aria-haspopup="dialog" aria-expanded="false">
            Delete issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={onDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error occured :(</AlertDialog.Title>
          <AlertDialog.Description>This issue cannot be deleted</AlertDialog.Description>
          <Button onClick={() => setError(false)} mt="3" color="gray" variant="soft">
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
