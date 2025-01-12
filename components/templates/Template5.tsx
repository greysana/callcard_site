"use client";

import React from "react";
import { CiGlobe, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
const Template5: React.FC<{ data: any; className: string }> = ({
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
        <div className=" p-3 py-1 flex flex-col justify-end  ">
          <div className="w-full flex justify-center">
            <img
              src={data1.company_logo}
              alt="company Logo"
              className="h-[2.2rem] "
            />
          </div>
        </div>
        <div className="p-3 py-2 flex flex-col items-end justify-end">
          <h1 className="text-[1rem] font-[700] text-[clamp(1rem, 2vw, 1.5rem)] overflow-hidden text-ellipsis whitespace-nowrap">
            {data1.full_name}
          </h1>
          <h6 className="text-[.65rem] font-[600]">{data1.position}</h6>
        </div>
        <div className=" p-1 flex flex-col justify-center items-center">
          <div className="w-full flex justify-center mb-2">
            <h6 className="text-[.7rem] font-[400]">{data1.company_name}</h6>
          </div>
          <img src={data1.qr_code} alt="company Logo" className="h-[4rem] " />
        </div>
        <div className=" p-1 pt-0 flex justify-end items-end">
          <ul className="p-1 pt-2 flex flex-col justify-end items-end">
            <li className="text-[.41rem] flex flex-row my-1 items-center text-end">
              {data1.company_address}
              <span className="mx-2">
                <CiLocationOn size={15} />
              </span>
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center text-end">
              {data1.tel_number}
              <br />
              {data1.phone_number}
              <span className="mx-2">
                <CiPhone size={15} />
              </span>
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center text-end">
              {data1.company_website}
              <span className="mx-2">
                <CiGlobe size={15} />
              </span>
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center text-end">
              {data1.email}
              <span className="mx-2">
                <CiMail size={15} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Template5;
