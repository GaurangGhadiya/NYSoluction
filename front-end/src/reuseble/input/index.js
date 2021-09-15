import React from "react";

const Input = ({
  htmlId,
  name,
  label,
  type = "text",
  required = false,
  onChange,
  placeholder,
  value,
  error,
  children,
}) => {
  return (
    <div class="form-group mt-4">
      <label>{label}</label>
      <input
        type={type}
        class="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
