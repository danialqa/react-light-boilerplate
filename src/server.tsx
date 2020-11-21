import path from "path";
import React from "react";
import { Provider } from "react-redux";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import { Helmet } from "react-helmet";
import hpp from "hpp";
import favicon from "serve-favicon";
import { renderToString } from "react-dom/server";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes, matchRoutes } from "react-router-config";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import cookieParser from "cookie-parser";

import config from "./config";
import { axiosHelper, dispatchHelper } from "./helpers";
import htmlHelper from "./helpers/html.helper";
import ActionTypes from "./redux/actionTypes";
import createStore from "./redux/store";
import routes from "./routes";

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());

app.use(express.static("./dist"));
app.use(favicon(path.resolve(process.cwd(), "assets/favicon.ico")));
app.use("/assets", express.static(path.resolve(process.cwd(), "assets")));

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *");
});

// @ts-ignore
if (global.DEV) {
  /* Run express as webpack dev server */
  const webpack = require("webpack");
  const webpackConfig = require("../webpack.config.js");
  const compiler = webpack(webpackConfig);
  const instance = require("webpack-dev-middleware")(compiler, {
    headers: { "Access-Control-Allow-Origin": "*" },
    publicPath: webpackConfig.output.publicPath,
    stats: "minimal",
    serverSideRender: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  app.use(instance);

  instance.waitUntilValid(() => {
    console.clear();
    console.log(`Server is now running on port ${config.port} ...`);
  });

  app.use(require("webpack-hot-middleware")(compiler));
}

const statsFile = path.resolve("./dist/loadable-stats.json");

app.get("*", (req, res) => {
  const { "react-light-boilerplate": token } = req.cookies;

  const extractor = new ChunkExtractor({ statsFile });
  const staticContext = {};
  const sheet = new ServerStyleSheet();
  const store = createStore({});

  const loadData = () => {
    const promises = matchRoutes(routes, req.path)
      .map(({ route, match }: Record<string, any>) =>
        route.loadData
          ? route.loadData({
              params: match.params,
              query: req.query,
              getState: store.getState,
            })
          : null
      )
      .filter((item: any) => item !== null)
      // @ts-ignore
      .flat()
      .map((item) => dispatchHelper(store.dispatch, item, token));

    return Promise.all(promises);
  };

  (async () => {
    if (token)
      try {
        const { data } = await axiosHelper({
          url: "/profile",
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        store.dispatch({ type: ActionTypes.AUTH_SIGN_IN_SUCCESS, data });
      } catch (err) {
        // @ts-ignore
        if (global.DEV) console.error(`==> Auth error ${JSON.stringify(err)}`);
      }

    try {
      await loadData();
    } catch (err) {
      // @ts-ignore
      if (global.DEV) console.error(`==> Data error ${JSON.stringify(err)}`);
    }

    try {
      const initialState = store.getState();

      const content = renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <Provider store={store}>
            <StaticRouter location={req.path} context={staticContext}>
              <StyleSheetManager sheet={sheet.instance}>
                {renderRoutes(routes)}
              </StyleSheetManager>
            </StaticRouter>
          </Provider>
        </ChunkExtractorManager>
      );

      const head = Helmet.renderStatic();

      res.send(htmlHelper(head, content, extractor, initialState));
    } catch (error) {
      console.error(`==> render error ${JSON.stringify(error)}`);
      res.status(404).send("Not Found :(");

      console.error(error);
    } finally {
      sheet.seal();
    }
  })();
});

// @ts-ignore
app.listen(config.port, config.host, (err: any) => {
  if (err) console.error(err);
});
