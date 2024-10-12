"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "@/app/custom-easymde.css";

const NewIssuePage = () => {
  return (
    <div className="flex flex-col gap-3">
      <TextField.Root placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit new issue</Button>
    </div>
  );
};

export default NewIssuePage;
