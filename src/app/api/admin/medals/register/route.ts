import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { adminMiddleware } from "@/helpers/admin-middleware";

const bodySchema = z.object({
  name: z.string({ required_error: 'name is a required field' }),
  description: z.string({ required_error: 'description is a required field' }),
  image: z.string({ required_error: 'image is a required field' }),
  levelRequired: z.number({ required_error: 'levelRequired is a required field' }),
})

export const POST = async (request: NextRequest) => adminMiddleware(request, async () => {
  try {
    const body = await request.json();
    const { name, description, image, levelRequired } = bodySchema.parse(body);

    const medalByLevel = await prisma.medal.findUnique({
      where: {
        levelRequired
      },
    });

    if (!!medalByLevel) {
      return NextResponse.json({ error: 'There is already a registered medal for this level' }, { status: 409 });
    }

    await prisma.medal.create({
      data: {
        name,
        description,
        image,
        levelRequired
      },
    });

    return NextResponse.json({ message: 'Medal registered successfully' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
});
