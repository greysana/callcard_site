import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "";

// Generate a JWT Token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Verify JWT Token
export const verifyToken = (token: string) => {
  try {
    console.log("JWT_SECRET (type):", typeof JWT_SECRET);
    console.log("Token:", token);
    console.log(JWT_SECRET + " verified");
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);

    return error; // Return null if verification fails
  }
};
