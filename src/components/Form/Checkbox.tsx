import React from "react";
import { useField } from "formik";
import { Checkbox } from "antd";

import StyleWrapper from "./form.style";

export default ({ label, ...props }: any): JSX.Element => {
  const [{ value, ...field }, meta] = useField(props);

  const { error, touched } = meta;
  const { name } = props;

  return (
    <StyleWrapper className="input checkbox-input">
      <Checkbox
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        checked={value}
      >
        {label}
      </Checkbox>

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
