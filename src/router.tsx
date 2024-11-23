import { createBrowserRouter } from "react-router-dom";
import Templates from "./design-document/templates";
import Template from "./design-document/template";
import PageNotFound from "./pageNotFound";
import { templateGateway } from "./design-document/gateway";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Templates gateway={templateGateway} />,
    ErrorBoundary: PageNotFound,
    children: [
      {
        path: "/template/:id",
        element: <Template gateway={templateGateway} />,
      }
    ]
  },
]);

export default router;