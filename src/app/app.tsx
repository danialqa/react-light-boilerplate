import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { matchRoutes, renderRoutes } from "react-router-config";
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";
import { useDispatch } from "react-redux";

import { Fallback, NoInternet } from "components";
import config from "config";
import url from "helpers/url.helper";
import StyleWrapper from "./app.style";
import GlobalStyle from "./global.style";

const App = ({ location, route }: any) => {
  const currentPathURL = location.pathname + location.search;
  const [loading, setLoading] = useState(true);
  const [pathURL, setPathURL] = useState(currentPathURL);
  const dispatch = useDispatch();
  const matchedRoutes = matchRoutes(route.routes, location.pathname);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  const params = matchedRoutes.reduce(
    (acc, { match }) => ({ ...acc, ...match.params }),
    {}
  );

  const query = url.parse(location);

  if (typeof window === "object" && currentPathURL !== pathURL) {
    matchedRoutes
      .map(({ route: { loadData } }) =>
        loadData ? loadData({ params, query }) : []
      )
      // @ts-ignore
      .flat()
      .map(dispatch);
    setPathURL(currentPathURL);
  }

  return (
    <>
      <GlobalStyle />

      <StyleWrapper>
        <Helmet {...config.app} />

        <Offline>
          <NoInternet />
        </Offline>

        <Online>
          {loading && <Fallback />}
          {renderRoutes(route.routes, { params, query })}
        </Online>
      </StyleWrapper>
    </>
  );
};

export default hot(module)(App);
