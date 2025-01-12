import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next/client";

// Token checker function
export const protectRoute = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  // Check if the Authorization header exists
  if (!authHeader) {
    console.log("No authorization header found");
    let decoded = { message: "Authorization header is missing" };
    return decoded;
  }

  // Extract token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Token not found");
    let decoded = { message: "Token is missing" };
    return decoded;
  }

  try {
    // Verify the JWT token
    console.log("Token found");

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded; // Return the decoded data (can be the user object or userId)
  } catch (error) {
    console.log("Token not found error");

    console.error("JWT verification failed:", error);

    let decoded = { message: "Invalid or expired token" };
    return decoded;
  }
};

export const cookieSet = (token: string) => {
  console.log("token");

  console.log(token);
  console.log("token");

  setCookie("token", token, {
    httpOnly: false,
    secure: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
};
