/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Form from "@/components/dashboard/Form";
import { useAppContext } from "@/hook/AppContext";
import React, { useEffect, useState } from "react";
import { IUser } from "../../../types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [error, setError] = useState<string>("");

  const { user, setUser } = useAppContext();
  const [userData, setuserData] = useState<IUser | null>(user);
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    getUserData();
  }, [session]);
  useEffect(() => {
    setuserData(user);
  }, [user]);
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
      return data;
    } else {
      setError("Invalid or expired token. Please try again.");
      return null;
    }
  };
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  };
  const getUserData = async () => {
    let id = localStorage.getItem("token-id");
    if (id === null && session) {
      console.log("used o-auth login");
      try {
        localStorage.setItem("token-id", session?.user?.id!);
        localStorage.setItem("token-bcc", session?.user?.image!);
        const response = await fetch("/api/users/" + session?.user?.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
          // console.log(data);
        } else {
          setError(data.message);
        }
      } catch (error) {}
    } else if (id) {
      let token = localStorage.getItem("token-bcc");

      const response = await fetch("/api/users/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        // console.log(data);
      } else {
        setError(data.message);
      }
    } else {
      setError("Error failed Login");
      console.log("Error failed Login" + session);
    }

    // const response1 = await fetch("/api/users/", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + token,
    //   },
    // });

    // const data2 = await response1.json();
    // console.log(data2);
  };

  return (
    <div className="h-full w-full overflow-x-hidden flex flex-col justify-center items-center">
      <div className="h-[4rem] relative z-10 bg-primarycol flex justify-center items-center w-full">
        <nav className="h-[4rem] relative z-10 container flex justify-between items-center px-[6rem] w-full">
          <a
            className="text-[1.2rem] text-primaryDarker font-semibold"
            href="/"
          >
            Obanana
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-center items-center p-3 px-6 text-[.8rem]  hover:bg-primaryDarkerOrange">
              {userData?.first_name} <FaAngleDown className="ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
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
        </nav>
      </div>
      <div className="w-full h-[500px] container flex justify-center items-center">
        <div className="w-[80%] h-[80%]  flex flex-col justify-center items-start">
          <h1 className="text-[2.2rem] font-[600]">Free Business Card Maker</h1>
          <p className="my-[3rem] text-[1.1rem]">
            Our Free Business Card Maker empowers professionals to easily design
            and customize high-quality business cards with elegant templates,
            fonts, and colors, offering a professional, print-ready result in
            minutes.
          </p>
        </div>
      </div>
      {userData &&
      userData.businessDetails &&
      userData.businessDetails.length > 0 ? (
        <>
          {userData.businessDetails.map((detail, i) => (
            <Form
              data={detail}
              key={i}
              index={i}
              setuserData={setuserData}
              userData={userData}
            />
          ))}
        </>
      ) : (
        <Form
          data={null}
          index={null}
          setuserData={setuserData}
          userData={userData}
        />
      )}
    </div>
  );
};

export default Dashboard;
