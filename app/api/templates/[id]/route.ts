import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Template from "@/models/Template";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: any) {
  await connectToDatabase();

  const template = await Template.findById(params.id);
  if (!template)
    return NextResponse.json({ error: "template not found" }, { status: 404 });
  return NextResponse.json(template);
}

export async function PUT(request: Request, { params }: any) {
  await connectToDatabase();

  const body = await request.json();
  const updatedTemplate = await Template.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!updatedTemplate)
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  return NextResponse.json(updatedTemplate);
}

export async function PATCH(request: Request, { params }: any) {
  await connectToDatabase();

  try {
    // Parse the request body
    const body = await request.json();

    // Validate and sanitize the incoming data
    if (!params.id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // Ensure the object ID is valid
    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ error: "Invalid Template ID" }, { status: 400 });
    }

    // Perform the update
    const updatedTemplate = await Template.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    // Check if the Template was found and updated
    if (!updatedTemplate) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    // Return the updated Template
    return NextResponse.json(updatedTemplate);
  } catch (error: any) {
    console.error("Error updating Template:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to validate ObjectId
function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function DELETE(request: Request, { params }: any) {
  await connectToDatabase();

  const deletedTemplate = await Template.findByIdAndDelete(params.id).select(
    "-password"
  );
  if (!deletedTemplate)
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  return NextResponse.json({ message: "Template deleted successfully" });
}
