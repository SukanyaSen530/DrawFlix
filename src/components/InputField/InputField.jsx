import "./input-field.scss";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function InputField({ label, type, errorMessage, ...other }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="input-group-new">
      <label className="input-group-new__label">{label}</label>
      <input
        {...other}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        className="input-group-new__input"
        placeholder={label}
      />

      {type === "password" ? (
        <span
          onClick={() => setShowPass((val) => !val)}
          className="input-group-new__show-pass"
        >
          {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      ) : (
        ""
      )}

      {errorMessage && (
        <span className="input-group-new__error-message">{errorMessage}</span>
      )}
    </div>
  );
}

export default InputField;
