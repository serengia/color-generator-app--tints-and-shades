import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdLibraryAddCheck, MdContentCopy } from "react-icons/md";
import rgbToHex from "../utils/utils";

const SingleColor = (props) => {
  const [tabIsHovered, setTabIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const { rgb, weight } = props;
  const rgbCodes = rgb.join(",");
  const [r, g, b] = rgb;
  const hex = rgbToHex(r, g, b);

  const tabMouseEnterHandler = () => {
    setTabIsHovered(true);
  };

  const tabMouseLeaveHandler = () => {
    setTabIsHovered(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <div
      className={`${+weight === 0 ? "tab-highlight" : null} tab`}
      style={{
        backgroundColor: `rgb(${rgbCodes})`,
      }}
      onClick={() => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        toast.success(`${hex}: Copied to clipboard!`);
      }}
      onMouseEnter={tabMouseEnterHandler}
      onMouseLeave={tabMouseLeaveHandler}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p>

      <span className="icons">
        {tabIsHovered && !copied && (
          <span className="icon-wrapper">
            <MdContentCopy className="icon icon-copy" />
          </span>
        )}
        {copied && (
          <span className="icon-wrapper">
            <MdLibraryAddCheck className="icon icon-copied" />
          </span>
        )}
      </span>
    </div>
  );
};

export default SingleColor;
