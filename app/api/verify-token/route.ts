import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import { generateToken, verifyToken } from "../../../lib/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const EMAIL_API_ENDPOINT = "http://localhost:3000/api/send-email";
const FRONTEND_RESET_URL = "http://localhost:3000/auth/reset-password";

export async function POST(req: Request) {
  await connectToDatabase();

  const { token }: { token: string } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Token not found" }, { status: 404 });
  }

  try {
    // Send email via your send-email API
    let isverified = jwt.verify(token, process.env.JWT_SECRET!);
    // let verifyToken = JSON.parse(isverified.toString());
    // console.log(isverified);
    if (isverified) {
      return NextResponse.json(
        {
          message: "Token verified successfully",
          isverified:
            typeof isverified === "object" && "userId" in isverified
              ? isverified.userId
              : null,
        },
        { status: 200 }
      );
    } else {
      throw new Error("Invalid Token");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error sending password reset email:", errorMessage);

    return NextResponse.json(
      { message: "Failed to send password reset email", error: errorMessage },
      { status: 500 }
    );
  }
}
