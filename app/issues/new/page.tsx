"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "@/app/custom-easymde.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema, ICreateIssueSchema } from "@/app/validationSchemas";

const NewIssuePage = () => {
  const { register, handleSubmit, control, formState } = useForm<ICreateIssueSchema>({
    resolver: zodResolver(createIssueSchema),
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ICreateIssueSchema) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/");
    } catch (error) {
      //const errorMsg = (error as any).response.data.title._errors[0];
      setErrorMessage("Error occured");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <TextField.Root placeholder="Title" {...register("title")} />
      {formState.errors.title && <Text color="red">{formState.errors.title.message}</Text>}

      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />
      {formState.errors.description && (
        <Text className="-mt-10" color="red">
          {formState.errors.description.message}
        </Text>
      )}

      <Button type="submit">Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
