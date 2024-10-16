"use client";
import React from "react";
import axios from "axios";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema, ICreateIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage } from "@/app/components";
import "easymde/dist/easymde.min.css";
import "@/app/styles/custom-easymde.css";
import { Issue } from "@prisma/client";
import EditorController from "./EditorController";

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const { register, handleSubmit, control, formState } = useForm<ICreateIssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (data: ICreateIssueSchema) => {
    try {
      setIsLoading(true);

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setErrorMessage("Unexpected error occured :(");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />
      <ErrorMessage>{formState.errors.title?.message}</ErrorMessage>

      <EditorController defaultValue={issue?.description} fieldName="description" control={control} />
      <ErrorMessage>{formState.errors.description?.message}</ErrorMessage>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Spinner />}
        {issue ? "Update issue" : "Submit new issue"}
      </Button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </form>
  );
};

export default IssueForm;
