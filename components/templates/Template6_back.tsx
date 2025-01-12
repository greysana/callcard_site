"use client";

import React from "react";
import { CiGlobe, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
const Template6_back: React.FC<{ data: any; className: string }> = ({
  data,
  className,
})  => {
  let data1 = {
    full_name: "YOUR NAME",
    position: "JOB TITLE",
    company_address:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    tel_number: "+63 2 457 5631",
    phone_number: "+63 912 457 5631",
    company_website: "www.yourcompany.com",
    email: "you@company.com",
    company_logo:
      "https://www.freeiconspng.com/thumbs/logo-design/rainbow-logo-design-transparent-0.png",
    company_name: "Company Name",
    qr_code:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
  };
  return (
    <div className={`w-[350px] h-[200px] bg-slate-200 rounded-xl m-2 p-3 ${className}`}></div>
  );
};

export default Template6_back;
