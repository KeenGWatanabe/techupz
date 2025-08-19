import bcrypt from "bcryptjs";
// alifeWSL.User
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password 
  } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
// specify db = User
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword
    }
  });

  return NextResponse.json(user);
}