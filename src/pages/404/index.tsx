import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import StyleWrapper from "./404.style";

export default (): JSX.Element => (
  <StyleWrapper>
    <Helmet title="Not Found" />
    <h1>404</h1>
    <Link to="/">Back to Home</Link>
  </StyleWrapper>
);
