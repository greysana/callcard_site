"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  FaFacebookF,
  FaGoogle,
  FaLock,
  FaLinkedin,
  FaCheckCircle,
  FaCheck,
} from "react-icons/fa";
import React from "react";
import { MdEmail } from "react-icons/md";
import { FaRegCircleXmark, FaXmark } from "react-icons/fa6";
const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [passError, setpassError] = useState<boolean | null>(null);

  const [error, setError] = useState<string>("");
  const [isloading, setisloading] = useState<boolean>(false);
  const rules = [
    { label: "At least 8 characters", isValid: password.length >= 8 },
    {
      label: "At least 1 special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    // { label: "At least 1 uppercase letter", isValid: /[A-Z]/.test(password) },
    { label: "At least 1 number", isValid: /\d/.test(password) },
  ];

  // Check if all rules are valid
  const isPasswordValid = rules.every((rule) => rule.isValid);
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

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/auth/login");
    } else {
      setError(data.message);
    }
  };

  const PassCompare = (e: String) => {
    if (password === e) {
      setpassError(false);
    } else {
      setpassError(true);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] bg-primarycol flex justify-center items-center  overflow-x-hidden">
      <div className="card h-[36rem] w-[22rem] rounded-[2.5rem] flex flex-col">
        <h1 className="m-3 mt-7 text-[1.5rem]">Create Account</h1>
        {error && <p className="mx-3 text-[.8rem] text-[red]">{error}*</p>}
        <form onSubmit={handleSubmit} className="mt-5 mx-3">
          <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
            <MdEmail size={23} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          {password && (
            <ul className="mt-2 text-sm">
              {isPasswordValid ? (
                <p className="text-green-500 flex flex-row justify-start items-center">
                  Strong Password <FaCheck size={10} className="ml-2" />
                </p>
              ) : (
                <>
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span
                        className={
                          rule.isValid ? "text-green-500" : "text-red-500"
                        }
                      >
                        {rule.isValid ? (
                          <FaCheck size={10} />
                        ) : (
                          <FaXmark size={10} />
                        )}
                      </span>
                      <span>{rule.label}</span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
          <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
            <FaLock size={18} />
            <input
              type="password"
              onChange={(e) => PassCompare(e.target.value)}
              placeholder="Confirm Password"
              className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
            />
            <h3 className="text-[.8rem]">
              {passError === true ? (
                <FaRegCircleXmark color="red" />
              ) : passError === false ? (
                <FaCheckCircle color="green" />
              ) : null}{" "}
            </h3>
          </div>

          <button
            className="w-full bg-primarycol p-3 px-10 mt-5 rounded-full font-[400] shadow-md"
            type="submit"
            disabled={
              passError || !email || !password || isloading || !isPasswordValid
            }
          >
            {isloading ? "Creating an Account..." : "Create an Account"}
          </button>
          <p className="my-4 text-center">or</p>

          <div className="flex flex-row justify-center items-center">
            <button className="shadow-md p-3 mx-2 cursor-pointer hover:border-primarycol rounded-full border-2 border-grey">
              <FaFacebookF />
            </button>
            <button className="shadow-md p-3 mx-2 cursor-pointer hover:border-primarycol rounded-full border-2 border-grey">
              <FaGoogle />
            </button>
            <button className="shadow-md p-3 mx-2 cursor-pointer hover:border-primarycol rounded-full border-2 border-grey">
              <FaLinkedin />
            </button>
          </div>
          <p className="text-center text-[.8rem] mt-5 mx-2">
            <a href="/auth/login">
              Already have an account? <span className="text-[red]">Login</span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
