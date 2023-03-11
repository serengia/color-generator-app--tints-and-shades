import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import rgbToHex from "../utils/utils";

const SingleColor = (props) => {
  const { rgb, weight, lightColor } = props;
  const rgbCodes = rgb.join(",");
  console.log("CHECK CHECK RGB", rgb);
  const [r, g, b] = rgb;
  const hex = rgbToHex(r, g, b);

  return (
    <div
      className={`${+weight === 0 ? "tab-highlight" : null} tab`}
      style={{
        backgroundColor: `rgb(${rgbCodes})`,
        color: `${lightColor ? "#fff" : "#333"}`,
      }}
      onClick={() => {
        toast.success(`${hex}: Copied to clipboard!`);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p>
    </div>
  );
};

export default SingleColor;
