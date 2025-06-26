import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import AppWrapper from "./components/AppWrapper";

import Home from "./pages/Home/Home";
import QnaEditor from "./pages/UserSearch/QnaEditor";

export const router = createBrowserRouter([
  {
    path: "/",
    element:
      (
        <AppWrapper>
          <AppLayout />
        </AppWrapper>
      ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const data = null;
          return { data };
        },
      },
      {
        path: "search",
        element: <QnaEditor />,
        loader: async () => {
          const data = null;
          return { data };
        },
      },
    ],
  },
]);

export default router;