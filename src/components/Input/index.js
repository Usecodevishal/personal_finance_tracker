import React from "react";
import "./styles.css";
function Input({ label, state, setState, placeholder, type }) {
  return (
    <div className="input-wrapper">
      <div className="label-input">{label}</div>
      <input 
      type={type}
      value={state}
      onChange={(e)=>setState(e.target.value)}
      className="custom-input-user"
      placeholder={placeholder} />
    </div>
  );
}

export default Input;
