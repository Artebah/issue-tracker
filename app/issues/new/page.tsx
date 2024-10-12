"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "@/app/custom-easymde.css";
import { useRouter } from "next/navigation";

interface NewIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<NewIssueForm>();
  const router = useRouter();

  console.log(register("title"), control);

  const onSubmit = async (data: NewIssueForm) => {
    await axios.post("/api/issues", data);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button type="submit">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
