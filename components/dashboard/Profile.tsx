"use client";
import React, { useEffect, useState } from "react";
import { FaQrcode, FaShareAlt } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaArrowRightFromBracket, FaMapLocationDot } from "react-icons/fa6";
import Modal from "@/components/Modal";
import QRCode from "react-qr-code";
import { IBusinessDetails } from "@/types/types";
const Profile: React.FC<{ id: string | number }> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<any | null>(null);
  const [details, setdetails] = useState<IBusinessDetails | null>(null);

  // const {color_pallete,company_address,company_email,company_name,full_name,logo,mobilePhone,personal_email,position,qr_url } = userData;
  console.log(userData);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let id2 = localStorage.getItem("token-id");
    const params1 = new URLSearchParams(window.location.search);
    const details = params1.get("details");
    const response = await fetch("/api/users/" + id2 + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setUserData(data);
      setdetails(data?.filteredBusinessDetail);
      console.log(data);
      console.log(details);

      // console.log( data?.businessDetails?.filter(
      //   (user: { _id: string | null }) => user._id === details
      // )[0]);
    } else {
      setError(data.message);
    }
  };
  // let data1 = {
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

  const openPhoneApp = () => {
    window.location.href = "tel:" + details?.mobilePhone;
  };

  const openMessagingApp = () => {
    window.location.href = "sms:" + details?.mobilePhone;
  };

  const openEmailApp = () => {
    window.location.href = "mailto:" + details?.company_email;
  };
  const openAddress = () => {
    window.location.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      details?.company_address;
  };
  const goToWeb = () => {
    window.location.href = "http://localhost:3000";
  };
  const saveToContacts = () => {
    let vCardData = "BEGIN:VCARD\nVERSION:3.0\n";

    vCardData += `FN: ${details?.full_name}\n`;
    vCardData += `TITLE: ${details?.position}\n`;
    vCardData += `ORG: ${details?.company_name}\n`;
    vCardData += `TEL;TYPE=WORK,VOICE: ${details?.telephone}\n`;
    vCardData += `TEL;TYPE=CELL: ${details?.mobilePhone}\n`;
    vCardData += `EMAIL: ${details?.company_email}\n`;
    vCardData += `ADR;TYPE=WORK:;; ${details?.company_address}\n`;
    vCardData += `URL;TYPE=WORK: ${details?.web_url}\n`;
    vCardData += "END:VCARD";

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    const filename = `${details?.full_name?.replace(" ", "_")}_contact.vcf`; // dynamic filename
    a.download = filename;

    // Simulate click to trigger the download
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="w-full h-[100vh] bg-primarycol flex justify-center items-center "
      style={{ backgroundColor: details?.color_palette?.[2] }}
    >
      <div className="w-[350px] h-[95vh] rounded-2xl border-2 p-8 border-slate-100 bg-white shadow-md flex flex-col items-center ">
        <div
          className="w-full flex flex-row justify-end items-end text-primarycol"
          style={{ color: details?.color_palette?.[2] }}
        >
          <button
            onClick={() => setIsModalOpen2(true)}
            className="hover:bg-slate-100  hover:rounded-full h-[2rem] w-[2rem] flex justify-center items-center"
          >
            <FaShareAlt className="text-[1.2rem]" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-slate-100  hover:rounded-full h-[2rem] w-[2rem] flex justify-center items-center"
          >
            <FaQrcode className=" text-[1.2rem]" />
          </button>
        </div>
        <div className="w-full p-3 flex flex-col justify-center items-center">
          <img
            src={
              userData?.user_photo
                ? "http://localhost:3000/" + userData?.user_photo
                : "https://cdn-icons-png.freepik.com/512/64/64572.png"
            }
            alt="user_photo"
            className="h-[5rem] w-[5rem] rounded-full object-cover"
          />
          <h3 className="mt-4 text-[1.1rem] font-[500]">
            {details?.full_name}
          </h3>
          <p className="mt-2 text-center text-[.65rem] text-slate-500">
            {details?.bio}
          </p>
          <div className="w-full px-8 flex flex-row justify-around items-center mt-4">
            <button
              className="hover:bg-slate-100 hover:scale-95  hover:rounded-full border-[1px] border-primarycol shadow-sm rounded-full h-[2.3rem] w-[2.3rem] flex justify-center items-center"
              onClick={() => {
                openPhoneApp();
              }}
              style={{
                borderColor: details?.color_palette?.[2],
                color: details?.color_palette?.[2],
              }}
            >
              <MdCall
                size={25}
                className="text-primarycol"
                style={{ color: details?.color_palette?.[2] }}
              />
            </button>
            <button
              className="hover:bg-slate-100 hover:scale-95  hover:rounded-full border-[1px] border-primarycol shadow-sm rounded-full h-[2.3rem] w-[2.3rem] flex justify-center items-center"
              onClick={() => {
                openMessagingApp();
              }}
              style={{
                borderColor: details?.color_palette?.[2],
                color: details?.color_palette?.[2],
              }}
            >
              <TbMessageCircleFilled
                size={25}
                className="text-primarycol"
                style={{ color: details?.color_palette?.[2] }}
              />
            </button>
            <button
              className="hover:bg-slate-100 hover:scale-95  hover:rounded-full border-[1px] border-primarycol shadow-sm rounded-full h-[2.3rem] w-[2.3rem] flex justify-center items-center"
              onClick={() => {
                openEmailApp();
              }}
              style={{
                borderColor: details?.color_palette?.[2],
                color: details?.color_palette?.[2],
              }}
            >
              <IoIosMail
                size={25}
                className="text-primarycol"
                style={{ color: details?.color_palette?.[2] }}
              />
            </button>
            <button
              className="hover:bg-slate-100 hover:scale-95  hover:rounded-full border-[1px] border-primarycol shadow-sm rounded-full h-[2.3rem] w-[2.3rem] flex justify-center items-center"
              onClick={() => {
                openAddress();
              }}
              style={{
                borderColor: details?.color_palette?.[2],
                color: details?.color_palette?.[2],
              }}
            >
              <FaMapLocationDot
                size={21}
                className="text-primarycol"
                style={{ color: details?.color_palette?.[2] }}
              />
            </button>
          </div>
        </div>
        <div className=" w-[100%] p-2 mt-2  rounded-xl bg-slate-100 flex justify-start items-center">
          <ul className="px-1 text-[.65rem] my-2 w-full">
            <li className="w-full flex flex-row  py-1 justify-between  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Email Address:
              </span>{" "}
              <p className="text-wrap w-[57%]">{details?.company_email}</p>
            </li>
            <li className="w-full flex flex-row  py-1 justify-between  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Contact Number:
              </span>{" "}
              <p className="text-wrap w-[57%]">{details?.mobilePhone}</p>
            </li>
            <li className="w-full flex flex-row  py-1 justify-between  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Telephone Number:
              </span>{" "}
              <p className="text-wrap w-[57%]">{details?.telephone}</p>
            </li>{" "}
            <li className="w-full flex flex-row  py-1 justify-between  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Job Title:
              </span>{" "}
              <p className="text-wrap w-[57%]">{details?.position}</p>
            </li>{" "}
            <li className="w-full flex flex-row justify-between  py-1  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Company Name:
              </span>{" "}
              <p className="text-wrap w-[57%] ">{details?.company_name}</p>
            </li>{" "}
            <li className="w-full flex flex-row  py-1 justify-between  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Company Address:
              </span>{" "}
              <p className="text-wrap w-[57%]">{details?.company_address}</p>
            </li>{" "}
            <li className="w-full flex flex-row  py-1 justify-between  ">
              <span className="font-[600] pr-2 text-nowrap w-[43%] ">
                Website:
              </span>{" "}
              <a
                onClick={() => {
                  // goToWebUrl();
                }}
                className="text-wrap w-[57%] !underline-offset-1 cursor-pointer"
              >
                {details?.web_url}
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center py-3 mt-5">
          <button
            className="p-2 px-10 shadow-md bg-primarycol hover:scale-95 rounded-lg  text-[.8rem] text-white"
            style={{ backgroundColor: details?.color_palette?.[2] }}
            onClick={() => {
              saveToContacts();
            }}
          >
            Save to Contacts
          </button>
          <button
            className="p-2 px-8 mt-4 shadow-md hover:scale-95 bg-white border-2 border-primarycol rounded-lg  text-[.8rem] text-primarycol font-[700] flex flex-row justify-center items-center"
            style={{
              borderColor: details?.color_palette?.[2],
              color: details?.color_palette?.[2],
            }}
            onClick={() => {
              goToWeb();
            }}
          >
            Get your own Card{" "}
            {/* <FaArrowRightFromBracket className="text-[1.2rem] pl-2" /> */}
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[350px] p-6"
      >
        <div className="flex flex-col my-5 justify-center items-center">
          <QRCode
            size={170}
            style={{}}
            value={details?.qr_url?.toString() ?? ""}
            viewBox={`0 0 170 170`}
          />
          <h6 className="text-center mt-8">
            Scan this QR to view my contact information.
          </h6>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        className="w-[350px]"
      >
        <div className="w-full flex flex-col my-5 justify-center items-center">
          <h6 className="text-center my-5">
            Share your contact details with User
          </h6>

          <div className="w-full flex flex-col my-5 px-3 justify-center items-center">
            <input
              type="text"
              placeholder="Your Name"
              className="input-r-border-none-100 mx-0 bg-slate-100"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="input-r-border-none-100 mx-0 bg-slate-100"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input-r-border-none-100 mx-0 bg-slate-100"
            />
            <textarea
              placeholder="Additional Notes"
              className="textarea-r-border-none-100 mx-0 bg-slate-100 min-h-[6rem]"
            />

            <button
              className="py-2 px-8 bg-primarycol shadow-md hover:scale-95 rounded-lg text-[.8rem] mt-6"
              style={{ backgroundColor: details?.color_palette?.[2] }}
            >
              Send Details
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
