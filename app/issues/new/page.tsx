"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
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
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: NewIssueForm) => {
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
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button type="submit">Submit new issue</Button>

      {errorMessage && (
        <Callout.Root color="red">
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
    </form>
  );
};

export default NewIssuePage;
