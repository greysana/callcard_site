"use client";

import React from "react";
import { CiGlobe, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
const Template4: React.FC<{ data: any; className: string }> = ({
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
    <div className={`w-[350px] h-[200px] bg-slate-200 rounded-xl m-2 p-3 ${className}`}>
      <div className="grid grid-cols-2 gap-1 px-2">
        <div className=" p-2 py-1 flex flex-row justify-start items-start  ">
          <div className=" p-0 flex justify-center items-center">
            <img
              src={data1.company_logo}
              alt="company Logo"
              className="h-[2rem] w-[3rem] min-w-[3rem] pr-1"
            />
          </div>
          <div className="h-full flex justify-center items-center">
            <h6 className="text-[.6rem] font-[400]">{data1.company_name}</h6>
          </div>
        </div>
        <div className="flex justify-end  m-0">
          <img src={data1.qr_code} alt="company Logo" className="h-[3rem] " />
        </div>
        <div className="px-1 py-0 m-0   flex flex-col justify-start items-start">
          <div className="pb-0 ">
            <h1 className="text-[1rem] font-[700]">{data1.full_name}</h1>
            <h6 className="text-[.65rem] font-[600]">{data1.position}</h6>
          </div>
          <ul>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mr-2">
                <CiLocationOn size={15} />
              </span>
              {data1.company_address}
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mr-2">
                <CiPhone size={15} />
              </span>
              {data1.tel_number}
              <br />
              {data1.phone_number}
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mr-2">
                <CiGlobe size={15} />
              </span>
              {data1.company_website}
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mr-2">
                <CiMail size={15} />
              </span>
              {data1.email}
            </li>
          </ul>
        </div>
        <div className=" p-1 flex justify-end items-end"></div>
      </div>
    </div>
  );
};

export default Template4;
