"use client";
import React from "react";
import { PrimaryButton } from "../PrimaryButton";

const HeroSection = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <div className="relative z-10 container overflow-x-hidden">
      <section>
        <div className="w-full h-[500px] flex justify-center items-center">
          <div className="w-[80%] h-[80%] flex flex-col justify-center items-start">
            <h1 className="text-[2.2rem] font-[700]">
              Free Business Card Maker
            </h1>
            <p className="my-[3rem] text-[1.1rem]">
              Our Free Business Card Maker empowers professionals to easily
              design and customize high-quality business cards with elegant
              templates, fonts, and colors, offering a professional, print-ready
              result in minutes.
            </p>
            <PrimaryButton
              className="bg-primarycol p-3 px-10 rounded-full font-[600] shadow-md"
              onClick={handleClick}
              link="dashboard"
            >
              Create a business card
            </PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
