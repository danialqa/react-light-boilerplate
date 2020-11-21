import { createGlobalStyle } from "styled-components";

import OpenSans from "../../assets/fonts/OpenSans-Regular.woff";
import OpenSansLight from "../../assets/fonts/OpenSans-Light.woff";
import OpenSansSemibold from "../../assets/fonts/OpenSans-Semibold.woff";
import OpenSansBold from "../../assets/fonts/OpenSans-Bold.woff";

export default createGlobalStyle`
  body {
    color: #16181B;
    background-color: #fff;
    font-family: 'OpenSans';
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -ms-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
  }

  li {
    list-style: none;
  }

  @font-face {
    font-family: 'OpenSans';
    src: url(${OpenSans}) format("woff");
  }

  @font-face {
    font-family: 'OpenSans-Light';
    src: url(${OpenSansLight}) format("woff");
  }

  @font-face {
    font-family: 'OpenSans-Semibold';
    src: url(${OpenSansSemibold}) format("woff");
  }

  @font-face {
    font-family: 'OpenSans-Bold';
    src: url(${OpenSansBold}) format("woff");
  }
`;
