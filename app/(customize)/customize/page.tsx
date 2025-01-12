"use client";
import Template1_moveable from "@/components/templates/moveable/Template1";
import Template1_moveable_back from "@/components/templates/moveable/Template1_back";
import Template2_moveable from "@/components/templates/moveable/Template2";
import Template2_moveable_back from "@/components/templates/moveable/Template2_back";
import Template3_moveable from "@/components/templates/moveable/Template3";
import Template3_moveable_back from "@/components/templates/moveable/Template3_back";
import Template4_moveable from "@/components/templates/moveable/Template4";
import Template4_moveable_back from "@/components/templates/moveable/Template4_back";
import Template5_moveable from "@/components/templates/moveable/Template5";
import Template5_moveable_back from "@/components/templates/moveable/Template5_back";
import Template6_moveable from "@/components/templates/moveable/Template6";
import Template6_moveable_back from "@/components/templates/moveable/Template6_back";
import { useAppContext } from "@/hook/AppContext";
import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { ITemplate, IBusinessDetails } from "../../../types/types";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaAngleDown,
} from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
const Customize: React.FC<{}> = ({}) => {
  const [selectedItem, setSelectedItem] = useState("logo");
  const [orientation, setorientation] = useState("front");
  const [selectedTemplate, setselectedTemplate] = useState("template-1");
  const { user, setUser, selectedDetails, setselectedDetails } =
    useAppContext();
  const [details, setdetails] = useState<IBusinessDetails>({});
  const { toast } = useToast();
  useEffect(() => {
    setdetails(() => {
      const storedDetails = sessionStorage.getItem("details");
      return storedDetails ? JSON.parse(storedDetails) : null;
    });
  }, []);
  // useEffect(() => {
  //   setTemplate([
  //     {
  //       ref: "palette",
  //       style: {
  //         palette1: details?.color_palette?.[0] ?? "#2b2b2bdd",
  //         palette2: details?.color_palette?.[1] ?? "#fff",
  //         palette3: details?.color_palette?.[2] ?? "#ffa500",
  //         palette4: details?.color_palette?.[0] ?? "#ffa500",
  //       },
  //     },
  //     {
  //       ref: "name",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "auto",
  //         fontSize: "13px",
  //         color: details?.color_palette?.[1],
  //         fontWeight: "600",
  //       },
  //     },
  //     {
  //       ref: "position",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "auto",
  //         fontSize: "9.5px",
  //         color: details?.color_palette?.[1],
  //         fontWeight: "500",
  //       },
  //     },
  //     {
  //       ref: "logo",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "20px",
  //       },
  //     },
  //     {
  //       ref: "companyName",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "auto",
  //         fontSize: "9px",
  //         color: details?.color_palette?.[1],
  //         fontWeight: "500",
  //       },
  //     },
  //     {
  //       ref: "contactInfo",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "auto",
  //         fontSize: "6.5px",
  //         color: details?.color_palette?.[1],
  //         fontWeight: "400",
  //       },
  //     },
  //     {
  //       ref: "qrCode",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "64px",
  //         height: "64px",
  //         color: details?.color_palette?.[1],
  //       },
  //     },
  //     {
  //       ref: "logo_back",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "30px",
  //       },
  //     },
  //     {
  //       ref: "companyName_back",
  //       style: {
  //         transform: "translate(0px, 0px)",
  //         width: "auto",
  //         height: "30px",
  //         fontSize: "8px",
  //         color: details?.color_palette?.[1],
  //         fontWeight: "500",
  //       },
  //     },
  //   ]);
  // }, [details])

  const [template, setTemplate] = useState<
    Array<{
      ref: string;
      style: any;
    }>
  >([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const template1 = params.get("template");
    if (template1) {
      setselectedTemplate(template1);
      const trial = user?.templates?.filter(
        (temp) =>
          typeof temp === "object" &&
          temp !== null &&
          "template_id" in temp &&
          temp.template_id === template1
      );
      console.log(trial);
      console.log(user);

      if (trial?.[0] && typeof trial[0] === "object" && "styles" in trial[0]) {
        setTemplate(trial[0].styles);
        console.log("Templates found");
      } else {
        console.log("Templates  not found");

        setTemplate([
          {
            ref: "palette",
            style: {
              palette1: details?.color_palette?.[0],
              palette2: details?.color_palette?.[1],
              palette3: details?.color_palette?.[2],
              palette4: details?.color_palette?.[0],
            },
          },
          {
            ref: "name",
            style: {
              transform: "translate(0px, 0px)",
              width: "auto",
              height: "auto",
              fontSize: "13px",
              color: details?.color_palette?.[1],
              fontWeight: "600",
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
              fontWeight: "500",
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
              height: "auto",
              fontSize: "9px",
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
              width: "64px",
              height: "64px",
              color: details?.color_palette?.[1],
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
              color: details?.color_palette?.[1],
              fontWeight: "500",
            },
          },
        ]);
      }
    } else {
      // if (details) {
      // }
    }
  }, [details]); // Empty dependency array ensures this runs only once

  // Function to update the palette colors
  const handlePaletteChange = (paletteKey: any, value: any) => {
    setTemplate((prevTemplate) =>
      prevTemplate?.map((item) =>
        item.ref === "palette"
          ? {
              ...item,
              style: {
                ...item.style,
                [paletteKey]: value,
              },
            }
          : item
      )
    );
  };

  // Function to update styles of selected item
  const handleStyleChange = (styleKey: any, value: any) => {
    if (selectedItem) {
      setTemplate((prevTemplate) =>
        prevTemplate?.map((item) =>
          item.ref === selectedItem
            ? {
                ...item,
                style: {
                  ...item.style,
                  [styleKey]: value,
                },
              }
            : item
        )
      );
    }
  };
  function generateId(length: number) {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  }

  const handleSave = async () => {
    try {
      const id = generateId(10);
      const updatedTemplate = {
        title: selectedTemplate + "-" + id,
        template_id: selectedTemplate + "-" + id,
        styles: template,
      };

      // API call to save the template data
      const response = await fetch(`/api/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTemplate),
      });

      if (!response.ok) {
        throw new Error("Failed to update template.");
      } else {
        const result = await response.json();

        const updatedUser = {
          ...user,
          templates: [...(user?.templates || []), result?._id],
        };

        // API call to save the user data
        const response1 = await fetch(`/api/users/${user?._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response1.ok) {
          toast({
            title: "Failed!",
            description:
              "An unexpected Error occurred, Please try again later!",
            variant: "destructive",
            // action: (
            //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            // ),
          });
          throw new Error("Failed to update user.");
        }

        const result1 = await response1.json();
        console.log("User updated successfully:", result1);
        toast({
          title: "Successful!",
          description: "Successfully saved your template",
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
        setUser(result1);
      }

      // console.log("User updated successfully:", result);
    } catch (err) {
      console.error("Error saving user data:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="h-[8vh] relative z-10 bg-primarycol flex justify-center items-center w-full">
        <nav className="h-full relative z-10 container flex justify-between items-center px-[6rem] w-full">
          <a
            className="text-[1.2rem] text-primaryDarker font-semibold"
            href="/"
          >
            Obanana
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-center items-center p-3 px-6 text-[.8rem]  hover:bg-primaryDarkerOrange">
              {user?.first_name} <FaAngleDown className="ml-2" />
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
      <div className="w-full h-[88vh] flex flex-col md:flex-row justify-between items-center">
        <div className="w-[60%] h-full max-h-[616px] min-h-[616px] flex flex-col justify-center items-center">
          <div className="h-[15%] w-[80%] p-3">
            <h2 className="w-full text-center md:text-left text-[1.5rem] font-[500]  my-5">
              Customize your Business Card
            </h2>
          </div>
          <div className="h-[65%] flex justify-center items-center">
            <div className="scale-[110%] sm:scale-[130%] md:scale-[130%] lg:scale-[160%]">
              {orientation === "front" ? (
                <>
                  {selectedTemplate.includes("template-1") ? (
                    <Template1_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-2") ? (
                    <Template2_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-3") ? (
                    <Template3_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-4") ? (
                    <Template4_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-5") ? (
                    <Template5_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-6") ? (
                    <Template6_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : null}
                </>
              ) : (
                <>
                  {selectedTemplate.includes("template-1") ? (
                    <Template1_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-2") ? (
                    <Template2_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-3") ? (
                    <Template3_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-4") ? (
                    <Template4_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-5") ? (
                    <Template5_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-6") ? (
                    <Template6_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className=""
                      isDefault={false}
                    />
                  ) : null}
                </>
              )}
            </div>
          </div>
          <div className="h-[20%]">
            <div className="flex space-x-2 justify-center items-center">
              <div className="w-[175px] h-[100px]  flex justify-center items-center">
                <div
                  className="transform scale-50 cursor-pointer"
                  onClick={() => {
                    setorientation("front");
                  }}
                >
                  {selectedTemplate.includes("template-1") ? (
                    <Template1_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8 "
                          : ""
                      } pointer-events-none`}
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-2") ? (
                    <Template2_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-3") ? (
                    <Template3_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-4") ? (
                    <Template4_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-5") ? (
                    <Template5_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                      isDefault={false}
                    />
                  ) : selectedTemplate.includes("template-6") ? (
                    <Template6_moveable
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                      isDefault={false}
                    />
                  ) : null}
                </div>
              </div>

              <div className="w-[175px] h-[100px]  flex justify-center items-center">
                <div
                  className="transform scale-50 cursor-pointer "
                  onClick={() => {
                    setorientation("back");
                  }}
                >
                  {selectedTemplate.includes("template-1") ? (
                    <Template1_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      isDefault={false}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                    />
                  ) : selectedTemplate.includes("template-2") ? (
                    <Template2_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      isDefault={false}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                    />
                  ) : selectedTemplate.includes("template-3") ? (
                    <Template3_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      isDefault={false}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                    />
                  ) : selectedTemplate.includes("template-4") ? (
                    <Template4_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      isDefault={false}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                    />
                  ) : selectedTemplate.includes("template-5") ? (
                    <Template5_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      isDefault={false}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                    />
                  ) : selectedTemplate.includes("template-6") ? (
                    <Template6_moveable_back
                      template={template}
                      setTemplate={setTemplate}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                      data={details}
                      isDefault={false}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      } pointer-events-none`}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] h-[96vh] md:w-[40%] flex flex-col justify-start items-center p-5 border-[1px] border-slate-200">
          <div className="w-[60%] mt-10 p-0  md:px-10 flex flex-row justify-center items-center">
            <h2 className="w-full text-left text-[1.1rem] font-[400]">
              Background Color:
            </h2>
            <div className="bg-white mx-2 p-2 rounded-full flex flex-row  w-[4rem] justify-start">
              {/* {["palette1"].map((paletteKey) => ( */}
              <div className="relative w-10 h-10 border-[1px] mx-1 rounded-full shadow-sm">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor:
                      template?.find((item) => item.ref === "palette")?.style[
                        "palette1"
                      ] || "",
                  }}
                ></div>
                <input
                  type="color"
                  value={"palette1"}
                  onChange={(e) =>
                    handlePaletteChange("palette1", e.target.value)
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {/* ))} */}
            </div>
          </div>
          <div className="w-[60%] mt-2 p-0  md:px-10 flex flex-row justify-center items-center">
            <h2 className="w-full text-left text-[1.1rem] font-[400]">
              Background Color (back side) :
            </h2>
            <div className="bg-white mx-2 p-2 rounded-full flex flex-row  w-[4rem] justify-start">
              {/* {["palette1"].map((paletteKey) => ( */}
              <div className="relative w-10 h-10 border-[1px] mx-1 rounded-full shadow-sm">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor:
                      template?.find((item) => item.ref === "palette")?.style[
                        "palette4"
                      ] || "",
                  }}
                ></div>
                <input
                  type="color"
                  value={"palette4"}
                  onChange={(e) =>
                    handlePaletteChange("palette4", e.target.value)
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {/* ))} */}
            </div>
          </div>
          <div className="w-[60%] mt-1 p-0  md:px-10 flex flex-row justify-center items-center">
            <h2 className="w-full text-left text-[1.1rem] font-[400]">
              Design Color:
            </h2>
            <div className="bg-white mx-2 p-2 rounded-full flex flex-row  w-[4rem] justify-start">
              {/* {["palette1"].map((paletteKey) => ( */}
              <div className="relative w-10 h-10 border-[1px] mx-1 rounded-full shadow-sm">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundColor:
                      template?.find((item) => item.ref === "palette")?.style[
                        "palette3"
                      ] || "",
                  }}
                ></div>
                <input
                  type="color"
                  value={"palette1"}
                  onChange={(e) =>
                    handlePaletteChange("palette3", e.target.value)
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {/* ))} */}
            </div>
          </div>
          <hr />
          <hr />

          {/* Dynamic Style Customization Section */}
          {selectedItem && (
            <div className="w-[90%] -mt-2 mb-0  px-0 lg:px-6 py-2 flex flex-col justify-center items-center">
              <h2 className="w-full text-left text-[1.1rem] font-[400] my-1">
                Edit{"  "}
                <span className="font-[500] uppercase ml-2">
                  '{selectedItem}'
                </span>
              </h2>
              {selectedItem === "logo" ||
              selectedItem === "qrCode" ||
              selectedItem === "logo_back" ? (
                <>
                  <div className="w-full flex flex-col">
                    {selectedItem &&
                      ["qrCode", "logo", "logo_back"].includes(
                        selectedItem
                      ) && (
                        <div className="w-full flex flex-col">
                          <label className="my-3 px-4 w-full flex flex-row justify-around">
                            <p className="w-[1rem]">Height:</p>
                            <input
                              type="number"
                              className="p-1 px-3 ml-4 mr-1 w-[7rem]  rounded-sm border-2 border-[#adadad]"
                              value={parseFloat(
                                template?.find(
                                  (item) => item.ref === selectedItem
                                )?.style.height
                              )}
                              onChange={(e) =>
                                handleStyleChange(
                                  "height",
                                  `${e.target.value}px`
                                )
                              }
                            />
                          </label>

                          <label className="my-3 px-4 w-full flex flex-row justify-around">
                            <p className="w-[1rem]">Width:</p>

                            <input
                              type="number"
                              className="p-1 px-3 ml-4 mr-1 w-[7rem]  rounded-sm border-2 border-[#adadad]"
                              value={parseFloat(
                                template?.find(
                                  (item) => item.ref === selectedItem
                                )?.style.width
                              )}
                              onChange={(e) =>
                                handleStyleChange(
                                  "width",
                                  `${e.target.value}px`
                                )
                              }
                            />
                          </label>

                          <label className="my-3 px-4 w-full flex flex-row justify-around">
                            <p className="w-[1rem] text-nowrap md:text-wrap xl:text-nowrap">
                              Border Radius:
                            </p>
                            <input
                              type="number"
                              className="p-1 px-3 ml-4 mr-1 w-[7rem]  rounded-sm border-2 border-[#adadad]"
                              value={parseFloat(
                                template?.find(
                                  (item) => item.ref === selectedItem
                                )?.style.borderRadius
                              )}
                              onChange={(e) =>
                                handleStyleChange(
                                  "borderRadius",
                                  `${e.target.value}px`
                                )
                              }
                            />
                          </label>

                          <label className="my-3 px-4 w-full flex flex-row justify-around">
                            <p className="w-[1rem] text-nowrap md:text-wrap xl:text-nowrap">
                              Border Width:
                            </p>
                            <input
                              type="number"
                              className="p-1 px-3 ml-4 mr-1 w-[7rem]  rounded-sm border-2 border-[#adadad]"
                              value={parseFloat(
                                template?.find(
                                  (item) => item.ref === selectedItem
                                )?.style.borderWidth
                              )}
                              onChange={(e) =>
                                handleStyleChange(
                                  "borderWidth",
                                  `${e.target.value}px`
                                )
                              }
                            />
                          </label>

                          <label className="my-3 px-4 w-full flex flex-row justify-around">
                            <p className="w-[1rem] text-nowrap md:text-wrap xl:text-nowrap">
                              Border Color:
                            </p>

                            <div className="relative w-10 h-10 border-[1px] mx-3 rounded-full shadow-sm">
                              <div
                                className="w-full h-full rounded-full"
                                style={{
                                  backgroundColor:
                                    template?.find(
                                      (item) => item.ref === selectedItem
                                    )?.style.borderColor ?? "#000000",
                                }}
                              ></div>
                              <input
                                type="color"
                                value={
                                  template?.find(
                                    (item) => item.ref === selectedItem
                                  )?.style.borderColor ?? "#000000"
                                }
                                onChange={(e) =>
                                  handleStyleChange(
                                    "borderColor",
                                    e.target.value
                                  )
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </div>
                          </label>
                        </div>
                      )}
                  </div>
                </>
              ) : (
                <>
                  <div className="my-3 px-4 w-full">
                    <label className="flex flex-row justify-start items-center">
                      Font Color:
                      <div className="relative w-10 h-10 border-[1px] mx-3 rounded-full shadow-sm">
                        <div
                          className="w-full h-full rounded-full"
                          style={{
                            backgroundColor: template?.find(
                              (item) => item.ref === selectedItem
                            )?.style.color,
                          }}
                        ></div>
                        <input
                          type="color"
                          value={
                            template?.find((item) => item.ref === selectedItem)
                              ?.style.color
                          }
                          onChange={(e) =>
                            handleStyleChange("color", e.target.value)
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="my-3 px-4 w-full">
                    <label>
                      Font Size:
                      <input
                        type="number"
                        className="p-1 px-3 ml-4 mr-1 w-[7rem]  rounded-sm border-2 border-[#adadad]"
                        value={template
                          ?.find((item) => item.ref === selectedItem)
                          ?.style.fontSize?.replace("px", "")}
                        onChange={(e) =>
                          handleStyleChange(
                            "fontSize",
                            `${parseFloat(e.target.value)}px`
                          )
                        }
                      />
                      px
                    </label>
                  </div>

                  <div className="my-3 px-4 w-full">
                    <label>
                      Font Weight:
                      <select
                        value={
                          template?.find((item) => item.ref === selectedItem)
                            ?.style.fontWeight
                        }
                        onChange={(e) =>
                          handleStyleChange("fontWeight", e.target.value)
                        }
                        className="p-1 px-3 mx-4 w-auto  rounded-sm border-2 border-[#adadad]"
                      >
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="lighter">Lighter</option>
                        <option value="bolder">Bolder</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                        <option value="500">500</option>
                        <option value="600">600</option>
                        <option value="700">700</option>
                        <option value="800">800</option>
                        <option value="900">900</option>
                      </select>
                    </label>
                  </div>
                  <div className="my-3 px-4 w-full">
                    <label className="w-auto text-black flex flex-row">
                      Text Align:
                      <div className="p-1 px-3 mx-4 w-auto text-black flex flex-row">
                        <button
                          onClick={(e) =>
                            handleStyleChange("textAlign", "justify")
                          }
                          value="center"
                          className="p-1 rounded-sm shadow-sm mx-1"
                          style={{
                            backgroundColor:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "justify"
                                ? "#dddd"
                                : "#f3f3f3",
                            color:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "justify"
                                ? "#000"
                                : "#797979",
                          }}
                        >
                          <FaAlignJustify size={20} />
                        </button>
                        <button
                          onClick={(e) =>
                            handleStyleChange("textAlign", "left")
                          }
                          value="center"
                          className="p-1 rounded-sm shadow-sm mx-1"
                          style={{
                            backgroundColor:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "left"
                                ? "#dddd"
                                : "#f3f3f3",
                            color:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "left"
                                ? "#000"
                                : "#797979",
                          }}
                        >
                          <FaAlignLeft size={20} />
                        </button>
                        <button
                          onClick={(e) =>
                            handleStyleChange("textAlign", "center")
                          }
                          value="center"
                          className="p-1 rounded-sm shadow-sm mx-1"
                          style={{
                            backgroundColor:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "center"
                                ? "#dddd"
                                : "#f3f3f3",
                            color:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "center"
                                ? "#000"
                                : "#797979",
                          }}
                        >
                          <FaAlignCenter size={20} />
                        </button>
                        <button
                          onClick={(e) =>
                            handleStyleChange("textAlign", "right")
                          }
                          value="center"
                          className="p-1 rounded-sm shadow-sm mx-1"
                          style={{
                            backgroundColor:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "right"
                                ? "#dddd"
                                : "#f3f3f3",
                            color:
                              template?.find(
                                (item) => item.ref === selectedItem
                              )?.style.textAlign === "right"
                                ? "#000"
                                : "#797979",
                          }}
                        >
                          <FaAlignRight size={20} />
                        </button>
                      </div>
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
          <button
            className="px-10 py-3 bg-primarycol rounded-lg flex justify-center items-center flex-row"
            onClick={() => {
              handleSave();
            }}
          >
            Save Template <CiSaveDown1 className="ml-2 text-[1.5rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customize;
