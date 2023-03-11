import React, { useState, useEffect } from "react";
import rgbToHex from "../utils/utils";

const SingleColor = (props) => {
  const { rgb, weight, lightColor } = props;
  const [alert, setAlert] = useState(false);
  const rgbCodes = rgb.join(",");
  console.log(rgbCodes);

  const hex = rgbToHex(...rgbCodes);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);
  return (
    <div
      className={`${+weight === 0 ? "tab-highlight" : null} tab`}
      style={{
        backgroundColor: `rgb(${rgbCodes})`,
        color: `${lightColor ? "#fff" : "#333"}`,
      }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </div>
  );
};

export default SingleColor;
