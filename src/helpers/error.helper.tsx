// @flow
import React from "react";
import { notification } from "antd";

export default (error: any, config?: any) => {
  if (typeof error === "object" && error.errors instanceof Array) {
    notification.error({
      message: "Error",
      description: (
        <div>
          {error.errors.map((message) => (
            <span key={`error_${Math.random()}`}>
              {message}
              <br />
            </span>
          ))}
        </div>
      ),
      ...config,
    });
  } else if (typeof error === "object" && error.message) {
    notification.error({
      message: "Error",
      description: error.message,
      ...config,
    });
  } else {
    notification.error({
      message: "Error",
      description: "Something went wrong, please try again",
      ...config,
    });
  }
};
