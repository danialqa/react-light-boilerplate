import React from "react";

export default (): JSX.Element => (
  <div
    style={{
      background: "#fff",
      height: "100vh",
      position: "fixed",
      width: "100vw",
      zIndex: 1000,
    }}
  >
    <span
      style={{
        width: "180px",
        height: "500px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      }}
    />

    <p
      style={{
        bottom: 0,
        height: "40px",
        left: 0,
        margin: "auto",
        position: "absolute",
        fontFamily: "OpenSans-SemiBold",
        fontSize: "35px",
        right: 0,
        textAlign: "center",
        top: "140px",
        color: "#fff",
      }}
    ></p>
  </div>
);
