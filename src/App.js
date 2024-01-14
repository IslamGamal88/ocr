import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import ImageJS from "image-js";

const App = () => {
  const [imagePath, setImagePath] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const [relevantData, setRelevantData] = useState("");

  const handleImageChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageOCR = async () => {
    handleProcessImage();

    const worker = await createWorker("eng");
    const { data } = await worker.recognize(imagePath, {
      tessedit_char_whitelist:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:./ ",
      preserve_interword_spaces: "0",
    });
    await worker.terminate();
    handleProcessText(data);
  };

  const handleProcessImage = async () => {
    // load the image
    const img = await ImageJS.load(imagePath);

    // Convert to grayscale
    const grayscaleImg = img.grey();

    // get the threshold
    const threshold = grayscaleImg.getThreshold();

    // apply binarization using the mask method
    const binarizedImg = grayscaleImg.mask({
      threshold,
      invert: true,
    });

    // update the image
    setProcessedImage(binarizedImg.toDataURL());
  };

  const handleProcessText = (data) => {
    const filteredLines = data.lines.filter((line) => {
      return line.text.includes(":");
    });

    const relevantData = filteredLines.map((line) => {
      return line.text.split(":");
    });
    setRelevantData(relevantData);
  };

  return (
    <div className=" text-gray-900 flex flex-col items-start justify-start min-h-screen container m-auto py-16">
      <div>
        <input type="file" onChange={handleImageChange} />
        <button
          className="bg-blue-300 rounded-md px-4 py-2"
          style={{ padding: "" }}
          onClick={handleImageOCR}
        >
          OCR
        </button>
      </div>
      <div className="max-w-lg flex my-4">
        {imagePath && (
          <img className="pr-4" src={imagePath} alt="original" />
        )}
        {processedImage && (
          <img src={processedImage} alt="processed" />
        )}
      </div>

      <div className="mt-4">
        {relevantData && (
          <div className="flex flex-wrap">
            {relevantData.map(([label, value]) => {
              return (
                <div
                  key={`${label} - ${value}`}
                  className="flex flex-col w-1/2 px-4 py-4 gap-2"
                >
                  <label>{label}</label>
                  <input
                    className="border-2 rounded-md p-2"
                    type="text"
                    value={value}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
