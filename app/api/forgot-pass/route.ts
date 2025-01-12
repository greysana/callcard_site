import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import { generateToken } from "../../../lib/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import axios from "axios";

const EMAIL_API_ENDPOINT = "http://localhost:3000/api/send-email";
const FRONTEND_RESET_URL = "http://localhost:3000/auth/reset-password";

export async function POST(req: Request) {
  await connectToDatabase();

  const { email }: { email: string } = await req.json();

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 });
  }

  // Generate a reset token and link
  const resetToken = generateToken(user._id.toString());
  const resetLink = `${FRONTEND_RESET_URL}?token=${resetToken}`;

  try {
    // Send email via your send-email API
    const response = await axios.post(EMAIL_API_ENDPOINT, {
      to: email,
      subject: "Password Reset",
      text: `Visit the link to reset your password: ${resetLink}. This link is valid for 1 hour .`,
    });

    if (response.status === 200) {
      return NextResponse.json(
        { message: "Password reset email sent successfully" },
        { status: 200 }
      );
    } else {
      throw new Error("Failed to send email");
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
