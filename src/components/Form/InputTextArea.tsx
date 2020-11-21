import React from 'react';
import { useField } from 'formik';
import { Input } from 'antd';

import StyleWrapper from './form.style';

export default ({ formik, label, ...props }: any): JSX.Element => {
  const [field, meta] = useField(props);

  const { error, touched, value } = meta;
  const { name, placeholder } = props;

  return (
    <StyleWrapper
      className={`input text-area-input ${value ? 'hasValue' : ''} ${
        touched && error ? 'hasError' : ''
      }`}
    >
      {label && <label htmlFor={name}>{label}</label>}

      <Input.TextArea
        {...props}
        {...field}
        id={name}
        data-test-id={name}
        placeholder={placeholder}
        rows={5}
        style={{ width: '100%' }}
      />

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
