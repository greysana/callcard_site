"use client";

import { IBusinessDetails } from "@/types/types";
import React, { useRef, useState, useEffect } from "react";
import { CiGlobe, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import Moveable, { OnDrag, OnResize } from "react-moveable";
import QRCode from "react-qr-code";
import Temp2_1 from "../../svg_designs/Temp2_1";
import Temp2_1_back from "@/components/svg_designs/back/Temp2_1_back";

const Template2_moveable_back: React.FC<{
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
            height: "50px",
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
            height: "auto",
            fontSize: "15px",
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
        backgroundColor: colors?.palette4,
      }}
    >
      <div className="absolute z-0 bottom-0 left-0 scale-x-125">
        <Temp2_1_back fillColor={colors?.palette3} opacity={"1"} />
      </div>
      <div className="grid grid-cols-1 gap-1 px-2 relative z-99 justify-center items-center h-[100%]">
        {/* Company Logo */}
        <div className="p-3 py-1 cursor-pointer flex flex-row justify-center items-center">
          <img
            onClick={() => {
              setSelectedTarget("logo_back");
            }}
            ref={(el: HTMLHeadingElement | null) => {
              if (el) {
                moveableRefs.current["logo_back"] = el;
              }
            }}
            src={`http://localhost:3000/${data?.logo}`}
            alt="company Logo"
            style={template1?.find((item) => item.ref === "logo_back")?.style}
          />
          {selectedTarget === "logo_back" && (
            <Moveable
              target={moveableRefs.current["logo_back"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize}
            />
          )}
          <h6
            onClick={() => {
              setSelectedTarget("companyName_back");
            }}
            ref={(el: HTMLHeadingElement | null) => {
              if (el) {
                moveableRefs.current["companyName_back"] = el;
              }
            }}
            className="text-[.6rem] uppercase font-[400] pl-1 mt-4"
            style={
              template1?.find((item) => item.ref === "companyName_back")?.style
            }
          >
            {data?.company_name}
          </h6>
          {selectedTarget === "companyName_back" && (
            <Moveable
              target={moveableRefs.current["companyName_back"]}
              draggable={true}
              resizable={true}
              onDrag={handleDrag}
              onResize={handleResize2}
              //   keepRatio={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2_moveable_back;
