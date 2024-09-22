import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import App from "./view/layout/App.tsx";
import MyTable from "./view/components/MyTable.tsx";
import { Notifications } from "@mantine/notifications";
import Home from "./view/Home/Home.tsx";
import Verify from "./view/Auth/Verify.tsx";

const theme = createTheme({
  primaryColor: "orange",
  colors: {
    orange: [
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
      "#f16322",
    ],
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "forms/:dataType",
        element: <MyTable />,
      },
    ],
  },
  // {
  //   path: "/signin",
  //   element: <Signin />,
  // },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Verify>
          <Notifications className="vazir" />
          <RouterProvider router={router} />
        </Verify>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
