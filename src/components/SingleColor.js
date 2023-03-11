import React, { useState, useEffect } from "react";
import rgbToHex from "../utils/utils";

const SingleColor = (props) => {
  const { rgb, weight, index } = props;
  const [alert, setAlert] = useState(false);
  const rgbCodes = rgb.join(",");

  const hex = rgbToHex(...rgbCodes);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);
  return (
    <article
      className={`${index === 10 ? "box-chip" : null} color ${
        index > 10 && "color-light"
      }`}
      style={{
        backgroundColor: `rgb(${rgbCodes})`,
      }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
