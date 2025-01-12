import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; details: string }> }
) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Destructure id and details from params
    const { id, details } = await params;

    // Find the user by id
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const filteredBusinessDetail = user.businessDetails?.find(
      (_user: any, index: number) =>
        _user?.company_name?.toString()?.toLowerCase() === details.toLowerCase()
    );
    // const filteredBusinessDetail = user.businessDetails?.find(
    //   (_user: any, index: number) => index?.toString() === details
    // );
    // console.log(user);
    if (!filteredBusinessDetail) {
      return NextResponse.json(
        { error: "Business detail not found" },
        { status: 404 }
      );
    }

    // Return the filtered business detail
    return NextResponse.json({
      user_photo: user?.photo,
      filteredBusinessDetail,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
