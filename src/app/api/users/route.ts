import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const getAllUsers = await prisma.user.findMany();
    return NextResponse.json(
      {
        message: "Users fetched successfully!",
        data: getAllUsers,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Error fetching users!",
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully!",
        data: userCreated,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Error creating user!",
        error,
      },
      {
        status: 400,
      },
    );
  }
}
