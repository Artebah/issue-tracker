import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string(),
});

export type ICreateIssueSchema = z.infer<typeof createIssueSchema>;
