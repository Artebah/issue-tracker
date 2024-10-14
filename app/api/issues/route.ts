import { authOptions } from "@/app/auth/authOptions";
import { createIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    const errorMessage = validation.error.format();

    return NextResponse.json(errorMessage, { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  console.log(issue);

  return NextResponse.json(issue, { status: 201 });
}
