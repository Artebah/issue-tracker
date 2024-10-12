import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title field is required").max(255),
  description: z.string({ message: "Description field is required" }),
});

export type ICreateIssueSchema = z.infer<typeof createIssueSchema>;
