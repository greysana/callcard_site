import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Template from "@/models/Template";
import { protectRoute } from "@/lib/auth";

// GET - Fetch templates
export async function GET(request: NextRequest) {
  // const TemplateData = await protectRoute(request);

  // if (
  //   typeof TemplateData === "object" &&
  //   TemplateData !== null &&
  //   "message" in TemplateData
  // ) {
  //   return NextResponse.json(
  //     { message: TemplateData.message },
  //     { status: 401 }
  //   );
  // }

  // If token is valid, continue with the API operation
  await connectToDatabase();
  const Templates = await Template.find();
  return NextResponse.json(Templates, { status: 200 });
}

// POST - Create a new template
export async function POST(request: NextRequest) {
  // Protect the route with the token checker
  // const templateData = await protectRoute(request);

  // // If the token is invalid, return the error response
  // if (
  //   typeof templateData === "object" &&
  //   templateData !== null &&
  //   "message" in templateData
  // ) {
  //   return NextResponse.json({ message: templateData.message }, { status: 401 });
  // }

  // If token is valid, proceed to create a new template
  await connectToDatabase();
  const body = await request.json();
  const newTemplate = new Template(body);
  await newTemplate.save();

  return NextResponse.json(newTemplate, { status: 201 });
}
