"use client";

import { Button, Spinner, TextField } from "@radix-ui/themes";
import React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "@/app/styles/custom-easymde.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema, ICreateIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";

const NewIssuePage = () => {
  const { register, handleSubmit, control, formState } = useForm<ICreateIssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (data: ICreateIssueSchema) => {
    try {
      setIsLoading(true);

      await axios.post("/api/issues", data);

      router.push("/");
    } catch (error) {
      setErrorMessage("Unexpected error occured :(");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <TextField.Root placeholder="Title" {...register("title")} />
      <ErrorMessage>{formState.errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      <ErrorMessage>{formState.errors.description?.message}</ErrorMessage>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Spinner />}
        {/*<BookmarkIcon />*/}
        Submit new issue
      </Button>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </form>
  );
};

export default NewIssuePage;
