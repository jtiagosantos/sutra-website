import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/helpers/admin-middleware";

export const GET = async (request: NextRequest) => adminMiddleware(request, async () => {
  try {
    const medals = await prisma.medal.findMany();

    return NextResponse.json({ medals }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  };
});
