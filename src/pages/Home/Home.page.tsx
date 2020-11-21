import React, { PureComponent } from "react";
import Helmet from "react-helmet";

import StyleWrapper from "./home.style";

class Home extends PureComponent {
  render() {
    return (
      <StyleWrapper>
        <Helmet title="React Light Boilerplate" />
        Home Page
      </StyleWrapper>
    );
  }
}

export default Home;
