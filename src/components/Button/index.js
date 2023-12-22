import React from "react";
import "./styles.css";
function Button({ text, onClick, blue, disabled, type }) {
  return <button 
  disabled={disabled}
  onClick={onClick}
  type={type ? "submit" : ""}
  className={blue ? "btn btn-blue" : "btn"}>{text}</button>;
}

export default Button;
