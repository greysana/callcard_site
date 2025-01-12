/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import HeroSection from "@/components/landing/HeroSection";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
export default function Home() {
  const [isLoggedin, setisLoggedin] = useState<boolean | null>();

  useEffect(() => {
    const token = localStorage.getItem("token-bcc");
    handleverifyToken(token);
  }, []);

  const handleverifyToken = async (token: any) => {
    const response = await fetch("/api/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setisLoggedin(true);
      console.log(data);
    } else {
      localStorage.removeItem("token-bcc");
      localStorage.removeItem("token-id");
      sessionStorage.removeItem("details");
      setisLoggedin(false);
    }
  };
  return (
    <div className="h-full w-full overflow-x-hidden">
      <nav className="h-[4rem] relative z-10 bg-primarycol flex justify-between items-center px-[6rem]">
        <a className="text-[1.2rem] text-primaryDarker font-semibold" href="/">
          Obanana
        </a>
        {isLoggedin ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-center items-center p-3 px-6 text-[.8rem]  hover:bg-primaryDarkerOrange">
              Account <FaAngleDown className="ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  <h1 className="text-[.8rem] text-primaryDarker font-[400]">
                    Dashboard
                  </h1>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <button
                  onClick={() => {
                    window.location.href = "/account-settings";
                  }}
                >
                  <h1 className="text-[.8rem] text-primaryDarker font-[400]">
                    Account Settings
                  </h1>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <button
                  onClick={() => {
                    document.cookie = `token=; Path=/; Expires=${new Date(
                      0
                    ).toUTCString()};`;

                    localStorage.removeItem("token-bcc");
                    localStorage.removeItem("token-id");
                    sessionStorage.removeItem("details");

                    window.location.href = "/auth/login";
                  }}
                >
                  <h1 className="text-[.8rem] text-primaryDarker font-[400]">
                    Sign out
                  </h1>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a href="/auth/login">
            <h1 className="text-[1rem] text-primaryDarker font-[500]">Login</h1>
          </a>
        )}
      </nav>
      <HeroSection />
      <div className="relative p-8 h-[20rem]">
        <div className="absolute z-0 top-[-194rem] left-1/2 transform -translate-x-1/2 w-[320rem] h-[200rem] bg-gray-200 rounded-[100%]"></div>
      </div>
      <div className="relative p-8 h-[13rem]"></div>
      <div className="relative p-8 h-[50rem] overflow-hidden">
        <div className="absolute z-0 top-[4rem] left-1/2 transform -translate-x-1/2 w-[320rem] h-[200rem] bg-primarycol rounded-[100%]"></div>
      </div>
      <div className="relative p-8 h-[13rem]"></div>
    </div>
  );
}
