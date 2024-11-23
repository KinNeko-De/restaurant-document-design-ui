import { createBrowserRouter } from "react-router-dom";
import TemplateList from "./design-document/templates"; // Updated import
import TemplateDesign from "./design-document/template";
import PageNotFound from "./pageNotFound";
import { templateGateway } from "./design-document/gateway";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemplateList gateway={templateGateway} />, // Updated usage
    ErrorBoundary: PageNotFound,
  },
  {
    path: "/template/:id",
    element: <TemplateDesign gateway={templateGateway} />,
    ErrorBoundary: PageNotFound,
  }
]);

export default router;