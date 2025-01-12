"use client";
import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaCheck,
  FaCloudUploadAlt,
  FaEdit,
  FaFacebook,
  FaLinkedin,
  FaQrcode,
  FaRegCheckCircle,
  FaShareAlt,
  FaUserEdit,
} from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { TbMessageCircleFilled } from "react-icons/tb";
import {
  FaArrowRightFromBracket,
  FaCircleCheck,
  FaGoogle,
  FaMapLocationDot,
  FaRegCircleXmark,
  FaXmark,
} from "react-icons/fa6";
import Modal from "@/components/Modal";
import QRCode from "react-qr-code";
import { IBusinessDetails, IUser } from "@/types/types";
import axios from "axios";
import TooltipCon from "@/components/TootlTipCon";
import { FaLock } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Dashboard from "../../(dashboard)/dashboard/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
const initialFormState: IUser = {
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  photo: "",
};

const AccountSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<any | null>(null);
  const [details, setdetails] = useState<IBusinessDetails | null>(null);
  const [formData, setFormData] = useState<IUser>(userData ?? initialFormState);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [token, settoken] = useState<string>("");
  const { toast } = useToast();

  const [confirmPassword, setconfirmPassword] = useState<string>("");

  const [isloading, setisloading] = useState<boolean>(false);
  const [passError, setpassError] = useState<boolean | null>(null);
  const [success, setsuccess] = useState<boolean | null>(null);
  const [isChangePass, setisChangePass] = useState<boolean | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(
    userData?.photo ?? null
  );
  const [selectedImageFile, setSelectedImageFile] = useState<any>(null);
  const rules = [
    { label: "At least 8 characters", isValid: password.length >= 8 },
    {
      label: "At least 1 special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    // { label: "At least 1 uppercase letter", isValid: /[A-Z]/.test(password) },
    { label: "At least 1 number", isValid: /\d/.test(password) },
  ];

  const isPasswordValid = rules.every((rule) => rule.isValid);

  // const {color_pallete,company_address,company_email,company_name,full_name,logo,mobilePhone,personal_email,position,qr_url } = userData;
  console.log(userData);
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);
  const getUserData = async () => {
    let id2 = localStorage.getItem("token-id");
    const params1 = new URLSearchParams(window.location.search);
    const details = params1.get("details");
    const response = await fetch("/api/users/" + id2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      setUserData(data);
      setFormData(data);
      if (data?.photo) {
        setSelectedImage(data.photo);
      }
      // setdetails(data?.filteredBusinessDetail);
      console.log(data);
      console.log(details);

      // console.log( data?.businessDetails?.filter(
      //   (user: { _id: string | null }) => user._id === details
      // )[0]);
    } else {
      setError(data.message);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageFile(file);
  };
  const handleFormSave = async () => {
    setisEdit(false);

    try {
      let updatedphotoUrl = formData?.photo; // Use the existing photo by default

      // If a new image is selected, upload it and get the new URL
      if (selectedImageFile) {
        updatedphotoUrl = await handleFileUpload();
        if (!updatedphotoUrl) {
          throw new Error("Image upload failed");
        }
      }

      // Update formData with the new photo URL if necessary
      const updatedFormData = {
        ...formData,
        photo: updatedphotoUrl,
      };

      // Handle updating or adding the formData

      // Prepare the updated user data
      const updatedUser = {
        ...userData,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        email: formData?.email,
        photo: updatedphotoUrl ?? "",
      };

      // API call to save the user data
      const response = await fetch(`/api/users/${userData?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        toast({
          title: "Failed!",
          description: "An unexpected Error occurred, Please try again later!",
          variant: "destructive",
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
        throw new Error("Failed to update user.");
      }
      toast({
        title: "Successful!",
        description: "Successfully updated your Account details!",

        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
      const result = await response.json();
      console.log("User updated successfully:", result);

      // Optional: Update user state after successful save
      setUserData(result);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };
  const handleFileUpload = async (): Promise<string | any> => {
    const file = selectedImageFile;

    if (!file) return null;

    // Create FormData for API
    const formDataPayload = new FormData();
    formDataPayload.append("image", file);

    try {
      // Upload the image to your API
      const response = await axios.post("/api/upload-image", formDataPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Assuming API responds with the file URL
      if (response.status === 200) {
        return response.data.file.url;
      } else {
        toast({
          title: "Failed!",
          description: "An unexpected Error occurred, Please try again later!",
          variant: "destructive",
          // action: (
          //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          // ),
        });
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Ensure the error propagates
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisloading(true);

    const response = await fetch("/api/reset-pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData._id,
        token: token,
        newPassword: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // router.push("/login");
      toast({
        title: "Successful!",
        description: "Successfully updated your Account details!",

        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
      setsuccess(true);
      setisloading(false);
      setPassword("");
      setconfirmPassword("");
    } else {
      toast({
        title: "Failed!",
        description: "An unexpected Error occurred, Please try again later!",
        variant: "destructive",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
      setError(data.message);
      setPassword("");
      setconfirmPassword("");

      setisloading(false);
      setsuccess(false);
    }
  };
  const PassCompare = (e: string) => {
    setconfirmPassword(e);
    if (password === e) {
      setpassError(false);
    } else {
      setpassError(true);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisloading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userData?.email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setisChangePass(true);
      setisloading(false);
      setPassword("");
      settoken(data.token);
    } else {
      setError(data.message);
      setisloading(false);
    }
  };
  async function revokeGoogleToken(accessToken: any) {
    try {
      const response = await axios.post(
        `https://oauth2.googleapis.com/revoke?token=${accessToken}`
      );
      if (response.status === 200) {
        console.log("Access token successfully revoked");
      } else {
        console.error("Failed to revoke token:", response.status);
      }
    } catch (error) {
      console.error("Error revoking token:");
    }
  }
  return (
    <div className="w-full h-[100vh] bg-primarycol">
      <Modal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        className="w-[350px] p-6"
      >
        <>
          <div className=" h-[25rem] w-full rounded-[2.5rem] flex flex-col justify-center items-center">
            <h1 className="m-3 mt-5 mb-2 text-[1.5rem] text-center">
              Unlink from{" "}
              <span className="capitalize font-[500]">
                {formData?.register_type}
              </span>
              ?
            </h1>
            <p className="m-3 mt-5 mb-2 text-[.7rem] text-slate-500">
              <span className="capitalize font-[600]">Reminder</span>: If you
              unlink your account from{" "}
              <span className="capitalize font-[500]">
                {formData?.register_type}
              </span>
              , this account will be removed from our database, and you will no
              longer be able to log in via{" "}
              <span className="capitalize font-[500]">
                {formData?.register_type}
              </span>
              , unless you create a new account.
            </p>
            <p className="m-3 mt-0 mb-2 text-[.7rem] text-slate-500">
              If you wish to unlink your account from{" "}
              <span className="capitalize font-[500]">
                {formData?.register_type}
              </span>{" "}
              while keeping this account, select "Register" to continue using
              this account.
            </p>
            <div className="flex flex-row">
              <button
                className="w-full bg-primarycol hover:bg-primaryDarkerOrange text-white cursor-pointer p-2 px-10 mt-5 rounded-md font-[400] shadow-md"
                type="submit"
                disabled={isloading || !password || error !== ""}
              >
                {isloading ? "Registering..." : "Register"}
              </button>{" "}
              <button
                className="w-full outline outline-primarycol outline-2 hover:outline-primaryDarkerOrange  cursor-pointer hover:outline-[3px] text-primarycol p-2 px-10 mt-5 mx-2 rounded-md font-[400] shadow-md"
                type="submit"
                disabled={isloading || !password || error !== ""}
              >
                {isloading ? "Unlinking..." : "Unlink"}
              </button>
            </div>
          </div>
        </>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[350px] p-6"
      >
        {isChangePass ? (
          <div className=" h-[23rem] w-full rounded-[2.5rem] flex flex-col justify-center items-center">
            <h1 className="m-3 mt-5 mb-2 text-[1.5rem] ">
              {" "}
              {!success ? <>New password</> : <>Password Changed!</>}
            </h1>

            {error && <p className="mx-3 text-[.8rem] text-[red]">{error}*</p>}
            {success && (
              <p className="mx-3 text-[.8rem] p-3 px-7 rounded-md bg-[#00f000] text-white">
                Successfully changed password, Please try logging in to test
                your new password
              </p>
            )}
            {!success ? (
              <form onSubmit={handleSubmit} className="mt-5 mx-3">
                <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
                  <FaLock size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="New Password"
                    className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
                  />
                </div>
                {password && (
                  <ul className="mt-2 text-sm">
                    {isPasswordValid ? (
                      <p className="text-green-500 flex flex-row justify-start items-center">
                        Strong Password <FaCheck size={10} className="ml-2" />
                      </p>
                    ) : (
                      <>
                        {rules.map((rule, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span
                              className={
                                rule.isValid ? "text-green-500" : "text-red-500"
                              }
                            >
                              {rule.isValid ? (
                                <FaCheck size={10} />
                              ) : (
                                <FaXmark size={10} />
                              )}
                            </span>
                            <span>{rule.label}</span>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                )}
                <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
                  <FaLock size={18} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => PassCompare(e.target.value)}
                    placeholder="Confirm New Password"
                    className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
                  />
                  <h3 className="text-[.8rem]">
                    {passError === true ? (
                      <FaRegCircleXmark color="red" />
                    ) : passError === false ? (
                      <FaRegCheckCircle color="green" />
                    ) : null}{" "}
                  </h3>
                </div>
                <button
                  className="w-full bg-primarycol hover:bg-primaryDarkerOrange cursor-pointer p-3 px-10 mt-5 rounded-full font-[400] shadow-md"
                  type="submit"
                  disabled={
                    isloading || !password || error !== "" || !isPasswordValid
                  }
                >
                  {isloading ? "Submiting..." : "Submit"}
                </button>
              </form>
            ) : (
              <button
                className="w-full bg-primarycol mt-8 hover:bg-primaryDarkerOrange p-3 px-10  rounded-full font-[400] shadow-md"
                type="button"
                onClick={() => {
                  document.cookie = `token=; Path=/; Expires=${new Date(
                    0
                  ).toUTCString()};`;

                  window.location.href = "/auth/login";
                }}
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <div className=" h-[25rem] w-full rounded-[2.5rem] flex flex-col justify-center items-center">
            <h1 className="m-3 mt-5 mb-2 text-[1.5rem]">Current password</h1>

            {error && <p className="mx-3 text-[.8rem] text-[red]">{error}*</p>}

            <form onSubmit={handleLogin} className="mt-5 mx-3">
              <div className="rounded-full border-2 p-2 px-4 my-4 border-primarycol flex flex-row justify-center items-center">
                <FaLock size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="mx-2 ring-offset-background w-full placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 "
                />
              </div>

              <button
                className="w-full bg-primarycol cursor-pointer hover:bg-primaryDarkerOrange p-3 px-10 mt-5 rounded-full font-[400] shadow-md"
                type="submit"
                disabled={isloading || !password || error !== ""}
              >
                {isloading ? "Submiting..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </Modal>
      <div className="h-[8vh] relative z-10 bg-primarycol flex justify-center items-center w-full">
        <nav className="h-full relative z-10 container flex justify-between items-center px-[6rem] w-full">
          <a
            className="text-[1.2rem] text-primaryDarker font-semibold"
            href="/"
          >
            Obanana
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row justify-center items-center p-3 px-6 text-[.8rem] hover:bg-primaryDarkerOrange">
              {userData?.first_name} <FaAngleDown className="ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <button
                  onClick={() => {
                    window.location.href = "/dashboard";
                  }}
                >
                  <h1 className="text-[.8rem] text-primaryDarker font-[400]">
                    Dashboard
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
      <div className="w-full h-[90vh] bg-primarycol flex justify-center items-center ">
        <div className="w-[90%] md:w-[70%] lg:w-[60%] h-[93%] rounded-2xl border-2 p-8 border-slate-100 bg-white shadow-md flex flex-col items-center ">
          <div className="border-b-2 pb-4">
            <div className="w-full flex justify-end">
              <TooltipCon
                trigger={
                  !isEdit ? (
                    <button
                      className="text-[1.7rem] mx-3 p-2 text-primarycol rounded-full hover:bg-slate-200 "
                      onClick={() => {
                        setisEdit(!isEdit);
                      }}
                    >
                      <FaEdit />
                    </button>
                  ) : (
                    <button
                      className="text-[2rem] mx-3 p-2 text-primarycol rounded-full hover:bg-slate-200"
                      onClick={(e: any) => {
                        handleFormSave();
                      }}
                    >
                      <FaCircleCheck />
                    </button>
                  )
                }
                content={<p>Edit</p>}
              />
            </div>
            <div className="relative flex justify-center items-center mx-3 mt-3">
              <div className="relative w-[100px] h-[100px] flex items-center justify-center  rounded-full cursor-pointer">
                <label className="relative w-[100px] h-[100px] flex items-center justify-center border-2 border-dashed rounded-full cursor-pointer">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full bg-slate-200"
                    />
                  ) : (
                    <div className="text-gray-500 ml-2 h-full w-full flex justify-center items-center">
                      <FaUserEdit size={55} />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                    disabled={!isEdit}
                  />
                </label>
                {selectedImage && isEdit ? (
                  <button
                    disabled={!isEdit}
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedImageFile(null);

                      setFormData((prev) => ({ ...prev, photo: "" }));
                    }}
                    className=" absolute right-1 shadow-md top-0 bg-slate-100 p-1 rounded-full text-sm text-slate-500"
                  >
                    <FaXmark size={10} />
                  </button>
                ) : null}
              </div>
            </div>
            <div className="w-full flex flex-row mt-8">
              <input
                type="text"
                placeholder="First Name"
                value={formData?.first_name ?? ""}
                className="input-r-border-none-50 bg-slate-100"
                onChange={handleChange}
                name="first_name"
                disabled={!isEdit}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData?.last_name || ""}
                className="input-r-border-none-50 bg-slate-100"
                onChange={handleChange}
                name="last_name"
                disabled={!isEdit}
              />
            </div>
            <div className="w-full flex ">
              <input
                type="email"
                placeholder="Email Address"
                className="input-r-border-none-100 bg-slate-100"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </div>
            {/* <div className="w-full flex flex-row">
            <input
              type="text"
              placeholder="Contact no."
              className="input-r-border-none-50 "
              name="mobilePhone"
              value={formData?.mobilePhone || ""}
              onChange={handleChange}
              disabled={!isEdit}
            />
            <input
              type="text"
              placeholder="Zip/postal code"
              className="input-r-border-none-50 "
              name="zip_code"
              value={formData?.zip_code || ""}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
          <div className="w-full flex flex-col">
            <h6 className="text-[1rem] mx-8 my-2">Profile bio</h6>
            <textarea
              placeholder="Tell the word how awesome you are!"
              className="textarea-r-border-none-100"
              name="bio"
              value={formData?.bio || ""}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div> */}
          </div>
          <div className="">
            {formData?.register_type === "default" ? (
              // || !formData?.register_type
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-md mt-5 flex flex-row p-3 justify-center items-center px-10 w-full border-2 border-primarycol text-primarycol"
              >
                Change Password <FaLock className="ml-2" />
              </button>
            ) : formData?.register_type === "google" ? (
              <button
                onClick={() => setIsModalOpen2(true)}
                className="rounded-md mt-5 flex flex-row p-3 justify-center items-center px-10 w-full border-2 border-primarycol text-primarycol"
              >
                Unlink from{" "}
                {formData?.register_type === "google" ? (
                  <>
                    <FaGoogle className="mx-3" />
                    Google
                  </>
                ) : formData?.register_type === "linkedin" ? (
                  <>
                    <FaLinkedin className="mx-3" />
                    Linkedin
                  </>
                ) : formData?.register_type === "facebook" ? (
                  <>
                    <FaFacebook className="mx-3" />
                    Facebook
                  </>
                ) : null}{" "}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
