import App from "./app";
import pages from "./pages";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: pages.Home,
      },
    ],
  },
];
