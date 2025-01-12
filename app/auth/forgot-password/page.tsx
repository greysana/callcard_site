"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaLinkedin,
  FaChevronLeft,
} from "react-icons/fa";
import React from "react";
import { MdEmail } from "react-icons/md";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setsuccess] = useState<boolean | null>(null);

  const [isloading, setisloading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisloading(true);
    const response = await fetch("/api/forgot-pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      // localStorage.setItem("token-bcc", data.token);
      // localStorage.setItem("token-id", data.user._id);

      // document.cookie = `token=${data.token}; Path=/; Secure; HttpOnly`;
      // document.cookie = `token=${data.token}; Path=/; `;
      setsuccess(true);
      // router.push("/reset-password");

      setisloading(false);
    } else {
      setError(data.message.message);
      setisloading(false);
      setsuccess(false);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-primarycol flex justify-center items-center  overflow-x-hidden">
      <div className="card h-[32rem] w-[22rem] rounded-[2.5rem] flex flex-col justify-center items-center">
        <h1 className="m-3 mt-5 mb-2 text-[1.5rem]">Forgot your password?</h1>
        <h6 className="m-3 mt-5 mb-2 text-[0.8rem]">
          Please enter your email and we’ll send you a link to reset your
          password
        </h6>

        {error && <p className="mx-3 text-[.8rem] text-[red]">{error}*</p>}
        {success && (
          <p className="mx-3 text-[.8rem] p-3 px-7 rounded-md bg-[#00f000] text-white">
            Successfully sent an email, Please check and click the url to
            contimue resetting your password.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-5 mx-3">
          <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
            <MdEmail size={23} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
            />
          </div>

          <button
            className="w-full bg-primarycol p-3 px-10 mt-5 rounded-full font-[400] shadow-md"
            type="submit"
            disabled={isloading || !email}
          >
            {isloading ? "Submiting..." : "Submit"}
          </button>

          <p className="text-center text-[1rem] mt-5 mx-2">
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
  );
};

export default Login;
