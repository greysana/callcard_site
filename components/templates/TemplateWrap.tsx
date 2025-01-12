"use client";

import React, { useEffect, useState } from "react";
import Template2_moveable from "./moveable/Template2";
import Template3_moveable from "./moveable/Template3";
import Template4_moveable from "./moveable/Template4";
import Template5_moveable from "./moveable/Template5";
import Template1_moveable_back from "./moveable/Template1_back";
import Template2_moveable_back from "./moveable/Template2_back";
import Template3_moveable_back from "./moveable/Template3_back";
import Template4_moveable_back from "./moveable/Template4_back";
import Template5_moveable_back from "./moveable/Template5_back";
import Template6_moveable_back from "./moveable/Template6_back";
import Template6_moveable from "./moveable/Template6";
import Template1_moveable from "./moveable/Template1";
import { useAppContext } from "@/hook/AppContext";
import { IBusinessDetails } from "../../types/types";
const TemplateWrap: React.FC<{
  temp: string;
  // styles: any;
  facing: string;
  className: any;
}> = ({ temp, facing, className }) => {
  const [selectedItem, setSelectedItem] = useState("logo");
  const [style, setstyle] = useState<any>(null);
  const [template, setTemplate] = useState<
    Array<{
      ref: string;
      style: any;
    }>
  >([]);

  //   const [facing, setfacing] = useState("front");
  const [selectedTemplate, setselectedTemplate] = useState("template-1");
  const [defaultDetails, setdefaultDetails] = useState({
    full_name: "YOUR NAME",
    position: "JOB TITLE",
    company_address:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    telephone: "+63 2 457 5631",
    mobilePhone: "+63 912 457 5631",
    web_url: "www.yourcompany.com",
    company_email: "you@company.com",
    logo: "api/uploads/1732677383055-Group%208.png",
    company_name: "Company Name ",
    color_palette: ["", "", "", ""],
    qr_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
  });

  const { user, setUser, selectedDetails, setselectedDetails } =
    useAppContext();
  const [details, setdetails] = useState<IBusinessDetails>();
  useEffect(() => {
    const storedDetails = sessionStorage.getItem("details");
    const stored = storedDetails ? JSON.parse(storedDetails) : null;
    setdetails(stored);
  }, []);
  useEffect(() => {
    setdefaultDetails({
      full_name: "YOUR NAME",
      position: "JOB TITLE",
      company_address:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      telephone: "+63 2 457 5631",
      mobilePhone: "+63 912 457 5631",
      web_url: "www.yourcompany.com",
      company_email: "you@company.com",
      logo: "api/uploads/1732677383055-Group%208.png",
      company_name: "Company Name ",
      color_palette: [
        details?.color_palette?.[0]!,
        details?.color_palette?.[1]!,
        details?.color_palette?.[2]!,
        details?.color_palette?.[2]!,
      ],
      qr_url:
        "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
    });
    setTemplate([
      {
        ref: "palette",
        style: {
          palette1: details?.color_palette?.[0] ?? "#2b2b2bdd",
          palette2: details?.color_palette?.[1] ?? "#fff",
          palette3: details?.color_palette?.[2] ?? "#ffa500",
        },
      },
      {
        ref: "name",
        style: {
          transform: "translate(0px, 0px)",
          width: "auto",
          height: "auto",
          fontSize: "16px",
          color: details?.color_palette?.[1],
          fontWeight: "700",
        },
      },
      {
        ref: "position",
        style: {
          transform: "translate(0px, 0px)",
          width: "auto",
          height: "auto",
          fontSize: "9.5px",
          color: details?.color_palette?.[1],
          fontWeight: "600",
        },
      },
      {
        ref: "logo",
        style: {
          transform: "translate(0px, 0px)",
          width: "auto",
          height: "20px",
        },
      },
      {
        ref: "companyName",
        style: {
          transform: "translate(0px, 0px)",
          width: "auto",
          height: "10px",
          fontSize: "8px",
          color: details?.color_palette?.[1],
          fontWeight: "500",
        },
      },
      {
        ref: "contactInfo",
        style: {
          transform: "translate(0px, 0px)",
          width: "auto",
          height: "auto",
          fontSize: "6.5px",
          color: details?.color_palette?.[1],
          fontWeight: "400",
        },
      },
      {
        ref: "qrCode",
        style: {
          transform: "translate(0px, 0px)",
          width: "50px",
          height: "50px",
          color: details?.color_palette?.[1],
        },
      },
    ]);
  }, [details]);
  const defaultDetails1 = {
    full_name: "YOUR NAME",
    position: "JOB TITLE",
    company_address:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    telephone: "+63 2 457 5631",
    mobilePhone: "+63 912 457 5631",
    web_url: "www.yourcompany.com",
    company_email: "you@company.com",
    logo: "api/uploads/1732677383055-Group%208.png",
    company_name: "Company Name ",
    color_palette: [
      details?.color_palette?.[0] ?? "",
      details?.color_palette?.[1] ?? "",
      details?.color_palette?.[3] ?? "",
    ],
    qr_url:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg",
  };
  useEffect(() => {
    // Split the string by `-` and join the first two parts
    // const parts = temp.split("-");
    // const result = parts.slice(0, 2).join("-");
    const trial = user?.templates?.filter(
      (template) =>
        typeof template === "object" &&
        template !== null &&
        "template_id" in template &&
        template.template_id === temp
    );

    setstyle(
      trial?.[0] && typeof trial?.[0] === "object" ? trial?.[0].styles : null
    );

    // console.log(trial?.[0]?.styles);
    setselectedTemplate(temp);
  }, [temp]);

  return (
    <div className=" pointer-events-none">
      {facing === "front" ? (
        <>
          {selectedTemplate.includes("template-1") ? (
            <Template1_moveable
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-1" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-1" ? true : false}
            />
          ) : selectedTemplate.includes("template-2") ? (
            <Template2_moveable
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-2" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-2" ? true : false}
            />
          ) : selectedTemplate.includes("template-3") ? (
            <Template3_moveable
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-3" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-3" ? true : false}
            />
          ) : selectedTemplate.includes("template-4") ? (
            <Template4_moveable
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-4" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-4" ? true : false}
            />
          ) : selectedTemplate.includes("template-5") ? (
            <Template5_moveable
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-5" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-5" ? true : false}
            />
          ) : selectedTemplate.includes("template-6") ? (
            <Template6_moveable
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-6" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-6" ? true : false}
            />
          ) : null}
        </>
      ) : (
        <>
          {selectedTemplate.includes("template-1") ? (
            <Template1_moveable_back
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-1" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-1" ? true : false}
            />
          ) : selectedTemplate.includes("template-2") ? (
            <Template2_moveable_back
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-2" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-2" ? true : false}
            />
          ) : selectedTemplate.includes("template-3") ? (
            <Template3_moveable_back
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-3" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-3" ? true : false}
            />
          ) : selectedTemplate.includes("template-4") ? (
            <Template4_moveable_back
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-4" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-4" ? true : false}
            />
          ) : selectedTemplate.includes("template-5") ? (
            <Template5_moveable_back
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-5" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-5" ? true : false}
            />
          ) : selectedTemplate.includes("template-6") ? (
            <Template6_moveable_back
              data={defaultDetails}
              className={className}
              template={selectedTemplate === "template-6" ? template : style!}
              setTemplate={setTemplate}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isDefault={selectedTemplate === "template-6" ? true : false}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default TemplateWrap;
