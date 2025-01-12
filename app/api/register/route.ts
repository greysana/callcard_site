import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import { generateToken } from "../../../lib/jwt";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, password }: { email: string; password: string } =
    await req.json();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email,
    password: hashedPassword,
    register_type: "default",
  });

  try {
    console.log(user);
    await user.save();
    // Generate JWT Token
    // const token = generateToken(user._id.toString());

    return NextResponse.json(
      // { message: "User created successfully", token },
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
