import React from "react";
import { Button } from "antd";

import StyleWrapper from "./form.style";

export default (props: any): JSX.Element => {
  const {
    children,
    className = "",
    formik,
    htmlType = "submit",
    id = "submitBtn",
    label,
    ...rest
  } = props;

  const { isSubmitting, isValid } = formik;

  return (
    <StyleWrapper className="submit-button">
      <Button
        className={className}
        htmlType={htmlType}
        id={id}
        data-test-id={id}
        loading={isSubmitting}
        disabled={!isValid}
        {...rest}
      >
        {children || label}
      </Button>
    </StyleWrapper>
  );
};
