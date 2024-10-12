"use client";

import { Button, Callout, Spinner, Text, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "@/app/custom-easymde.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema, ICreateIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";

const NewIssuePage = () => {
  const { register, handleSubmit, control, formState } = useForm<ICreateIssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (data: ICreateIssueSchema) => {
    try {
      setIsLoading(true);

      await axios.post("/api/issues", data);

      router.push("/");
    } catch (error) {
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
    </form>
  );
};

export default NewIssuePage;
