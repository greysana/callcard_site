"use client";

import { IBusinessDetails } from "@/types/types";
import React, { useEffect, useState } from "react";
import { CiGlobe, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
const Template6: React.FC<{ data: any; className: string }> = ({
  data,
  className,
}) => {
  const [details, setdetails] = useState<IBusinessDetails>();

  useEffect(() => {
    const storedDetails = sessionStorage.getItem("details");
    const stored = storedDetails ? JSON.parse(storedDetails) : null;
    setdetails(stored);
  }, [details]);
  // let details? = {
  //   full_name: "YOUR NAME",
  //   position: "JOB TITLE",
  //   company_address:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  //   tel_number: "+63 2 457 5631",
  //   phone_number: "+63 912 457 5631",
  //   company_website: "www.yourcompany.com",
  //   email: "you@company.com",
  //   company_logo:
  //     "https://www.freeiconspng.com/thumbs/logo-design/rainbow-logo-design-transparent-0.png",
  //   company_name: "Company Name",
  //   qr_code:
  //     "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
  // };
  return (
    <div
      className={`w-[350px] h-[200px] bg-slate-200 rounded-xl m-2 p-3 ${className}`}
    >
      <div className="grid grid-cols-2 gap-1 px-2">
        <div className="p-3 py-2">
          <h1 className="text-[1rem] font-[700]">{details?.full_name}</h1>
          <h6 className="text-[.65rem] font-[600]">{details?.position}</h6>
        </div>
        <div className=" p-3 py-1 flex flex-col justify-end  ">
          <div className="w-full flex justify-end">
            <img
              src={details?.logo}
              alt="company Logo"
              className="h-[2.2rem] "
            />
          </div>
          <div className="w-full flex justify-end">
            <h6 className="text-[.6rem] font-[400]">{details?.company_name}</h6>
          </div>
        </div>
        <div className="  p-1 pt-2 flex justify-start items-start">
          <ul>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mx-2">
                <CiLocationOn size={15} />
              </span>
              {details?.company_address}
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mx-2">
                <CiPhone size={15} />
              </span>
              {details?.telephone}
              <br />
              {details?.mobilePhone}
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mx-2">
                <CiGlobe size={15} />
              </span>
              {details?.web_url}
            </li>
            <li className="text-[.41rem] flex flex-row my-1 items-center">
              <span className="mx-2">
                <CiMail size={15} />
              </span>
              {details?.company_email}
            </li>
          </ul>
        </div>
        <div className=" p-1 flex justify-end items-end">
          <img src={details?.qr_url} alt="company Logo" className="h-[4rem] " />
        </div>
      </div>
    </div>
  );
};

export default Template6;
