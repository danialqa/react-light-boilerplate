import axios from "axios";
import Cookies from "universal-cookie";

import config from "config";

const cookies = new Cookies();

export default ({ token, ...params }: any) => {
  const authorization = token || cookies.get("react-light-boilerplate");

  const data = {
    method: "get",
    headers: {
      Authorization: authorization ? `bearer ${authorization}` : undefined,
      "App-Platform": "web",
    },
    ...params,
  };

  if (config.apiURL) data.baseURL = `${config.apiURL}/api/v1`;

  return axios(data);
};
