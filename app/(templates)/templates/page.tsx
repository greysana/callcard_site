"use client";
import Modal from "@/components/Modal";
import { useAppContext } from "@/hook/AppContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TemplateWrap from "@/components/templates/TemplateWrap";

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setselectedTemplate] = useState("template-1");
  const [orientation, setorientation] = useState("front");
  const { user, setUser, selectedDetails, setselectedDetails } =
    useAppContext();
  const router = useRouter();

  console.log(user);
  const openModal = (template: any) => {
    setselectedTemplate(template);
    setIsModalOpen(true);
  };
  const defaultTemplates = [
    "template-1",
    "template-2",
    "template-3",
    "template-4",
    "template-5",
    "template-6",
  ];
  return (
    <div className="w-full h-[100vh] flex flex-col items-center">
      <div className="h-[4rem] relative z-10 bg-primarycol flex justify-center items-center w-full">
        <nav className="h-[4rem] relative z-10 container flex justify-between items-center px-[6rem] w-full">
          <a
            className="text-[1.2rem] text-primaryDarker font-[400]"
            href="/dashboard"
          >
            {"<"} Return
          </a>
        </nav>
      </div>
      <h1 className="w-[90%] h-auto container text-[1.8rem] font-[500] flex flex-wrap my-10 justify-center items-center">
        Explore our Business card templates
      </h1>

      <div className="w-[90%] h-auto pb-[3rem] container flex flex-wrap justify-center items-center">
        {defaultTemplates?.map((template) => (
          <button
            className="cursor-pointer text-left"
            onClick={() => {
              openModal(template);
            }}
          >
            <TemplateWrap
              facing="front"
              temp={template}
              className="border-[1px] border-slate-100"
            />
          </button>
        ))}
        <h1 className="w-[90%] h-auto container text-slate-500 text-[1.3rem] font-[500] flex flex-wrap my-10 justify-center items-center">
          My Templates
        </h1>
        {user?.templates?.map((template) => {
          // Type guard: Check if `template` is of type `ITemplate`
          if (typeof template === "object" && "template_id" in template) {
            return (
              <button
                key={template.template_id} // Use a unique key for React rendering
                className="cursor-pointer text-left"
                onClick={() => {
                  openModal(template.template_id);
                }}
              >
                <TemplateWrap
                  facing="front"
                  temp={template.template_id}
                  className="border-[1px] border-slate-100"
                />
              </button>
            );
          }
          // Optionally return null for invalid items
          return null;
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[90%] sm:w-[60%] p-6"
      >
        <div className=" flex flex-wrap items-center justify-center ">
          <div className="py-4 px-2">
            {orientation === "front" ? (
              <TemplateWrap
                facing="front"
                temp={selectedTemplate}
                className=""
              />
            ) : (
              <TemplateWrap
                facing="back"
                temp={selectedTemplate}
                className=""
              />
            )}
          </div>
          <div className="py-3 px-2">
            <div className="flex space-x-2 justify-center items-center">
              <div className="w-[175px] h-[100px]  flex justify-center items-center">
                <div
                  className="transform scale-50 cursor-pointer"
                  onClick={() => {
                    setorientation("front");
                  }}
                >
                  <button
                    className="cursor-pointer text-left"
                    onClick={() => {
                      openModal(selectedTemplate);
                    }}
                  >
                    <TemplateWrap
                      facing="front"
                      temp={selectedTemplate}
                      className={`${
                        orientation === "front"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="w-[175px] h-[100px]  flex justify-center items-center">
                <div
                  className="transform scale-50 cursor-pointer"
                  onClick={() => {
                    setorientation("back");
                  }}
                >
                  <button
                    className="cursor-pointer text-left"
                    onClick={() => {
                      openModal(selectedTemplate);
                    }}
                  >
                    <TemplateWrap
                      facing="back"
                      temp={selectedTemplate}
                      className={`${
                        orientation === "back"
                          ? "outline outline-primarycol outline-8"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="py-2 h-[8rem] flex flex-col justify-center items-center">
              <h6>Business Card | 85mm 50mm</h6>
              <div className="flex space-x-2 justify-center items-center mt-7">
                <button
                  className=" px-6 py-2 bg-primarycol rounded-full hover:scale-[.98] hover:bg-primaryDarkerOrange"
                  onClick={() => {
                    router.push("/customize?template=" + selectedTemplate);
                  }}
                >
                  Customize
                </button>
                <button className=" px-6 py-2 bg-primarycol rounded-full hover:scale-[.98] hover:bg-primaryDarkerOrange">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Templates;
