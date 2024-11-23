import { createBrowserRouter, Outlet } from "react-router-dom";
import TemplateList from "./design-document/templates";
import TemplateDesign from "./design-document/template";
import PageNotFound from "./pageNotFound";
import { templateGateway } from "./design-document/gateway";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemplateList gateway={templateGateway} />,
    ErrorBoundary: PageNotFound,
  },
  {
    path: "template",
    element: <Outlet />,
    ErrorBoundary: PageNotFound,
    children: [
      {
        path: "",
        element: <TemplateList gateway={templateGateway} />,
      },
      {
        path: ":id",
        element: <TemplateDesign gateway={templateGateway} />,
      }
    ]
  }
]);

export default router;