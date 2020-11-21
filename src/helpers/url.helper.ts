import queryString from "query-string";

export function parse(location: any) {
  return queryString.parse(location.search);
}

export default {
  parse,
};
