"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import jwt from "jsonwebtoken";
import {
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaLinkedin,
  FaChevronLeft,
  FaRegCheckCircle,
} from "react-icons/fa";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaRegCircleXmark } from "react-icons/fa6";
import { verifyToken } from "../../../lib/jwt";
import { Suspense } from "react";
const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [isloading, setisloading] = useState<boolean>(false);
  const [passError, setpassError] = useState<boolean | null>(null);
  const [success, setsuccess] = useState<boolean | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract the token from the query parameter

    const token = searchParams.get("token");
    if (token) {
      try {
        // Decrypt the token using the same secret key
        // const decoded = verifyToken(token);
        handleverifyToken(token);
        // console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
        // const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);

        // console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
      } catch (err: any) {
        console.error("Invalid or expired token:", err.message);
        setError("Invalid or expired token. Please try again.");
      }
    }
  }, []);
  // console.log(userId);

  const handleverifyToken = async (token: string) => {
    const response = await fetch("/api/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: searchParams.get("token"),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setUserId(data.isverified); // Extract the userId

      return data;
    } else {
      setError("Invalid or expired token. Please try again.");
      return null;
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       setError("");
  //     }, 3000);
  //   }
  // }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisloading(true);

    const response = await fetch("/api/reset-pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        token: searchParams.get("token"),
        newPassword: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // router.push("/login");
      setsuccess(true);
      setisloading(false);
      setPassword("");
      setconfirmPassword("");
    } else {
      setError(data.message);
      setPassword("");
      setconfirmPassword("");

      setisloading(false);
      setsuccess(false);
    }
  };
  const PassCompare = (e: string) => {
    setconfirmPassword(e);
    if (password === e) {
      setpassError(false);
    } else {
      setpassError(true);
    }
  };
  return (
    <Suspense fallback={<div className="h-[100vh] w-[100vw] bg-primarycol flex justify-center items-center  overflow-x-hidden">Loading...</div>}>
      <div className="h-[100vh] w-[100vw] bg-primarycol flex justify-center items-center  overflow-x-hidden">
        <div className="card h-[32rem] w-[22rem] rounded-[2.5rem] flex flex-col justify-center items-center">
          <h1 className="m-3 mt-5 mb-2 text-[1.5rem]">Reset password</h1>

          {error && <p className="mx-3 text-[.8rem] text-[red]">{error}*</p>}
          {success && (
            <p className="mx-3 text-[.8rem] p-3 px-7 rounded-md bg-[#00f000] text-white">
              Successfully changed password, Please try logging in
            </p>
          )}
          <form onSubmit={handleSubmit} className="mt-5 mx-3">
            <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
              <FaLock size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
              />
            </div>
            <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
              <FaLock size={18} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => PassCompare(e.target.value)}
                placeholder="Confirm Password"
                className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
              />
              <h3 className="text-[.8rem]">
                {passError === true ? (
                  <FaRegCircleXmark color="red" />
                ) : passError === false ? (
                  <FaRegCheckCircle color="green" />
                ) : null}{" "}
              </h3>
            </div>
            <button
              className="w-full bg-primarycol p-3 px-10 mt-5 rounded-full font-[400] shadow-md"
              type="submit"
              disabled={isloading || !password || error !== ""}
            >
              {isloading ? "Submiting..." : "Submit"}
            </button>

            <p className="text-center text-[1rem] mt-10 mx-2">
              <a
                href="/auth/login"
                className="flex flex-row justify-center items-center"
              >
                <span className="text-[#000]">
                  <FaChevronLeft />
                </span>
                Back to Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default ResetPassword;
