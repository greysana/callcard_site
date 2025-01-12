import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import { generateToken } from "../../../lib/jwt";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, password }: { email: string; password: string } =
    await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  // Generate JWT Token
  const token = generateToken(user._id.toString());

  const userResponse = user.toObject();
  delete userResponse.password;

  return NextResponse.json(
    { message: "Login successful", token, user: userResponse },
    { status: 200 }
  );
}
