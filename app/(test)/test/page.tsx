"use client";
import React, { useState } from "react";

const templates = [
  {
    id: 1,
    name: "Modern Minimalist",
    defaultColor: "#4F46E5",
    defaultFont: "font-sans",
    defaultImage: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Elegant Black and White",
    defaultColor: "#000000",
    defaultFont: "font-serif",
    defaultImage: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Vibrant Splash",
    defaultColor: "#EC4899",
    defaultFont: "font-mono",
    defaultImage: "https://via.placeholder.com/100",
  },
];

const BusinessCardDesigner = () => {
  // const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  // const [backgroundColor, setBackgroundColor] = useState(
  //   selectedTemplate.defaultColor
  // );
  // const [backgroundHex, setBackgroundHex] = useState(
  //   selectedTemplate.defaultColor
  // );
  // const [fontStyle, setFontStyle] = useState(selectedTemplate.defaultFont);
  // const [imageUrl, setImageUrl] = useState(selectedTemplate.defaultImage);
  // const [borderRadius, setBorderRadius] = useState(0);
  // const [borderWidth, setBorderWidth] = useState(2);
  // const [imageShape, setImageShape] = useState("square");
  // const [imageBorder, setImageBorder] = useState(true);
  // const [headingColor, setHeadingColor] = useState("#333333");
  // const [subheadingColor, setSubheadingColor] = useState("#555555");
  // const [textColor, setTextColor] = useState("#777777");
  // const [borderColor, setBorderColor] = useState("#000000");
  // // Font style and weight settings for each text type
  // const [headingFontFamily, setHeadingFontFamily] = useState("Arial");
  // const [headingFontWeight, setHeadingFontWeight] = useState("normal");
  // const [headingItalic, setHeadingItalic] = useState(false);
  // const [headingLineThrough, setHeadingLineThrough] = useState(false);

  // const [subheadingFontFamily, setSubheadingFontFamily] = useState("Arial");
  // const [subheadingFontWeight, setSubheadingFontWeight] = useState("normal");
  // const [subheadingItalic, setSubheadingItalic] = useState(false);
  // const [subheadingLineThrough, setSubheadingLineThrough] = useState(false);

  // const [bodyFontFamily, setBodyFontFamily] = useState("Arial");
  // const [bodyFontWeight, setBodyFontWeight] = useState("normal");
  // const [bodyItalic, setBodyItalic] = useState(false);
  // const [bodyLineThrough, setBodyLineThrough] = useState(false);

  // const handleTemplateChange = (template: any) => {
  //   setSelectedTemplate(template);
  //   setBackgroundColor(template.defaultColor);
  //   setBackgroundHex(template.defaultColor);
  //   setFontStyle(template.defaultFont);
  //   setImageUrl(template.defaultImage);
  //   setBorderRadius(0);
  //   setBorderWidth(2);
  //   setImageShape("square");
  //   setImageBorder(true);
  //   setHeadingColor("#333333");
  //   setSubheadingColor("#555555");
  //   setTextColor("#777777");
  // };

  // const handleBackgroundHexChange = (e: any) => {
  //   const value = e.target.value;
  //   setBackgroundHex(value);
  //   setBackgroundColor(value);
  // };

  return (
    <div className="flex flex-row justify-between w-full h-full ">
      {/* Template Selection */}

      {/* Customization Options */}

      {/* Card Preview */}
      {/* <div className="  w-[60%] flex items-center justify-center p-6">
        <div
          className="relative p-4 rounded-lg shadow-lg w-[400px] text-center"
          style={{ backgroundColor, fontFamily: fontStyle }}
        >
          <div
            className={`${
              imageBorder ? "border border-gray-500" : " border-none"
            }`}
            style={{
              width: "100px",
              height: "100px",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius:
                imageShape === "circle" ? "50%" : `${borderRadius}%`,
              borderWidth: `${borderWidth}px`,
              borderColor: borderColor ?? "none", // Apply the border color
            }}
          ></div>
          <h1
            style={{
              fontFamily: headingFontFamily,
              fontWeight: headingFontWeight,
              fontStyle: headingItalic ? "italic" : "normal",
              textDecoration: headingLineThrough ? "line-through" : "none",
              color: headingColor, // Presuming you already have headingTextColor state
            }}
          >
            Heading Text
          </h1>
          <h2
            className={`${fontStyle} text-xl font-bold`}
            style={{ color: headingColor }}
          >
            John Doe
          </h2>
          <p className={`${fontStyle}`} style={{ color: subheadingColor }}>
            Lead Designer
          </p>
          <p className={`${fontStyle} mt-2`} style={{ color: textColor }}>
            johndoe@example.com
          </p>
        </div>
      </div>
      <div className=" max-w-md  w-[40%] max-h-[95vh] overflow-y-auto p-6">
        <div className="flex space-x-4">
          {templates.map((template) => (
            <button
              key={template.id}
              className="px-4 py-2 rounded shadow-md"
              style={{ backgroundColor: template.defaultColor, color: "#fff" }}
              onClick={() => handleTemplateChange(template)}
            >
              {template.name}
            </button>
          ))}
        </div>
        <div>
          <label className="block mb-2">Background Color:</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-10 h-10 p-1 rounded border"
            />
            <input
              type="text"
              value={backgroundHex}
              onChange={handleBackgroundHexChange}
              className="border p-2 rounded w-20"
              placeholder="#000000"
            />
          </div>
        </div>

        
        <div className="mt-4">
          <h4>Heading Font Customization</h4>

          <div className="mt-2">
            <label>Font Family:</label>
            <select
              value={headingFontFamily}
              onChange={(e) => setHeadingFontFamily(e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
             
            </select>
          </div>

          <div className="mt-2">
            <label>Font Weight:</label>
            <select
              value={headingFontWeight}
              onChange={(e) => setHeadingFontWeight(e.target.value)}
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
          </div>

          <div className="mt-2 flex items-center">
            <label>Italic:</label>
            <input
              type="checkbox"
              checked={headingItalic}
              onChange={(e) => setHeadingItalic(e.target.checked)}
              className="ml-2"
            />
          </div>

          <div className="mt-2 flex items-center">
            <label>Line-through:</label>
            <input
              type="checkbox"
              checked={headingLineThrough}
              onChange={(e) => setHeadingLineThrough(e.target.checked)}
              className="ml-2"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Heading Color:</label>
          <input
            type="color"
            value={headingColor}
            onChange={(e) => setHeadingColor(e.target.value)}
            className="w-full h-10 p-1 rounded border"
          />
        </div>
        <div>
          <label className="block mb-2">Subheading Color:</label>
          <input
            type="color"
            value={subheadingColor}
            onChange={(e) => setSubheadingColor(e.target.value)}
            className="w-full h-10 p-1 rounded border"
          />
        </div>
        <div>
          <label className="block mb-2">Text Color:</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10 p-1 rounded border"
          />
        </div>

        <div>
          <label className="block mb-2">Font Style:</label>
          <select
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="font-sans">Sans</option>
            <option value="font-serif">Serif</option>
            <option value="font-mono">Mono</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Image Settings:</label>
          <button
            onClick={() => setImageUrl(prompt("Enter new image URL", imageUrl))}
            className="w-full mb-2 p-2 rounded bg-gray-200"
          >
            Change Image
          </button>

          <div className="flex items-center justify-between mt-2">
            <label>Shape:</label>
            <div>
              <button
                className={`px-4 py-1 ${
                  imageShape === "square"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setImageShape("square")}
              >
                Square
              </button>
              <button
                className={`px-4 py-1 ml-2 ${
                  imageShape === "circle"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setImageShape("circle")}
              >
                Circle
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <label>Border:</label>
            <button
              className={`px-4 py-1 ${
                imageBorder ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setImageBorder(!imageBorder)}
            >
              Toggle Border
            </button>
          </div>
          {imageBorder && (
            <>
              <div className="flex items-center justify-between mt-2">
                <label>Border Width:</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(e.target.value)}
                  className="ml-4 w-full"
                />
                <span className="ml-2">{borderWidth}px</span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <label>Border Color:</label>
                <input
                  type="color"
                  value={borderColor}
                  onChange={(e) => setBorderColor(e.target.value)}
                  className="w-10 h-10 p-1 rounded border"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-between mt-2">
            <label>Border Radius:</label>
            <input
              type="range"
              min="0"
              max="50"
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
              className="ml-4 w-full"
            />
            <span className="ml-2">{borderRadius}%</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BusinessCardDesigner;
