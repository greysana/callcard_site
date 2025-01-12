import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Template from "@/models/Template";
interface Context {
  params: { params: Promise<{ id: string }> };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const id = (await params).id;
  await Template.find();
  const user = await User.findById(id)
    .populate("templates")
    .select("-password");
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const id = (await params).id;

  const body = await request.json();
  const updatedUser = await User.findByIdAndUpdate(id, body, {
    new: true,
  }).populate("templates");
  if (!updatedUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(updatedUser);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const id = (await params).id;

  try {
    // Parse the request body
    const body = await request.json();

    // Validate and sanitize the incoming data
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Ensure the object ID is valid
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Perform the update
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .populate("templates");

    // Check if the user was found and updated
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to validate ObjectId
function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const id = (await params).id;

  const deletedUser = await User.findByIdAndDelete(id).select("-password");
  if (!deletedUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ message: "User deleted successfully" });
}
