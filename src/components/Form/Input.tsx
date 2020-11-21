import React from "react";
import { useField } from "formik";
import { Input } from "antd";

import StyleWrapper from "./form.style";

export default ({ formik, label, ...props }: any): JSX.Element => {
  const [field, meta] = useField(props);

  const { error, touched, value } = meta;
  const { name } = props;

  return (
    <StyleWrapper
      className={`input text-input ${value ? "hasValue" : ""} ${
        touched && error ? "hasError" : ""
      }`}
    >
      {label && <label htmlFor={name}>{label}</label>}

      <Input id={name} data-test-id={name} {...props} {...field} />

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
