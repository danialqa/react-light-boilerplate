import styled from 'styled-components';

export default styled.section`
  &.input {
    margin-bottom: 25px;
    position: relative;
    color: #000;

    &.hasValue,
    &:focus-within {
      label {
        bottom: 41px;
        font-size: 11px;
      }
    }

    &:focus-within {
      .ant-input {
        border-color: #14b05b;
      }
    }

    &.hasError {
      .ant-input {
        border-color: #ff2b36;
      }

      label {
        color: #ff2b36;
      }
    }
  }

  .ant-input {
    background-color: transparent;
    border: 0;
    border-bottom: 1px solid #dae2ea;
    height: 52px;
    border-radius: 0;
    outline: none;
    box-shadow: none;
    color: #000;
    font-size: 16px;
  }

  label {
    color: #000;
    font-size: 15px;
    line-height: 1;
    position: absolute;
    bottom: 10px;
    left: 10px;
    transition: all ease 0.2s;
  }

  .text-danger {
    position: absolute;
    right: 0;
    bottom: -24px;
    padding: 2px 10px;
    border-radius: 8px;
    z-index: 1051;

    .text-danger--text {
      color: #ff2b36;
      font-size: 13px;
    }
  }

  /***************************** [ Select Input ] *****************************/
  &.select-input {
    .ant-select {
      height: 52px;
      width: 100%;

      .ant-select-selector {
        height: 52px;
        min-height: 52px;
        outline: none;
        box-shadow: none;
        border: none;
        border-radius: 0;
        background-color: transparent;
        border-bottom: 1px solid #31353d;

        .ant-select-selection-search-input {
          height: 52px;
        }

        .ant-select-selection-placeholder {
          line-height: 52px;
        }

        .ant-select-selection-item {
          line-height: 52px;
          color: #fff;
        }
      }
    }

    &.disabled {
      label {
        color: #6f788b;
      }

      .ant-select-selection-item {
        color: #6f788b !important;
      }
    }
  }

  /***************************** [ Checkbox Input ] **************************/
  &.checkbox-input {
    .ant-checkbox-wrapper {
      position: inherit;
      display: block;
      font-size: 16px !important;
      top: 0;

      .ant-checkbox {
        display: inline-block;
        vertical-align: top;

        .ant-checkbox-inner {
          width: 26px;
          height: 26px;
          border-radius: 40px;
          border: 1px solid #9facb9;
          background-color: transparent;

          &:after {
            background: url(/assets/images/check-white-icon.png) no-repeat
              center center;
            width: 13px;
            height: 10px;
            content: '';
            border: 0;
            transform: none;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 0;
            right: 0;
            display: block;
          }
        }

        &:after {
          display: none;
        }
      }

      &.ant-checkbox-wrapper-checked {
        .ant-checkbox {
          .ant-checkbox-inner {
            border-color: #14b05b;
            background-color: #14b05b;
          }
        }
      }

      span {
        &:last-child {
          display: inline-block;
          width: 86%;
          vertical-align: top;
          line-height: 20px;
          color: #000;
          font-size: 15px;
        }
      }
    }
  }

  /***************************** [ Text Area ] **************************/
  &.text-area-input {
    .ant-input {
      resize: none;
    }

    &.hasValue,
    &:focus-within {
      label {
        bottom: 50px;
      }
    }
  }
`;
