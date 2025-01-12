"use client";

import { IBusinessDetails } from "@/types/types";
import React, { useRef, useState, useEffect } from "react";
import { CiGlobe, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import Moveable, { OnDrag, OnResize } from "react-moveable";
import QRCode from "react-qr-code";
import Temp2_1 from "../../svg_designs/Temp2_1";

const Template2_moveable: React.FC<{
  data: IBusinessDetails;
  className: string;
  template: Array<any>;
  setTemplate: any;
  selectedItem: any;
  setSelectedItem: any;
  isDefault: boolean;
}> = ({
  data,
  className,
  template,
  setTemplate,
  selectedItem,
  setSelectedItem,
  isDefault,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const moveableRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const [template1, setTemplate1] = useState<
    Array<{
      ref: string;
      style: any;
    }>
  >(template);
  useEffect(() => {
    if (isDefault) {
      setTemplate1([
        {
          ref: "palette",
          style: {
            palette1: data?.color_palette?.[0] ?? "#d6faff",
            palette2: data?.color_palette?.[1] ?? "#fff",
            palette4: data?.color_palette?.[3] ?? "#ffa500",
            palette3: data?.color_palette?.[2] ?? "#ffa500",
          },
        },
        {
          ref: "name",
          style: {
            transform: "translate(0px, 0px)",
            width: "auto",
            height: "auto",
            fontSize: "13px",
            color: data?.color_palette?.[1],
            fontWeight: "600",
          },
        },
        {
          ref: "position",
          style: {
            transform: "translate(0px, 0px)",
            width: "auto",
            height: "auto",
            fontSize: "9px",
            color: data?.color_palette?.[1],
            fontWeight: "600",
          },
        },
        {
          ref: "logo",
          style: {
            transform: "translate(0px, 0px)",
            width: "auto",
            height: "30px",
          },
        },
        {
          ref: "companyName",
          style: {
            transform: "translate(0px, 0px)",
            width: "auto",
            height: "30px",
            fontSize: "8px",
            color: data?.color_palette?.[1],
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
            color: data?.color_palette?.[1],
            fontWeight: "400",
          },
        },
        {
          ref: "qrCode",
          style: {
            transform: "translate(0px, 0px)",
            width: "50px",
            height: "50px",
            color: data?.color_palette?.[1],
          },
        },
        {
          ref: "logo_back",
          style: {
            transform: "translate(0px, 0px)",
            width: "auto",
            height: "30px",
          },
        },
        {
          ref: "companyName_back",
          style: {
            transform: "translate(0px, 0px)",
            width: "auto",
            height: "30px",
            fontSize: "8px",
            color: data?.color_palette?.[1],
            fontWeight: "500",
          },
        },
      ]);
    } else {
      setTemplate1(template);
    }
  }, [template]);
  useEffect(() => {
    if (selectedTarget) {
      setSelectedItem(selectedTarget);
    }

  }, [selectedTarget]);

  const handleDrag = ({ target, left, top }: OnDrag) => {
    updateTemplateStyle(target, {
      transform: `translate(${left}px, ${top}px)`,
    });
  };

  const handleResize = ({ target, width, height, drag }: OnResize) => {
    const newWidth = Math.abs(width);
    const newHeight = Math.abs(height);

    const fontSize = Math.max(6.5, Math.min(width, height) / 10);

    // Log and update the styles
    console.log({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      //   transform: `translate(${drag.left}px, ${drag.top}px)`,
      fontSize: `${fontSize}px`,
    });

    updateTemplateStyle(target, {
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      //   transform: `translate(${drag.left}px, ${drag.top}px)`,
      fontSize: `${fontSize}px`,
    });
  };
  const handleResize2 = ({ target, width, height, drag }: OnResize) => {
    // Find the existing style or use default values
    const newWidth = Math.abs(width);
    const newHeight = Math.abs(height);

    // Adjust font size dynamically based on new width
    const fontSize = Math.max(1, Math.min(width) / 15);

    // Log and update the styles
    console.log({
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      //   transform: `translate(${drag.left}px, ${drag.top}px)`,
      fontSize: `${fontSize}px`,
    });

    updateTemplateStyle(target, {
      width: `${newWidth}px`,
      height: `${newHeight}px`,
      //   transform: `translate(${drag.left}px, ${drag.top}px)`,
      fontSize: `${fontSize}px`,
    });
  };
  const updateTemplateStyle = (target: any, newStyle: any) => {
    const ref = Object.keys(moveableRefs.current).find(
      (key) => moveableRefs.current[key] === target
    );
    if (ref) {
      setTemplate((prevTemplate: any) =>
        prevTemplate?.map((item: any) =>
          item.ref === ref
            ? { ...item, style: { ...item.style, ...newStyle } }
            : item
        )
      );
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      parentRef.current &&
      !parentRef.current.contains(event.target as Node)
    ) {
      setSelectedTarget(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  let colors = template1?.find((item) => item.ref === "palette")?.style;
  console.log(colors);
  return (
    <div
      ref={parentRef}
      className={`relative w-[350px] h-[200px] rounded-xl m-2 p-3 ${className} shadow-lg relative overflow-hidden`}
      style={{
        backgroundColor: colors?.palette1,
      }}
    >
      <div className="absolute z-0 bottom-0 left-4 scale-y-125">
        <Temp2_1 fillColor={colors?.palette3} opacity={"1"} />
      </div>
      <div className="grid grid-cols-2 gap-1 px-2 relative z-99">
        {/* Full Name and Position */}
        <div className="p-3 py-2 cursor-pointer">
          <h1
            onClick={() => {
              setSelectedTarget("name");
            }}
            ref={(el: HTMLHeadingElement | null) => {
              if (el) {
                moveableRefs.current["name"] = el;
              }
            }}
            style={template1?.find((item) => item.ref === "name")?.style}
            className="text-[1rem] font-[700]"
          >
            {data?.full_name}
          </h1>
          {selectedTarget === "name" && (
            <Moveable
              target={moveableRefs.current["name"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize2}
            />
          )}
          <h6
            onClick={() => {
              setSelectedTarget("position");
            }}
            ref={(el: HTMLHeadingElement | null) => {
              if (el) {
                moveableRefs.current["position"] = el;
              }
            }}
            style={template1?.find((item) => item.ref === "position")?.style}
            className="text-[.65rem] font-[600]"
          >
            {data?.position}
          </h6>
          {selectedTarget === "position" && (
            <Moveable
              target={moveableRefs.current["position"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize2}
            />
          )}
        </div>

        {/* Company Logo */}
        <div className="p-3 py-1 cursor-pointer flex flex-col justify-end">
          {/* <div> */}
          <img
            src={`${data?.logo}`}
            alt="company Logo"
            onClick={() => {
              setSelectedTarget("logo");
            }}
            ref={(el: HTMLHeadingElement | null) => {
              if (el) {
                moveableRefs.current["logo"] = el;
              }
            }}
            className="object-contain"
            style={template1?.find((item) => item.ref === "logo")?.style}
          />
          {/* </div> */}
          {selectedTarget === "logo" && (
            <Moveable
              target={moveableRefs.current["logo"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize}
            />
          )}
        </div>

        {/* Contact Information */}
        <div className="p-1 pt-2 cursor-pointer flex justify-start items-start">
          <ul
            onClick={() => {
              setSelectedTarget("contactInfo");
            }}
            ref={(el: HTMLUListElement | null) => {
              if (el) {
                moveableRefs.current["contactInfo"] = el;
              }
            }}
            style={template1?.find((item) => item.ref === "contactInfo")?.style}
            className="mt-3"
          >
            <li className=" flex my-1 items-center">
              <div className="w-[20%]">
                <CiLocationOn
                  size={15}
                  color={colors?.palette3}
                  className="mr-2 "
                />
              </div>
              {data?.company_address}
            </li>
            <li className=" flex my-1 items-center">
              <div className="w-[20%]">
                <CiPhone size={15} className="mr-2" color={colors?.palette3} />
              </div>
              {data?.telephone} / {data?.mobilePhone}
            </li>
            <li className=" flex my-1 items-center">
              <div className="w-[20%]">
                <CiGlobe size={15} className="mr-2" color={colors?.palette3} />
              </div>
              {data?.web_url}
            </li>
            <li className=" flex my-1 items-center">
              <div className="w-[20%]">
                <CiMail size={15} className="mr-2" color={colors?.palette3} />
              </div>
              {data?.company_email}
            </li>
          </ul>
          {selectedTarget === "contactInfo" && (
            <Moveable
              target={moveableRefs.current["contactInfo"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize}
            />
          )}
        </div>

        {/* QR Code and Company Name */}
        <div className="p-1 cursor-pointer flex flex-col justify-center items-center">
          <h6
            onClick={() => {
              setSelectedTarget("companyName");
            }}
            ref={(el: HTMLHeadingElement | null) => {
              if (el) {
                moveableRefs.current["companyName"] = el;
              }
            }}
            className="text-[.7rem] font-[400] mb-2"
            style={template1?.find((item) => item.ref === "companyName")?.style}
          >
            {data?.company_name}
          </h6>
          {selectedTarget === "companyName" && (
            <Moveable
              target={moveableRefs.current["companyName"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize2}
            />
          )}
          <div className="p-1 cursor-pointer flex justify-end">
            <div
              onClick={() => {
                setSelectedTarget("qrCode");
              }}
              ref={(el: HTMLHeadingElement | null) => {
                if (el) {
                  moveableRefs.current["qrCode"] = el;
                }
              }}
              // src={data?.qr_code}\
              className="  bg-white flex justify-center items-center p-1 mt-0"
              style={template1?.find((item) => item.ref === "qrCode")?.style}
            >
              <QRCode
                size={62}
                style={{}}
                value={data?.qr_url?.toString() ?? ""}
                viewBox={`0 0 62 62`}
              />
            </div>

            {selectedTarget === "qrCode" && (
              <Moveable
                target={moveableRefs.current["qrCode"]}
                draggable={true}
                resizable={true}
                onDrag={handleDrag}
                onResize={handleResize}
                //   onResizeEnd={handleResize}
                //   keepRatio={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2_moveable;
