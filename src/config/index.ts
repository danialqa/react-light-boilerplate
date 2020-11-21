export default {
  host: process.env.SERVER_HOST || "0.0.0.0",
  port: process.env.SERVER_PORT || 3000,
  apiURL: process.env.API_URL || "API_URL", // change API_URL to your api base url,
  app: {
    htmlAttributes: { lang: "en" },
    title: "Loading ... ",
    titleTemplate: "Light Boilerplate - %s",
    meta: [
      { name: "description", content: "Light Boilerplate" },
      { charset: "utf-8" },
      { property: "og:site_name", content: "light-boilerplate" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: "light-boilerplate" },
      {
        property: "og:description",
      },
    ],
  },
};
