"use client";
import React, { useState } from "react";
import { FaCloudUploadAlt, FaEdit, FaTrash } from "react-icons/fa";
import TooltipCon from "../TootlTipCon";
import { MdPreview } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useAppContext } from "@/hook/AppContext";
import { IBusinessDetails } from "@/types/types";
import axios from "axios";
import { IUser } from "../../types/types";
import Modal from "../Modal";
import Profile from "@/components/dashboard/Profile";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const initialFormState: IBusinessDetails = {
  full_name: "",
  first_name: "",
  last_name: "",
  personal_email: "",
  bio: "",
  company_email: "",
  zip_code: "",
  company_name: "",
  position: "",
  address: "",
  mobilePhone: "",
  telephone: "",
  logo: "",
  company_address: "",
  web_url: "",
  qr_url: "",
  color_palette: ["#ffffff", "#333333", "#ffa500"],
  template: "",
};

const Form: React.FC<{
  data: any;
  index: any;
  userData: any;
  setuserData: any;
}> = ({ data, index, setuserData, userData }) => {
  const [colorPallete1, setcolorPallete1] = useState("black");
  const [colorPallete2, setcolorPallete2] = useState("white");
  const [colorPallete3, setcolorPallete3] = useState("#ffa500");
  const [fname, setfname] = useState(data?.first_name);
  const [error, seterror] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string | null>(
    data?.logo ?? null
  );
  const [selectedImageFile, setSelectedImageFile] = useState<any>(null);

  const [isEdit, setisEdit] = useState<boolean>(false);
  const { user, setUser, selectedDetails, setselectedDetails } =
    useAppContext();
  const [formData, setFormData] = useState<IBusinessDetails | null>(
    data ?? initialFormState
  );
  // console.log(index);
  // Update handler for form fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update only the field that changed
    }));
  };

  // Example for updating specific fields like color palette (array)
  const handleChangeName = (last: string) => {
    setFormData((prevState) => ({
      ...prevState,
      full_name: fname + " " + last,
      first_name: fname,
      last_name: last,
    }));
  };
  const handleColorChange = (index: number, newColor: string) => {
    setFormData((prev) => {
      const updatedPalette = (prev?.color_palette || []).map((color, i) =>
        i === index ? newColor : color
      );

      return {
        ...prev,
        color_palette: updatedPalette,
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageFile(file);
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
          description: "Uploading Image failed! please try again later",
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
  console.log(formData);

  const handleFormSave = async () => {
    setisEdit(false);

    try {
      let updatedLogoUrl = formData?.logo; // Use the existing logo by default

      // If a new image is selected, upload it and get the new URL
      if (selectedImageFile) {
        updatedLogoUrl = await handleFileUpload();
        if (!updatedLogoUrl) {
          throw new Error("Image upload failed");
        }
      }

      // Update formData with the new logo URL if necessary
      const updatedFormData = {
        ...formData,
        logo: updatedLogoUrl,
        qr_url: `http://localhost:3000/profile/${user?._id}?details=${formData?.company_name}`,
      };

      // Handle updating or adding the formData
      let updatedBusinessDetails;

      if (index !== null && (userData?.businessDetails || []).length > 0) {
        console.log("no index");
        // Update the item at the specified index
        updatedBusinessDetails = (userData?.businessDetails || []).map(
          (item: IBusinessDetails, i: number) =>
            i === index ? updatedFormData : item
        );
      } else {
        console.log("have index");

        // Add formData as the first item if the list is empty or index is null
        updatedBusinessDetails = [
          ...(userData?.businessDetails || []),
          updatedFormData,
        ];
      }

      // Prepare the updated user data
      const updatedUser = {
        ...userData,
        businessDetails: updatedBusinessDetails,
      };

      // API call to save the user data
      const response = await fetch(`/api/users/${user?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const result = await response.json();
      console.log("User updated successfully:", result);
      toast({
        title: "Successful!",
        description: "Successfully saved details",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
      // Optional: Update user state after successful save
      setUser(result);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const handleFormDelete = async () => {
    setisEdit(false);

    // Handle updating or adding the formData
    let updatedBusinessDetails;

    if (index !== null && (userData?.businessDetails || []).length > 0) {
      console.log("no index");
      // Update the item at the specified index
      updatedBusinessDetails = (userData?.businessDetails || []).filter(
        (item: IBusinessDetails, i: number) => i !== index
      );
      console.log(index);
    } else {
      console.log("have index");
      updatedBusinessDetails = [];
    }

    const updatedUser = {
      ...userData,
      businessDetails: updatedBusinessDetails,
    };

    // API call
    try {
      const response = await fetch(`/api/users/${user?._id}`, {
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

      const result = await response.json();
      console.log("User updated successfully:", result);

      // Optional: Update user state after successful save
      setUser(result);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSelectTemplate = (form: any) => {
    console.log(form);
    if (form) {
      setisEdit(false);
      setselectedDetails(data);
      sessionStorage.setItem("details", JSON.stringify(data));
      router.push(`/templates?detail=${index}`);
    } else {
      toast({
        title: "Invalid!",
        description: "Please fill in and save your details first!",
        variant: "destructive",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
    }
  };
  const handleAddNewCompany = (event: React.ChangeEvent<HTMLInputElement>) => {
    setisEdit(false);
    setuserData((prevState: IUser | null) => ({
      ...prevState,
      businessDetails: [
        ...(prevState?.businessDetails || []),
        initialFormState,
      ],
    }));
  };
  // console.log(formData);
  return (
    <div className=" bg-slate-100 w-full flex flex-col justify-center items-center">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[350px] p-6"
      >
        <div className="flex flex-col my-5 justify-center items-center">
          <h6 className="w-full text-left px-5 my-3">
            Are you sure to delete?.
          </h6>
          <div className="w-full flex flex-row mt-5 justify-around items-center">
            <button
              className="px-8 py-2 text-[grey] font-[600] hover:bg-slate-100"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-8 py-2 text-[red] font-[600] hover:bg-slate-100"
              onClick={() => {
                handleFormDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        className="w-[550px] p-6"
      >
        <div className="flex flex-col my-5 justify-center items-center">
          <div className=" height-[90%] flex flex-col my-5 justify-center items-center scale-75 pointer-events-none">
            <h1 className="text-[20px] font-[600] mb-2">Preview</h1>
            <Profile id={data?.company_name ?? null} />
          </div>
        </div>
      </Modal>
      <div className="container flex flex-wrap justify-between mt-8 w-[90%]">
        <div></div>
        <div className="flex justify-center items-center text-primaryDarkerOrange">
          <TooltipCon
            trigger={
              <button
                className="text-[2rem] mx-3 p-2 rounded-full hover:bg-slate-200"
                onClick={() => setIsModalOpen2(true)}
              >
                <MdPreview />
              </button>
            }
            content={<p>Preview</p>}
          />
          <TooltipCon
            trigger={
              !isEdit ? (
                <button
                  className="text-[1.7rem] mx-3 p-2 rounded-full hover:bg-slate-200 "
                  onClick={() => {
                    setisEdit(true);
                  }}
                >
                  <FaEdit />
                </button>
              ) : (
                <button
                  className="text-[1.6rem] mx-3 p-2 rounded-full hover:bg-slate-200"
                  onClick={(e: any) => {
                    if (!formData?.company_name) {
                      toast({
                        title: "Invalid!",
                        description: "Company Name is required!",
                        variant: "destructive",
                        // action: (
                        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                        // ),
                      });
                    } else {
                      handleFormSave();
                    }
                  }}
                  // disabled={!formData?.company_name}
                >
                  <FaCircleCheck />
                </button>
              )
            }
            content={<p>Edit</p>}
          />
          <TooltipCon
            trigger={
              <button
                className="text-[1.4rem] mx-2 p-2 rounded-full hover:bg-slate-200"
                onClick={(e: any) => {
                  setIsModalOpen(true);
                }}
              >
                <FaTrash />
              </button>
            }
            content={<p>Delete</p>}
          />
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden py-3">
        <div className="h-full w-full p-4 flex justify-center items-center">
          <div className="h-[90%] w-[90%] flex flex-col ">
            <h6 className="text-[1.3rem]">Enter your information</h6>
            <div className="w-full flex flex-row mt-8">
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                className="input-r-border-none-50"
                onChange={(e) => setfname(e.target.value)}
                disabled={!isEdit}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData?.last_name || ""}
                className="input-r-border-none-50"
                onChange={(e) => handleChangeName(e.target.value)}
                disabled={!isEdit}
              />
            </div>
            <div className="w-full flex ">
              {/* <input
                type="email"
                placeholder="Email Address"
                className="input-r-border-none-100 "
                name="personal_email"
                value={formData?.personal_email || ""}
                onChange={handleChange}
                disabled={!isEdit}
              /> */}
              <input
                type="email"
                placeholder="Email Address"
                className="input-r-border-none-50"
                name="company_email"
                value={formData?.company_email || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </div>
            <div className="w-full flex flex-row">
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
            </div>
            <div className="w-full flex-col ">
              <h6 className="text-[1rem] mx-8 my-2">
                Select Profile Color Pallete
              </h6>
              <div className="bg-white mx-2 p-2 rounded-full flex flex-row  w-[10rem]">
                {(formData?.color_palette || []).map((color, index) => (
                  <div
                    key={index}
                    className="relative w-10 h-10 border-[1px] mx-1 rounded-full shadow-sm"
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={!isEdit}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full p-4 flex justify-center items-center">
          <div className="h-[90%] w-[90%] flex flex-col ">
            <h6 className="text-[1.3rem]">Company information</h6>
            <div className="w-full flex mt-8">
              <input
                type="text"
                placeholder="Company name"
                className="input-r-border-none-100 "
                name="company_name"
                value={formData?.company_name || ""}
                onChange={handleChange}
                disabled={!isEdit}
                required={true}
              />
            </div>
            <div className="w-full flex flex-row ">
              {/* <input
                type="email"
                placeholder="Email Address"
                className="input-r-border-none-50"
                name="company_email"
                value={formData?.company_email || ""}
                onChange={handleChange}
                disabled={!isEdit}
              /> */}
              <input
                type="text"
                placeholder="Telephone no."
                className="input-r-border-none-50 "
                name="telephone"
                value={formData?.telephone || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
              <input
                type="text"
                placeholder="Website"
                className="input-r-border-none-50"
                name="web_url"
                value={formData?.web_url || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </div>
            <div className="w-full flex ">
              <input
                type="text"
                placeholder="Job Title"
                className="input-r-border-none-100 "
                name="position"
                value={formData?.position || ""}
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
                placeholder="Telephone no."
                className="input-r-border-none-50 "
                name="telephone"
                value={formData?.telephone || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </div> */}
            <div className="w-full flex ">
              <input
                type="text"
                placeholder="Company Address"
                className="input-r-border-none-100 "
                name="company_address"
                value={formData?.company_address || ""}
                onChange={handleChange}
                disabled={!isEdit}
              />
            </div>
            <div className="flex flex-col items-start mx-3 mt-3">
              <h5 className="text-[.8rem] my-3">Add your Company Logo</h5>
              <label className="relative w-40 h-40 flex items-center justify-center border-2 border-dashed rounded cursor-pointer">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="text-gray-500 p-3 text-center flex flex-col justify-center items-center">
                    <FaCloudUploadAlt size={35} />
                    <p className="text-[.8rem]">select an image</p>
                    <p className="text-[.6rem]">Use transparent png/jpg file</p>
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
              {selectedImage && (
                <button
                  disabled={!isEdit}
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedImageFile(null);

                    setFormData((prev) => ({ ...prev, logo: "" }));
                  }}
                  className="mt-2 text-sm text-red-500"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-center items-center mt-8 w-[90%] my-10">
        <button
          className="bg-primarycol hover:bg-primaryDarkerOrange p-3 w-[15rem]  rounded-full font-[500] shadow-md"
          onClick={() => handleSelectTemplate(formData?._id!)}
        >
          Select Template
        </button>

        {(user?.businessDetails || [])?.length > 0 &&
        index === (userData?.businessDetails || [])?.length - 1 ? (
          <button
            className=" p-3 w-[15rem] text-[.8rem] hover:text-[#5c5c5c] rounded-full font-[400] mt-3"
            onClick={(e: any) => handleAddNewCompany(e)}
          >
            + Add New Company
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
