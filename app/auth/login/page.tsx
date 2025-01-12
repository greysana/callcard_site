"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaFacebookF, FaGoogle, FaLock, FaLinkedin } from "react-icons/fa";
import React from "react";
import { MdEmail } from "react-icons/md";
import { signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isloading, setisloading] = useState<boolean>(false);

  const router = useRouter();
  const handleProviderLogin = (provider: string) => {
    // signIn(provider, { callbackUrl: '/dashboard' });
    signIn(provider);

  };
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
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token-bcc", data.token);
      localStorage.setItem("token-id", data.user._id);

      // document.cookie = `token=${data.token}; Path=/; Secure; HttpOnly`;
      document.cookie = `token=${data.token}; Path=/; `;

      router.push("/dashboard");
      setisloading(false);
    } else {
      setError(data.message);
      setisloading(false);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-primarycol flex justify-center items-center  overflow-x-hidden">
      <div className="card h-[32rem] w-[22rem] rounded-[2.5rem] flex flex-col">
        <h1 className="m-3 mt-5 mb-2 text-[1.5rem]">Login</h1>
        {error && <p className="mx-3 text-[.8rem] text-[red]">{error}*</p>}
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
          <p className="text-right text-[.7rem] mx-2">
            <a href="/auth/forgot-password">Forgot Password?</a>
          </p>

          <button
            className="w-full bg-primarycol p-3 px-10 mt-5 rounded-full font-[400] shadow-md"
            type="submit"
            disabled={isloading || !email || !password}
          >
            {isloading ? "Login..." : "Login"}
          </button>
          <p className="my-4 text-center">or</p>

          <div className="flex flex-row justify-center items-center">
            <button
              className="shadow-md p-3 mx-2 cursor-pointer hover:border-primarycol rounded-full border-2 border-grey"
              onClick={() => handleProviderLogin("facebook")}
            >
              <FaFacebookF />
            </button>
            <button
              className="shadow-md p-3 mx-2 cursor-pointer hover:border-primarycol rounded-full border-2 border-grey"
              onClick={() => handleProviderLogin("google")}
            >
              <FaGoogle />
            </button>
            <button
              className="shadow-md p-3 mx-2 cursor-pointer hover:border-primarycol rounded-full border-2 border-grey"
              onClick={() => handleProviderLogin("linkedin")}
            >
              <FaLinkedin />
            </button>
          </div>
          <p className="text-center text-[.8rem] mt-5 mx-2">
            <a href="/auth/register">
              Don't have account? <span className="text-[red]">Register</span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
