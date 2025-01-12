import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { protectRoute } from "@/lib/auth";

// GET - Fetch users
export async function GET(request: NextRequest) {
  // Use the protectRoute function to verify the token before proceeding
  const userData = await protectRoute(request);

  // If the token is invalid, it will return an error with a 401 response, so no need to proceed further
  if (
    typeof userData === "object" &&
    userData !== null &&
    "message" in userData
  ) {
    return NextResponse.json({ message: userData.message }, { status: 401 });
  }

  // If token is valid, continue with the API operation
  await connectToDatabase();
  const users = await User.find().select("-password");
  return NextResponse.json(users, { status: 200 });
}

// POST - Create a new user
export async function POST(request: NextRequest) {
  // Protect the route with the token checker
  const userData = await protectRoute(request);

  // If the token is invalid, return the error response
  if (
    typeof userData === "object" &&
    userData !== null &&
    "message" in userData
  ) {
    return NextResponse.json({ message: userData.message }, { status: 401 });
  }

  // If token is valid, proceed to create a new user
  await connectToDatabase();
  const body = await request.json();
  const newUser = new User(body);
  await newUser.save();

  return NextResponse.json(newUser, { status: 201 });
}
