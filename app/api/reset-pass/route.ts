import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/jwt";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectToDatabase();

  const {
    userId,
    token,
    newPassword,
  }: { userId: string; token: string; newPassword: string } = await req.json();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid token or user does not exist" },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password successfully reset" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 400 }
    );
  }
}
