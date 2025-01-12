import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const filename = (await params).filename;

    // Path to the hidden `.uploads` directory
    const filePath = path.join(process.cwd(), ".uploads", filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileType = path.extname(filename).slice(1);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": `image/${fileType}`,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error while serving file:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
